import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tileplacer,
  Tile,
  AvatarMessage,
  NextButton,
  UIButton,
  Timer,
  BadgePopUp,
} from "../../Components";
import { addAnswer } from "../../actions";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const SelectOption = ({
  activeStep,
  nextStep,
  options,
  showBadge,
  badge,
  openBadge,
  badgeName
}) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const [show, setShow] = useState(true);
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const closeQuestion = () => {
    setShow(false);
  };

  const onClick = (answer) => {
    setAnswer(answer);
  };

  const getAnswer = () => dispatch(addAnswer(answer));
  if (showBadge) {
    return (
      <Backdrop className={classes.backdrop} open={showBadge}>
        <BadgePopUp src={badge} alt="Badge" badgeName={badgeName}/>
      </Backdrop>
    );
  } else {
    return (
      <MainContainer>
        <AvatarMessage
          className="col-2"
          src={gender === "male" ? larka : larki}
          alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
        ></AvatarMessage>
        <GameArea className="col-8">
          {show ? (
            <AnimatePresence>
              <QuestionContainer className="row">
                <TileContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Timer
                    initialSeconds={7}
                    initialMinutes={0}
                    reverse
                    callBack={closeQuestion}
                  />
                  <Tile
                    question={true}
                    height="15vw"
                    width="15vw"
                    fontSize="10vw"
                  >
                    B
                  </Tile>
                </TileContainer>
              </QuestionContainer>
            </AnimatePresence>
          ) : (
            <QuestionContainer className="row">
              <GridPlacer>
                {options.map((el, i) => {
                  return (
                    <Tileplacer key={i} height="12vw" width="12vw">
                      <Tile
                        height="10vw"
                        width="10vw"
                        name="selectOptions"
                        onClick={onClick}
                      >
                        {el}
                      </Tile>
                    </Tileplacer>
                  );
                })}
              </GridPlacer>
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
              onClick={() => {
                getAnswer();
                if ((activeStep+1)  % 2 === 0) openBadge();
                nextStep();
              }}
            />
          )}
        </NextButtonContainer>
      </MainContainer>
    );
  }
};

export default SelectOption;

const useStyles = makeStyles(({ theme }) => ({
  icons: {
    fontSize: "5.5vw",
    color: "white",
  },
  title: {
    color: "white",
    fontSize: "2.5vw",
  },
  info: {
    color: "white",
    margin: "2px 5px",
    fontSize: "1.5vw",
  },
  Msg: {
    color: "white",

    fontSize: "2.5vw",
  },
  backdrop: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(18px)",
  },
}));

const GridPlacer = styled.div`
  display: grid;
  grid-template-columns: 12vw 12vw;
  grid-row: auto auto;
  align-items: center;
  justify-content: center;
`;

const TileContainer = styled(motion.div)`
  box-sizing: border-box;
  height: 20vw;
  width: 20vw;
  background-color: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10px);
  border: 3px solid #c9c4c4;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 5px 10px;
  padding-top: 0px;
`;

const QuestionContainer = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10%;
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
