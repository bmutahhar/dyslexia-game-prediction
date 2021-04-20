import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Dragula from "react-dragula";
import { motion, AnimatePresence } from "framer-motion";
import { Backdrop, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Tileplacer,
  Tile,
  DraggableTile,
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

const TileLayout = ({
  image,
  question,
  word,
  gridSize,
  options,
  activeStep,
  nextStep,
  showBadge,
  badge,
  openBadge,
  badgeName,
}) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const difficulty = useSelector((state) => state.difficulty);
  const grid = Array(gridSize * gridSize).fill(true);
  const [clickCount, setClickCount] = useState(0);
  const [optionsA, setOptionsA] = useState([]);
  const [optionsB, setOptionsB] = useState([]);
  const [show, setShow] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const optionsRefA = useRef(null);
  const optionsRefB = useRef(null);
  const elRefs = useRef([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const closeQuestion = () => {
    setShow(false);
  };
  const onClick = () => {
    setClickCount((prev) => prev + 1);
  };
  const getAnswer = () => {
    const factor = getFactor(gridSize);
    let hit = 0;
    let miss = 0;
    if (elRefs.current) {
      elRefs.current.forEach((el, i) => {
        if (el.childNodes.length > 0) {
          const node = el.firstChild;
          if (image) {
            const img = node.getElementsByTagName("img")[0];
            const alt = img.getAttribute("alt");
            if (alt.trim() === word.alt.trim()) {
              hit++;
            } else {
              miss++;
            }
          } else {
            if (node.innerText.trim() === word.trim()) {
              hit++;
            } else {
              miss++;
            }
          }
        }
      });
      const score = hit * factor;
      const scoreObj = {
        difficulty: difficulty,
        clicks: clickCount,
        hits: hit,
        miss: miss,
        score: score,
        accuracy: hit / clickCount,
        missrate: miss / clickCount,
      };
      if (score >= 0.5) {
        dispatch(addScore(scoreObj));
        dispatch(incrementConsecutiveScore());
      } else {
        dispatch(addScore(scoreObj));
        dispatch(decrementConsecutiveScore());
      }
    }
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
          if (elRefs.current[i].childNodes.length !== 0) {
            setDisabled(false);
            return;
          }
        }
        setDisabled(true);
        return;
      });
    }
  }, [elRefs, optionsRefA, optionsRefB, show]);

  useEffect(() => {
    let tempOptions = shuffleArray(options);
    tempOptions = shuffleArray(tempOptions);

    setOptionsA(tempOptions.slice(0, Math.floor(options.length / 2)));
    setOptionsB(
      tempOptions.slice(Math.floor(options.length / 2), options.length)
    );
  }, [options]);

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
          {show ? (
            <AnimatePresence>
              <QuestionContainer
                className="row"
                question
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{ delay: 0.25, duration: 0.25 }}
                // exit={{ opacity: 0 }}
              >
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
            <QuestionContainer
              className="row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.25 }}
            >
              <TileGrid gridSize={gridSize} ref={optionsRefA}>
                {optionsA.map((el, i) => {
                  return image ? (
                    <DraggableTile
                      image
                      key={i}
                      src={el.image}
                      alt={el.alt}
                      onMouseDown={onClick}
                      // height="10vw"
                      // width="10vw"
                    />
                  ) : (
                    <DraggableTile key={i} onMouseDown={onClick}>
                      {el}
                    </DraggableTile>
                  );
                })}
              </TileGrid>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
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
                  className="drag-area"
                >
                  {grid.map((_, i) => {
                    return (
                      <Tileplacer
                        key={i}
                        ref={(el) => (elRefs.current[i] = el)}
                      />
                    );
                  })}
                </GridPlacer>
                {/* <Typography variant="subtitle1" display="block" className={classes.question}>{question}</Typography> */}
                <div
                  style={{
                    width: "25vw",
                    height: "8vw",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    textAlign: "center",
                  }}
                >
                  <Qinfo>{question}</Qinfo>
                </div>
              </div>
              <TileGrid gridSize={gridSize} ref={optionsRefB}>
                {optionsB.map((el, i) => {
                  return image ? (
                    <DraggableTile
                      image
                      key={i}
                      src={el.image}
                      alt={el.alt}
                      onMouseDown={onClick}
                      // height="10vw"
                      // width="10vw"
                    />
                  ) : (
                    <DraggableTile key={i} onMouseDown={onClick}>
                      {el}
                    </DraggableTile>
                  );
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

export default TileLayout;
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
  question: {
    color: "#fff",
    margin: "10px 2px",
  },
}));

const GridPlacer = styled(motion.div)`
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  grid-template-columns: ${({ gridSize }) =>
    gridSize === 4 ? "7vw 7vw" : "7vw"};
  grid-row: auto auto;
  align-items: center;
  justify-content: center;
  height: 95%;
  width: 25%;
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
  font-size: 2vw;
  color: white;
  text-align: center;
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
    return 1 / 4;
  } else if (gridSize === 3) {
    return 1 / 9;
  }
};
