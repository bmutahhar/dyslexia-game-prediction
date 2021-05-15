import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Check, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tile,
  AvatarMessage,
  UIButton,
  NextButton,
  BadgePopUp,
} from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import {
  addScore,
  incrementConsecutiveScore,
  decrementConsecutiveScore,
} from "../../actions";

import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const ButtonVarient = {
  start: {
    opacity: 0,
    width: "0%",
    scale: 0.7,
    x: "8vw",
  },

  end: {
    opacity: 1,
    width: "100%",
    scale: 1,
    x: 0,

    transition: {
      delay: 1.2,
      duration: 0.8,
      type: "spring",
      stiffness: 120,
    },
  },

  click: {
    translateY: 4,
    outline: "none",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },

  hover: {
    backgroundColor: "green",
    cursor: "pointer",
  },

  hover1: {
    backgroundColor: "#bd0909",
    cursor: "pointer",
  },
};
const WordConfirm = ({
  activeStep,
  nextStep,
  word,
  question,
  showBadge,
  badge,
  openBadge,
  badgeName,
  answer
}) => {
  const classes = useStyles();
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const difficulty = useSelector((state) => state.difficulty);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [time, setTime] = useState(0);

  const onClick = (value) => {
    setValue(value);
    setClickCount(clickCount + 1);
    disabled && setDisabled(false);
  };

  const getAnswer = () => {
    const date = new Date();
    const seconds = Math.floor(date.getTime() / 1000);
    const timeDiff = Math.abs(seconds - time);
    if ((answer.trim().toLowerCase()==="correct" && value === 1) || (answer.trim().toLowerCase()==="wrong" && value === 0)) {
      const scoreObj = {
        difficulty: difficulty,
        clicks: clickCount,
        hits: 1,
        miss: 0,
        score: 1,
        accuracy: 1 / clickCount,
        missrate: 0 / clickCount,
        time: timeDiff,
      };
      dispatch(addScore(scoreObj));
      dispatch(incrementConsecutiveScore());
    } else {
      const scoreObj = {
        difficulty: difficulty,
        clicks: clickCount,
        hits: 0,
        miss: 1,
        score: 0,
        accuracy: 0 / clickCount,
        missrate: 1 / clickCount,
        time: timeDiff,
      };
      dispatch(addScore(scoreObj));
      dispatch(decrementConsecutiveScore());
    }
  };

  useEffect(() => {
    if (!showBadge) {
      const date = new Date();
      const seconds = Math.floor(date.getTime() / 1000);
      setTime(seconds);
    }
  }, [showBadge]);

  if (showBadge) {
    return (
      <Backdrop className={classes.backdrop} open={showBadge}>
        <BadgePopUp src={badge} alt="Badge" badgeName={badgeName} />
      </Backdrop>
    );
  } else {
    return (
      <MainContainer>
        <AvatarMessage
          className="col-2"
          src={gender === "male" ? larka : larki}
          alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
        />
        <GameArea className="col-8">
          <QuestionContainer className="row">
            <WordArea>
              {word.split("").map((el, i) => {
                return (
                  <TileBox
                    key={i}
                    initial={{
                      opacity: 0,
                      // x: "25vw",
                      y: "-35vh",
                      translateY: 60,
                      scale: 0.6,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      translateY: 0,
                    }}
                    transition={{
                      delay: 0.5,
                      duration: 8.5,
                      type: "spring",
                      stiffness: 80,
                    }}
                  >
                    <Tile question height="10vw" width="10vw">
                      {el}
                    </Tile>
                  </TileBox>
                );
              })}
            </WordArea>

            <Qinfo
              initial={{
                opacity: 0,
                fontSize: "0vw",
                x: "10vh",
              }}
              animate={{
                opacity: 1,
                fontSize: "1.5vw",
                x: 0,
              }}
              transition={{
                delay: 1,
                duration: 0.4,
                type: "spring",
                stiffness: 80,
              }}
            >
              {question}
            </Qinfo>
          </QuestionContainer>
          <AnswerContainer className="row">
            <Label htmlFor="Correct">
              <input type="radio" id="Correct" name="answerButtons" />
              <ConfirmButton
                hcolor="green"
                color="#3bb502"
                variants={ButtonVarient}
                initial="start"
                animate="end"
                whileHover="hover"
                whileTap="click"
                onClick={() => onClick(1)}
              >
                <Check className={classes.icon} />
              </ConfirmButton>
            </Label>
            <Label htmlFor="Wrong" name="answerButtons">
              <input type="radio" id="Wrong" name="answerButtons" />
              <ConfirmButton
                hcolor="#bd0909"
                color="#f70000"
                variants={ButtonVarient}
                initial="start"
                animate="end"
                whileHover="hover1"
                whileTap="click"
                onClick={() => onClick(0)}
              >
                <Close className={classes.icon} />
              </ConfirmButton>
            </Label>
          </AnswerContainer>
        </GameArea>
        <NextButtonContainer className="col-2">
          {activeStep === totalLevels - 1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "tween", duration: 1 }}
            >
              <UIButton
                variant="contained"
                type="button"
                component={Link}
                to="/completed"
              >
                Submit
              </UIButton>
            </motion.div>
          ) : (
            <NextButton
              disabled={disabled}
              onClick={() => {
                getAnswer();
                // if ((activeStep + 1) % 2 === 0) openBadge();
                nextStep();
              }}
            />
          )}
        </NextButtonContainer>
      </MainContainer>
    );
  }
};

export default WordConfirm;

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 40,
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

const TileBox = styled(motion.div)``;
const WordArea = styled.div`
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
`;

const AnswerContainer = styled.div`
  display: flex;
  height: 30%;
  align-items: center;
  justify-content: space-around;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Qinfo = styled(motion.p)`
  margin-top: 30px;
  color: white;
`;

const Label = styled.label`
  width: 25%;
  height: 35%;

  input {
    display: none;
  }

  input:checked + div {
    box-shadow: 0 0 30px 0 rgba(255, 255, 255, 0.4);
  }
`;

const ConfirmButton = styled(motion.div)`
  display: flex;
  height: 100%;
  font-weight: 600;
  font-size: 1.5vw;
  align-items: center;
  justify-content: center;
  align-content: center;
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 10px 6px 0 rgba(0, 0, 0, 0.4);
`;
const GameArea = styled.div`
  height: 100%;
  width: 100%;
`;

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
`;
