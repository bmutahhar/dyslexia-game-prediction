import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Player,
  UIButton,
  NextButton,
  AvatarMessage,
  BadgePopUp,
} from "../../Components";
import {
  addScore,
  incrementConsecutiveScore,
  decrementConsecutiveScore,
} from "../../actions";
import { motion } from "framer-motion";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const TypeWord = ({
  activeStep,
  nextStep,
  word,
  question,
  showBadge,
  badge,
  openBadge,
  badgeName,
  stopTime,
}) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const difficulty = useSelector((state) => state.difficulty);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleKeyUp = (event) => {
    setValue(event.target.value);
    event.keyCode !== 8 &&
      event.keyCode !== 13 &&
      setClickCount(clickCount + 1);
    setDisabled(event.target.value.length === 0);
  };

  const getAnswer = () => {
    const date = new Date();
    const seconds = Math.floor(date.getTime() / 1000);
    const timeDiff = Math.abs(seconds - time);
    let hit = 0;
    let miss = 0;
    const factor = 1 / word.length;
    if (value.trim().length < word.length) {
      value
        .trim()
        .split("")
        .forEach((el, i) => {
          if (el.toLowerCase().trim() === word[i].trim().toLowerCase()) {
            hit++;
          } else {
            miss++;
          }
        });
    } else {
      word.split("").forEach((el, i) => {
        if (el.toLowerCase().trim() === value[i].trim().toLowerCase()) {
          hit++;
        } else {
          miss++;
        }
      });
    }
    const score = hit * factor;
    if (score >= 0.5) {
      const scoreObj = {
        difficulty: difficulty,
        clicks: clickCount,
        hits: hit,
        miss: miss,
        score: score,
        accuracy: hit / clickCount,
        missrate: miss / clickCount,
        time: timeDiff,
      };
      dispatch(addScore(scoreObj));
      dispatch(incrementConsecutiveScore());
    } else {
      const scoreObj = {
        difficulty: difficulty,
        clicks: clickCount,
        hits: hit,
        miss: miss,
        score: score,
        accuracy: hit / clickCount,
        missrate: miss / clickCount,
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
            <InputTextField
              onKeyUp={handleKeyUp}
              variant="outlined"
              inputProps={{
                style: {
                  padding: "15px 10px",
                },
              }}
            />
            <Qinfo>{question}</Qinfo>
            <Player color="white" text={word} />
          </QuestionContainer>
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
                onClick={() => {
                getAnswer();
                stopTime();
              }}
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

export default TypeWord;

const QuestionContainer = styled.div`
  margin-top: -30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const AnswerContainer = styled.div`
//   display: flex;
//   height: 20%;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border: 2px solid red;
// `;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Qinfo = styled(motion.h5)`
  margin-top: 30px;
  margin-bottom: 30px;
  color: white;
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
const useStyles = makeStyles(({ theme }) => ({
  backdrop: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(18px)",
  },
}));

const InputTextField = withStyles({
  root: {
    backgroundColor: "#05e338",
    borderRadius: "15px",
    width: "50%",
    boxShadow: "2px 10px 40px rgba(0,0,0,0.3)",

    "&:hover .MuiOutlinedInput-notchedOutline": {
      boxShadow: "2px 10px 60px rgba(35,206,74,0.9)",
      transition: "0.3s ease-in-out",
      border: "1px solid white",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "15px",
        width: "100%",
        transition: "0.3s ease-in-out",
      },
      "&.Mui-focused fieldset": {
        border: "3px solid white",
      },
      "& .MuiOutlinedInput-input": {
        textAlign: "center",
        fontSize: "3.5vw",
        color: "white",
        letterSpacing: "10px",
      },
    },
  },
})(TextField);
