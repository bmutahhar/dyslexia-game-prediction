import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Tile,
  Timer,
  UIButton,
  AvatarMessage,
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

const DisplayTile = ({
  image,
  name,
  question,
  word,
  options,
  activeStep,
  nextStep,
  showBadge,
  badge,
  openBadge,
  badgeName,
}) => {
  const [open, setOpen] = useState(true);
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const showDisplay = () => {
    setOpen(true);
  };
  const closeDisplay = () => {
    setOpen(false);
  };

  const onClick = (myRef) => {
    setClickCount((prev) => prev + 1);
    if (!myRef.current.checked) {
      console.log("Now Checked!!!");
      if (image) {
        const value = myRef.current.value;
        if (word.alt.trim() === value.trim()) {
          setScore(1);
          setMiss(0);
        } else {
          setScore(0);
          setMiss(1);
        }
      } else {
        const value = myRef.current.value;
        if (word.trim() === value.trim()) {
          setScore(1);
          setMiss(0);
        } else {
          setScore(0);
          setMiss(1);
        }
      }
    }
  };
  const getAnswer = () => {
    const scoreObj = {
      difficulty: "easy",
      clicks: clickCount,
      hits: score,
      miss: miss,
      score: score,
      accuracy: score / clickCount,
      missrate: miss / clickCount,
    };
    if (score > 0) {
      dispatch(addScore(scoreObj));
      dispatch(incrementConsecutiveScore());
    } else {
      dispatch(addScore(scoreObj));
      dispatch(decrementConsecutiveScore());
    }
  };

  useEffect(() => {
    setShuffledOptions(shuffleArray(options));
  }, []);

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
            <AnimatePresence>
              {open && (
                <TileContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Timer
                    initialSeconds={7}
                    initialMinutes={0}
                    reverse
                    callBack={closeDisplay}
                  />
                  {image ? (
                    <Tile
                      question
                      image
                      height="15vw"
                      width="15vw"
                      fontSize="10vw"
                      src={word.image}
                      alt={word.alt}
                    />
                  ) : (
                    <Tile question height="15vw" width="15vw" fontSize="10vw">
                      {word}
                    </Tile>
                  )}
                </TileContainer>
              )}
            </AnimatePresence>
            <Qinfo>{question}</Qinfo>
            <UIButton
              variant="contained"
              disabled={open}
              type="button"
              onClick={showDisplay}
            >
              Show Again
            </UIButton>
          </QuestionContainer>
          <AnswerContainer className="row">
            {shuffledOptions.map((el, i) => {
              return image ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 8 + (i + 1) / 10,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 90,
                    ease: "easeIn",
                  }}
                  key={i}
                >
                  <Tile
                    name={name}
                    id={i}
                    image
                    onClick={onClick}
                    src={el.image}
                    alt={el.alt}
                    height="10vw"
                    width="10vw"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 8 + (i + 1) / 10,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 90,
                    ease: "easeIn",
                  }}
                  key={i}
                >
                  <Tile id={i} name={name} onClick={onClick}>
                    {el}
                  </Tile>
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
                component={Link}
                to="/completed"
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
export default DisplayTile;

const QuestionContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1.5vw;
  color: white;
  font-family: "Open Sans", sans-serif;
`;

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
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
`;

const AnswerContainer = styled.div`
  display: flex;
  height: 30%;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const GameArea = styled.div`
  height: 100%;
  width: 100%;
`;

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
