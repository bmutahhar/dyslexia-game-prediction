import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Dragula from "react-dragula";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Tileplacer,
  Tile,
  Character,
  DraggableTile,
  AvatarMessage,
  NextButton,
  UIButton,
  BadgePopUp,
} from "..";
import { addAnswer } from "../../actions";

import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";
import "react-dragula/dist/dragula.css";

const NameImage = ({
  easy,
  activeStep,
  nextStep,
  question,
  word,
  options,
  showBadge,
  badge,
  openBadge,
  badgeName,
}) => {
  const arrLength = options.length;
  const [disabled, setDisabled] = useState(true);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const elRefs = useRef([]);
  const ansRef = useRef(null);
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const dispatch = useDispatch();
  const classes = useStyles();

  const getAnswer = () => {
    let answer = "";
    elRefs.current.map((el, i) => (answer += el.textContent));
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
  }, [elRefs, ansRef, arrLength, showBadge]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(options));
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
          <QuestionContainer className="row">
            <motion.div
              initial={{
                opacity: 0,
                y: "-30vh",
                scale: 0.2,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                type: "spring",
                stiffness: 70,
              }}
            >
              <Character
                className="avatar"
                src={word.image}
                alt={word.alt}
                style={styles.avatar}
              />
            </motion.div>

            <DragArea className="drag-area">
              {options.map((_, index) => {
                if (easy === true && index === 0) {
                  return (
                    <Tileplacer key={index} height="10vw" width="10vw">
                      <Tile question>{word.alt[0]}</Tile>
                    </Tileplacer>
                  );
                } else {
                  return (
                    <Tileplacer
                      key={index}
                      ref={(el) => (elRefs.current[index] = el)}
                      height="10vw"
                      width="10vw"
                    />
                  );
                }
              })}
            </DragArea>
            <Qinfo
              initial={{
                opacity: 0,
                fontSize: "0vw",
                x: "5vh",
              }}
              animate={{
                opacity: 1,
                fontSize: "1.4vw",
                x: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.4,
                type: "spring",
                stiffness: 90,
                ease: "easeIn",
              }}
            >
             {question}
            </Qinfo>
          </QuestionContainer>
          <AnswerContainer ref={ansRef} className="row">
            {shuffledOptions.map((tile, index) => {
              return <DraggableTile key={index}>{tile}</DraggableTile>;
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

export default NameImage;

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

const styles = {
  avatar: {
    height: "10vw",
    marginRight: "1vw",
  },
};

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
  ${"" /* align-items: center; */}
  ${"" /* justify-content: center; */}
`;
const Qinfo = styled(motion.p)`
  margin-top: 30px;
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
