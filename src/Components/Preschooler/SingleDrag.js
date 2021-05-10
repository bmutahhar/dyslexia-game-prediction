import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Dragula from "react-dragula";
import { motion, AnimatePresence } from "framer-motion";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  DraggableTile,
  Tile,
  Timer,
  UIButton,
  AvatarMessage,
  NextButton,
  BadgePopUp,
  Tileplacer,
} from "..";
import { useSelector, useDispatch } from "react-redux";
import {
  addScore,
  incrementConsecutiveScore,
  decrementConsecutiveScore,
} from "../../actions";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const SingleDrag = ({
  name,
  image,
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
  const [show, setShow] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const [time, setTime] = useState(0);
  const placer = useRef(null);
  const ansRef = useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const closeQuestion = () => {
    setShow(false);
  };

  const onClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const getAnswer = (placer) => {
    if (placer.current && placer.current.childNodes.length > 0) {
      const date = new Date();
      const seconds = Math.floor(date.getTime() / 1000);
      const timeDiff = Math.abs(seconds - time);
      if (image) {
        const node = placer.current.firstChild;
        const img = node.getElementsByTagName("img")[0];
        const alt = img.getAttribute("alt");
        if (alt.trim() === word.alt.trim()) {
          const hit = 1;
          const miss = 0;
          const scoreObj = {
            difficulty: "easy",
            clicks: clickCount,
            hits: hit,
            miss: miss,
            score: hit,
            accuracy: hit / clickCount,
            missrate: miss / clickCount,
            time: timeDiff,
          };
          dispatch(addScore(scoreObj));
          dispatch(incrementConsecutiveScore());
        } else {
          const hit = 0;
          const miss = 1;
          const scoreObj = {
            difficulty: "easy",
            clicks: clickCount,
            hits: hit,
            miss: miss,
            score: hit,
            accuracy: hit / clickCount,
            missrate: miss / clickCount,
            time: timeDiff,
          };
          dispatch(addScore(scoreObj));
          dispatch(decrementConsecutiveScore());
        }
      } else {
        const node = placer.current.firstChild;
        const text = node.innerText;
        if (text.trim() === word.trim()) {
          const hit = 1;
          const miss = 0;
          const scoreObj = {
            difficulty: "easy",
            clicks: clickCount,
            hits: hit,
            miss: miss,
            score: hit,
            accuracy: hit / clickCount,
            missrate: miss / clickCount,
            time: timeDiff,
          };
          dispatch(addScore(scoreObj));
          dispatch(incrementConsecutiveScore());
        } else {
          const hit = 0;
          const miss = 1;
          const scoreObj = {
            difficulty: "easy",
            clicks: clickCount,
            hits: hit,
            miss: miss,
            score: hit,
            accuracy: hit / clickCount,
            missrate: miss / clickCount,
            time: timeDiff,
          };
          dispatch(addScore(scoreObj));
          dispatch(decrementConsecutiveScore());
        }
      }
    }
  };

  useEffect(() => {
    if (placer.current && ansRef.current) {
      Dragula([placer.current, ansRef.current], {
        accepts: function (el, target, source, sibling) {
          if (target.parentElement.classList.contains("drag-area")) {
            return target.childNodes.length !== 1;
          } else {
            return true;
          }
        },
      }).on("dragend", function (el) {
        if (placer.current.childNodes.length === 1) {
          setDisabled(false);
        } else setDisabled(true);
      });
    }
  }, [placer, ansRef, show]);

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
          {show ? (
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
              <Qinfo>Remember this tile carefully</Qinfo>
            </QuestionContainer>
          ) : (
            <>
              <QuestionContainer className="row">
                <DragArea className="drag-area">
                  <Tileplacer ref={placer} height="15vw" width="15vw" />
                </DragArea>
                <Qinfo>{question}</Qinfo>
              </QuestionContainer>
              <AnswerContainer ref={ansRef} className="row">
                {shuffledOptions.map((el, index) => {
                  return image ? (
                    <DraggableTile
                      name={name}
                      image
                      key={index}
                      src={el.image}
                      alt={el.alt}
                      height="10vw"
                      width="10vw"
                      onMouseDown={onClick}
                    />
                  ) : (
                    <DraggableTile
                      name={name}
                      key={index}
                      height="10vw"
                      width="10vw"
                      onMouseDown={onClick}
                    >
                      {el}
                    </DraggableTile>
                  );
                })}
              </AnswerContainer>
            </>
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
                getAnswer(placer);
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
export default SingleDrag;

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
