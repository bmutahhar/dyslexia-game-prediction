import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Player, UIButton, NextButton, AvatarMessage } from "../../Components";
import { motion } from "framer-motion";

import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const optionVarient = {
  start: {
    opacity: 0,
    width: "0vw",
    height: "0vh"
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
      stiffness: 100
    }
  },

  click: {
    scale: 0.7,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 100
    }
  }
};

const SpellingVariant = {
  start: {
    opacity: 0,
    x: "-2vw",
    fontSize: "2vw"
  },

  end: {
    opacity: 1,
    x: 0,
    fontSize: "4.5vw"
  }
}
const CVCwords = ({
  activeStep,
  nextStep,
  word,
  options,
  showBadge,
  badge,
  openBadge,
  badgeName,
}) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);

  const gender = useSelector((state) => state.gender);
  const dispatch = useDispatch();
  return (
    <MainContainer>
      <AvatarMessage
        className="col-2"
        src={gender === "male" ? larka : larki}
        alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
      />
      <GameArea className="col-8">
        <QuestionContainer className="row">
          <Optionsbox

            variants={optionVarient}
            initial="start"
            animate="end"
            transition={{

              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 120

            }}
          >
            <Spellingoptions
              variants={optionVarient}
              whileHover="hover"
              whileTap="click"


            >
              <Spelling
                variants={SpellingVariant}
                initial="start"
                animate="end"
                transition={{
                  delay: 0.6,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 90
                }}
              >AELD</Spelling>
            </Spellingoptions>
          </Optionsbox>

          <Optionsbox

            variants={optionVarient}
            initial="start"
            animate="end"
            transition={{

              delay: 0.3,
              duration: 0.5,
              type: "spring",
              stiffness: 120

            }}
          >
            <Spellingoptions
              variants={optionVarient}
              whileHover="hover"
              whileTap="click"

            >
              <Spelling
                variants={SpellingVariant}
                initial="start"
                animate="end"
                transition={{
                  delay: 0.7,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 90
                }}
              >AELD</Spelling>
            </Spellingoptions>
          </Optionsbox>
          <Optionsbox

            variants={optionVarient}
            initial="start"
            animate="end"
            transition={{

              delay: 0.4,
              duration: 0.5,
              type: "spring",
              stiffness: 120

            }}
          >
            <Spellingoptions
              variants={optionVarient}
              whileHover="hover"
              whileTap="click"

            >
              <Spelling
                variants={SpellingVariant}
                initial="start"
                animate="end"
                transition={{
                  delay: 0.8,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 90
                }}
              >AELD</Spelling>
            </Spellingoptions>
          </Optionsbox>
          <Optionsbox

            variants={optionVarient}
            initial="start"
            animate="end"
            transition={{

              delay: 0.5,
              duration: 0.5,
              type: "spring",
              stiffness: 120

            }}
          >
            <Spellingoptions
              variants={optionVarient}
              whileHover="hover"
              whileTap="click"

            >
              <Spelling
                variants={SpellingVariant}
                initial="start"
                animate="end"
                transition={{
                  delay: 0.9,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 90
                }}
              >AELD</Spelling>
            </Spellingoptions>
          </Optionsbox>
          <Qinfo
            initial={{
              opacity: 0,
              fontSize: "0vw",
              x: "5vh"

            }}
            animate={{
              opacity: 1,
              fontSize: "1.4vw",
              x: 0
            }}
            transition={{

              delay: 0.6,
              duration: 0.4,
              type: "spring",
              stiffness: 80

            }}
          >Listen To The Word And Choose The Correct Spelling</Qinfo>
        </QuestionContainer>
        <AnswerContainer className="row">
          <Player color="white" />
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
                // if ((activeStep + 1) % 2 === 0) openBadge();
                nextStep();
              }}
            />
          )}
      </NextButtonContainer>
    </MainContainer >
  );
};

export default CVCwords;

const Spelling = styled(motion.h1)`
  color: white;
  font-size: 4.5vw;
  letter-spacing: 2rem;
  margin-left: 2rem;
`;
const Optionsbox = styled(motion.div)`
margin-bottom: 1vw;
 align-items: center;
 justify-content: center;
 
`;
const Spellingoptions = styled(motion.div)`
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
