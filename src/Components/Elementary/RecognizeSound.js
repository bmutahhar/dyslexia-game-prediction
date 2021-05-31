import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Tile,
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
import { PlayArrowRounded, PauseRounded } from "@material-ui/icons";
import { useSpeechSynthesis } from "react-speech-kit";

const RecognizeSound = ({
  activeStep,
  nextStep,
  word,
  question,
  showBadge,
  badge,
  openBadge,
  badgeName,
  options,
  stopTime,
}) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const difficulty = useSelector((state) => state.difficulty);
  const dispatch = useDispatch();
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const classes = useStyles();
  const playIcons = "play ".repeat(options.length).trim().split(" ");
  const [iconNames, setIconNames] = useState(playIcons);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [time, setTime] = useState(0);

  const { speak, cancel, voices, speaking } = useSpeechSynthesis();

  const togglePlay = (i, ref) => {
    setClickCount(clickCount + 1);
    disabled && setDisabled(false);
    if (iconNames[i] === "play") {
      setValue(ref.current.value);
      speak({
        text: shuffledOptions[i],
        rate: 0.8,
        voice: voices[3],
      });
      let icons = playIcons;
      icons[i] = "pause";
      setIconNames(icons);
    } else {
      let icons = [...iconNames];
      icons[i] = "play";
      cancel();
      setIconNames(icons);
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
    !speaking && setIconNames(playIcons);
  }, [speaking]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(options));
  }, []);

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

            <Qinfo>{question}</Qinfo>
          </QuestionContainer>
          <AnswerContainer className="row">
            {shuffledOptions.map((_, i) => {
              return (
                <motion.div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", delay: 0.8, duration: 1.5, stiffness: 100 }}
                >
                  <PlayButton
                    key={i}
                    option={shuffledOptions[i]}
                    togglePlay={togglePlay}
                    iconName={iconNames[i]}
                    index={i}
                  />
                </motion.div>

              );
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

export default RecognizeSound;

const PlayButton = ({ togglePlay, iconName, index, option }) => {
  const myRef = useRef(null);
  return (
    <PlayButtonContainer>
      <input
        type="radio"
        value={option}
        ref={myRef}
        id={index}
        name="soundRadioButtons"
      />
      <PlayButtonLabel htmlFor={index} onClick={() => togglePlay(index, myRef)}>
        {iconName === "play" ? (
          <PlayArrowRounded
            fontSize="large"
            style={{ color: "white", fontSize: "5vw", cursor: "pointer" }}
          />
        ) : (
          <PauseRounded
            fontSize="large"
            style={{ color: "white", fontSize: "5vw", cursor: "pointer" }}
          />
        )}
      </PlayButtonLabel>
    </PlayButtonContainer>
  );
};

const TileBox = styled(motion.div)``;
const WordArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlayButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  input {
    display: none;
  }

  input:checked + label {
    box-shadow: 0 0 40px 0 rgba(255, 255, 255, 0.5);
    background-color: #05e338;
  }
`;
const PlayButtonLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 8vw;
  height: 8vw;
  background-color: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10px);
  border: 3px solid #c9c4c4;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    width: 10vw;
    height: 10vw;
  }
`;

const QuestionContainer = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnswerContainer = styled.div`
  padding-bottom: 6vw;
  padding-left: 7vw;
  padding-right: 7vw;
  display: flex;
  height: 40%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Qinfo = styled(motion.h5)`
  margin-top: 30px;
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
