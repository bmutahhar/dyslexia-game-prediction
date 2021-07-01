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

import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const optionVarient = {
  start: {
    opacity: 0,
    width: "0vw",
    height: "0vh",
  },
  end: {
    opacity: 1,
    width: "30vw",
    height: "12vh",
  },

  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },

  click: {
    scale: 0.7,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100,
    },
  },
};

const SpellingVariant = {
  start: {
    opacity: 0,
    x: "-2vw",
    fontSize: "2vw",
  },

  end: {
    opacity: 1,
    x: 0,
    fontSize: "4.5vw",
  },
};
const CVCwords = ({
  activeStep,
  nextStep,
  word,
  question,
  options,
  showBadge,
  badge,
  openBadge,
  badgeName,
  stopTime,
}) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const difficulty = useSelector((state) => state.difficulty);
  const dispatch = useDispatch();
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [value, setValue] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [time, setTime] = useState(0);
  const classes = useStyles();

  const onClick = (myRef) => {
    setClickCount(clickCount + 1);
    disabled && setDisabled(false);
    if (!myRef.current.checked) {
      setValue(myRef.current.value);
    }
  };

  const getAnswer = () => {
    const date = new Date();
    const seconds = Math.floor(date.getTime() / 1000);
    const timeDiff = Math.abs(seconds - time);
    if (word.trim() === value.trim()) {
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
    setShuffledOptions(shuffleArray(options));
  }, [options]);

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
            {shuffledOptions.map((el, i) => {
              return <OptionsBox key={i} i={i} el={el} onClick={onClick} />;
            })}
            <Qinfo
              initial={{
                opacity: 0,
                fontSize: "0vw",
                x: "3vh",
              }}
              animate={{
                opacity: 1,
                fontSize: "1.4vw",
                x: 0,
              }}
              transition={{
                delay: 0.6,
                duration: 0.4,
                type: "spring",
                stiffness: 40,
              }}
            >
              {question}
            </Qinfo>
          </QuestionContainer>
          <AnswerContainer className="row">
            <Player color="white" text={word} />
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
                if ((activeStep + 1) % 2 === 0) openBadge();
                nextStep();
              }}
            />
          )}
        </NextButtonContainer>
      </MainContainer>
    );
  }
};

export default CVCwords;

const OptionsBox = ({ onClick, i, el }) => {
  const myRef = useRef(null);
  return (
    <OptionsBoxContainer
      variants={optionVarient}
      initial="start"
      animate="end"
      transition={{
        delay: 0.2 + (i + 1) / 10,
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      }}
    >
      <input type="radio" id={i} value={el} name="optionButtons" ref={myRef} />
      <Spellingoptions
        variants={optionVarient}
        whileHover="hover"
        whileTap="click"
        htmlFor={i}
        onClick={() => {
          onClick(myRef);
        }}
      >
        <Spelling
          variants={SpellingVariant}
          initial="start"
          animate="end"
          transition={{
            delay: 0.6 + (i + 1) / 10,
            duration: 0.4,
            type: "spring",
            stiffness: 30,
          }}
        >
          {el}
        </Spelling>
      </Spellingoptions>
    </OptionsBoxContainer>
  );
};

const Spelling = styled(motion.h1)`
  color: white;
  font-size: 4.5vw;
  letter-spacing: 2rem;
  margin-left: 2rem;
`;
const OptionsBoxContainer = styled(motion.div)`
  margin-bottom: 1vw;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  input {
    display: none;
  }
  input:checked + label {
    ${"" /* border:none; */}
    ${"" /* box-shadow: 0 0 30px 0 rgba(255, 255, 255, 0.5); */}
    background-color:#007bff8a;
    transition: ease-in 0.2s;
  }
`;
const Spellingoptions = styled(motion.label)`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 12vh;
  background-color: #4ef249;
  border-radius: 15px;
  border: 3px solid #ffffff;
  align-items: center;
  justify-content: center;
  margin-bottom: 1vw;
`;

const QuestionContainer = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnswerContainer = styled.div`
  display: flex;
  height: 20%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  input[type="radio"] {
    display: none;
  }
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

const shuffleArray = (array) => {
  let newArray = array.slice();
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
};
