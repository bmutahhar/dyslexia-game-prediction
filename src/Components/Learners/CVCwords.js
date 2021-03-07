import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";


import {
    Player,
    UIButton,
    NextButton,
    AvatarMessage
} from "../../Components";
import { motion } from "framer-motion";

import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";


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
                    <Spellingoptions>
                        <Spelling>AELD</Spelling>
                    </Spellingoptions>
                    <Spellingoptions>
                        <Spelling>AELD</Spelling>

                    </Spellingoptions>
                    <Spellingoptions>
                        <Spelling>AELD</Spelling>

                    </Spellingoptions>
                    <Spellingoptions>
                        <Spelling>AELD</Spelling>

                    </Spellingoptions>
                    <Qinfo>
                        Listen To The Word And Choose The Correct Spelling
                    </Qinfo>

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
                        <UIButton variant="contained" type="submit" onClick={() => { }}>
                            Submit
              </UIButton>
                    </motion.div>
                ) : (
                        <NextButton
                            onClick={() => {
                                if ((activeStep + 1) % 2 === 0) openBadge();
                                nextStep();
                            }}
                        />
                    )}
            </NextButtonContainer>

        </MainContainer>
    );
};

export default CVCwords;

const Spelling = styled.h1`
color: white; 
font-size: 4.5vw;
letter-spacing: 2rem;
margin-left: 2rem;
`;
const Spellingoptions = styled.div`
display: flex;
flex-direction: column;
width: 30vw;
height: 12vh;
background-color:#4EF249;
border-radius: 15px;
border: 3px solid #FFFFFF;
align-items: center;
justify-content: center;
margin-bottom: 1vw;

transition: 0.3s ease-in-out;

&:hover {
    transform: scale(1.1);
    transition: 0.3s ease-in;

    
  } 
  &:active {
    transform: scale(0.9);
    transition: 0.3s ease-out;

  }




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
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1.1vw;
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