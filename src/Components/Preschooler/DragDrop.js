import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Dragula from "react-dragula";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Tileplacer,
  Player,
  Tile,
  AvatarMessage,
  NextButton,
  UIButton,
} from "../../Components";
import { addAnswer } from "../../actions";

import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";
import "react-dragula/dist/dragula.css";

const DragDrop = ({ activeStep, nextStep, word }) => {
  const arrLength = word.length;
  const [disabled, setDisabled] = useState(true);
  const elRefs = useRef([]);
  const ansRef = useRef(null);
  const tiles = word.split("");
  const totalLevels = useSelector((state) => state.levels.totalLevels);
  const gender = useSelector((state) => state.gender);
  const dispatch = useDispatch();

  const getAnswer = () => {
    let answer = "";
    elRefs.current.map((el, i) => {
      answer += el.textContent;
    });
    dispatch(addAnswer(answer));
  };

  useEffect(() => {
    if (elRefs.current && ansRef.current) {
      Dragula([...elRefs.current, ansRef.current], {
        accepts: function (el, target, source, sibling) {
          if (target.parentElement.classList.contains("drag-area")) {
            return target.childNodes.length !== 1;
          } else {
            return true;
          }
        },
      }).on("dragend", function (el) {
        if (ansRef.current.childNodes.length < arrLength) setDisabled(false);
        else setDisabled(true);
      });
    }
  }, [elRefs, ansRef]);

  return (
    <MainContainer>
      <AvatarMessage
        className="col-2"
        src={gender === "male" ? larka : larki}
        alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
      />
      <GameArea className="col-8">
        <QuestionContainer className="row">
          <DragArea className="drag-area">
            {tiles.map((tile, index) => {
              return (
                <Tileplacer
                  key={index}
                  ref={(el) => (elRefs.current[index] = el)}
                ></Tileplacer>
              );
            })}
          </DragArea>
          <Qinfo>Listen and complete the word by dragging the tiles</Qinfo>
          <Player color="white" text={word} />
        </QuestionContainer>
        <AnswerContainer ref={ansRef} className="row">
          {tiles.map((tile, index) => {
            return <Tile key={index}>{tile}</Tile>;
          })}
        </AnswerContainer>
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

export default DragDrop;

const DragArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid yellow;
`;

const AnswerContainer = styled.div`
  display: flex;
  height: 30%;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid black;
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
  border: 2px solid brown;
`;

const GameArea = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid cyan;
`;
