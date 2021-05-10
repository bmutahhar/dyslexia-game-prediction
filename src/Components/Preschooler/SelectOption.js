import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Tileplacer,
  Tile,
  AvatarMessage,
  NextButton,
  UIButton,
  Timer,
  BadgePopUp,
} from "../../Components";
import {
  addScore,
  incrementConsecutiveScore,
  decrementConsecutiveScore,
} from "../../actions";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const SelectOption = ({
  image,
  gridSize,
  word,
  question,
  activeStep,
  nextStep,
  options,
  showBadge,
  badge,
  openBadge,
  badgeName,
}) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const difficulty = useSelector((state) => state.difficulty);
  const gender = useSelector((state) => state.gender);
  const factor = getFactor(gridSize);
  const [show, setShow] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [time, setTime] = useState(0);
  const [hit, setHit] = useState(0);
  const [miss, setMiss] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const closeQuestion = () => {
    setShow(false);
  };

  const onClick = (myRef) => {
    setClickCount(clickCount + 1);
    disabled && setDisabled(false);
    // Code to work if checked
    if (!myRef.current.checked) {
      if (image) {
        const value = myRef.current.value;
        if (word.alt.trim() === value.trim()) {
          setHit(hit + 1);
        } else {
          setMiss(miss + 1);
        }
      } else {
        const value = myRef.current.value;
        if (word.trim() === value.trim()) {
          setHit(hit + 1);
        } else {
          setMiss(miss + 1);
        }
      }
    }
    // Code to work if not checked
    else {
      if (image) {
        const value = myRef.current.value;
        if (word.alt.trim() === value.trim()) {
          setHit(hit + 1);
        } else {
          setMiss(miss + 1);
        }
      } else {
        const value = myRef.current.value;
        if (word.trim() === value.trim()) {
          setHit(hit + 1);
        } else {
          setMiss(miss + 1);
        }
      }
    }
  };

  const getAnswer = () => {
    const date = new Date();
    const seconds = Math.floor(date.getTime() / 1000);
    const timeDiff = Math.abs(seconds - time);
    const score = hit * factor;
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
    if (score >= 0.5) {
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
        ></AvatarMessage>
        <GameArea className="col-8">
          {show ? (
            <AnimatePresence>
              <QuestionContainer className="row">
                <TileContainer
                  initial={{
                    opacity: 0,
                    scale: 0.1,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.6,
                      duration: 0.2,
                    }}
                  >
                    <Timer
                      initialSeconds={7}
                      initialMinutes={0}
                      reverse
                      callBack={closeQuestion}
                    />
                  </motion.div>
                  {image ? (
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        delay: 0.9,
                        duration: 0.5,
                      }}
                    >
                      <Tile
                        question
                        image
                        height="15vw"
                        width="15vw"
                        fontSize="10vw"
                        src={word.image}
                        alt={word.alt}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        delay: 0.9,
                        duration: 0.5,
                      }}
                    >
                      <Tile question height="15vw" width="15vw" fontSize="10vw">
                        {word}
                      </Tile>
                    </motion.div>
                  )}
                </TileContainer>
                <Qinfo>Remember this tile carefully</Qinfo>
              </QuestionContainer>
            </AnimatePresence>
          ) : (
            <QuestionContainer className="row">
              <GridPlacer
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 80,
                }}
                gridSize={gridSize}
              >
                {shuffledOptions.map((el, i) => {
                  return (
                    <Tileplacer key={i} height="12vw" width="12vw">
                      {image ? (
                        <Tile
                          height="10vw"
                          width="10vw"
                          id={i}
                          name="selectOptions"
                          onClick={onClick}
                          image
                          src={el.image}
                          alt={el.alt}
                          multi
                        />
                      ) : (
                        <Tile
                          height="10vw"
                          width="10vw"
                          name="selectOptions"
                          onClick={onClick}
                          multi
                          id={i}
                        >
                          {el}
                        </Tile>
                      )}
                    </Tileplacer>
                  );
                })}
              </GridPlacer>
              <Qinfo>{question}</Qinfo>
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

const GridPlacer = styled(motion.div)`
  display: grid;
  grid-template-columns: ${({ gridSize }) => {
    let columns = "";
    for (var i = 0; i < gridSize; i++) {
      columns += "12vw ";
    }
    return columns;
  }};
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
  justify-content: center;
  ${"" /* margin-top: 10%; */}
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 2vw;
  text-align: center;
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

const getFactor = (gridSize) => {
  if (gridSize === 2) {
    return 1 / 2;
  } else if (gridSize === 3) {
    return 1 / 4;
  }
};
