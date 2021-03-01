import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Dragula from "react-dragula";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tileplacer,
  Tile,
  DraggableTile,
  AvatarMessage,
  NextButton,
  UIButton,
  Timer,
} from "../../Components";
import { addAnswer } from "../../actions";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const TileLayout = ({ question, gridSize, options, activeStep, nextStep }) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const grid = Array(gridSize * gridSize).fill(true);
  const optionsA = options.slice(0, Math.floor(options.length / 2));

  const optionsB = options.slice(
    Math.floor(options.length / 2),
    options.length
  );
  const [show, setShow] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const optionsRefA = useRef(null);
  const optionsRefB = useRef(null);
  const elRefs = useRef([]);
  const dispatch = useDispatch();

  const closeQuestion = () => {
    setShow(false);
  };
  const getAnswer = () => {
    let answer = "";
    elRefs.current.map((el, i) => (answer += el.textContent));
    dispatch(addAnswer(answer));
  };

  useEffect(() => {
    if (elRefs.current && optionsRefA.current && optionsRefB.current) {
      Dragula([...elRefs.current, optionsRefA.current, optionsRefB.current], {
        accepts: function (el, target, source, sibling) {
          if (target.parentElement.classList.contains("drag-area")) {
            return target.childNodes.length !== 1;
          } else {
            return true;
          }
        },
      }).on("dragend", function (el) {
        for (let i = 0; i < elRefs.current.length; i++) {
          if (elRefs.current[i].childNodes.length !== 0){
            setDisabled(false);
            return
          };
        }
        setDisabled(true);
        return;
      });
    }
  }, [elRefs, optionsRefA, optionsRefB, show]);
  return (
    <MainContainer>
      <AvatarMessage
        className="col-2"
        src={gender === "male" ? larka : larki}
        alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
      />
      <GameArea className="col-8">
        {show ? (
          <AnimatePresence>
            <QuestionContainer
              className="row"
              question
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.25 }}
              exit={{ opacity: 0 }}
            >
              <Timer
                initialSeconds={10}
                initialMinutes={0}
                reverse
                callBack={closeQuestion}
              />
              <GridPlacer gridSize={gridSize}>
                {question.map((el, i) => {
                  return (
                    <Tileplacer key={i}>
                      <Tile question>{el}</Tile>
                    </Tileplacer>
                  );
                })}
              </GridPlacer>
            </QuestionContainer>
          </AnimatePresence>
        ) : (
          <QuestionContainer
            className="row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.25 }}
          >
            <TileGrid gridSize={gridSize} ref={optionsRefA}>
              {optionsA.map((el, i) => {
                return <DraggableTile key={i}>{el}</DraggableTile>;
              })}
            </TileGrid>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <GridPlacer gridSize={gridSize} className="drag-area">
                {grid.map((_, i) => {
                  return (
                    <Tileplacer
                      key={i}
                      ref={(el) => (elRefs.current[i] = el)}
                    />
                  );
                })}
              </GridPlacer>
              <Qinfo>Drag and place the tiles in the grid as was shown</Qinfo>
            </div>
            <TileGrid gridSize={gridSize} ref={optionsRefB}>
              {optionsB.map((el, i) => {
                return <DraggableTile key={i}>{el}</DraggableTile>;
              })}
            </TileGrid>
          </QuestionContainer>
        )}
      </GameArea>
      <NextButtonContainer className="col-2">
        {activeStep === totalLevels - 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", duration: 1 }}
          >
            <UIButton variant="contained" type="submit" onClick={() => {}}>
              Submit
            </UIButton>
          </motion.div>
        ) : (
          <NextButton
            disabled={disabled}
            onClick={() => {
              getAnswer();
              nextStep();
            }}
          />
        )}
      </NextButtonContainer>
    </MainContainer>
  );
};

export default TileLayout;

const GridPlacer = styled.div`
  display: grid;
  grid-template-columns: ${({ gridSize }) => {
    let columns = "";
    for (var i = 0; i < gridSize; i++) {
      columns += "8vw ";
    }
    return columns;
  }};
  grid-row: auto auto;
`;

const TileGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ gridSize }) =>
    gridSize === 4 ? "7vw 7vw" : "7vw"};
  grid-row: auto auto;
  align-items: center;
  justify-content: center;
  grid-column-gap: 5px;
  border: 2px solid red;
  padding: 5px;
  height: 90%;
`;

const QuestionContainer = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: ${({ question }) => (question ? "column" : "row")};
  align-items: center;
  justify-content: ${({ question }) => (question ? "center" : "space-around")};
  padding-bottom: ${({ question }) => (question ? "10%" : "5%")};
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1vw;
  color: white;
`;

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
`;

const GameArea = styled.div`
  height: 100%;
  width: 100%;
`;
