import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Dragula from "react-dragula";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import original from "../../Images/backgrounds/original.jpg";
import part1 from "../../Images/backgrounds/part1.jpg";
import part2 from "../../Images/backgrounds/part2.jpg";
import part3 from "../../Images/backgrounds/part3.jpg";
import part4 from "../../Images/backgrounds/part4.jpg";

import {
  Tileplacer,
  AvatarMessage,
  NextButton,
  UIButton,
  BadgePopUp,
} from "../../Components";
import { addAnswer } from "../../actions";

import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";
import "react-dragula/dist/dragula.css";

const CompletePuzzle = ({
  activeStep,
  nextStep,
  word,
  options,
  showBadge,
  badge,
  openBadge,
  badgeName,
}) => {
  const classes = useStyles();
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const dispatch = useDispatch();
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
            <Puzzlepicture background={original}></Puzzlepicture>
            <Qinfo>Complete the picture puzzle as shown</Qinfo>
            <PuzzleGrid>
              <Tileplacer></Tileplacer>
              <Tileplacer></Tileplacer>
              <Tileplacer></Tileplacer>
              <Tileplacer></Tileplacer>
            </PuzzleGrid>
          </QuestionContainer>
          <AnswerContainer className="row">
            <PictureTile background={part1}></PictureTile>
            <PictureTile background={part2}></PictureTile>
            <PictureTile background={part3}></PictureTile>
            <PictureTile background={part4}></PictureTile>
          </AnswerContainer>
        </GameArea>
        <NextButtonContainer className="col-2">
          {activeStep === totalLevels - 1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "tween", duration: 1 }}
            >
              <UIButton variant="contained" type="submit" onClick={() => {}}>
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
  }
};

export default CompletePuzzle;

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 40,
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

const Puzzlepicture = styled.div`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 20vw;
  height: 20vw;
`;
const PuzzleGrid = styled.div`
  width: 20vw;
  height: 20vw;
  display: grid;
  grid-template-columns: 10vw 10vw;
  grid-row: auto auto;
`;

const PictureTile = styled.div`
  box-sizing: border-box;
  height: 9.5vw;
  width: 9.5vw;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s ease-in-out;

  transform: perspective(500px) translateZ(0px);

  &:hover {
    transform: perspective(500px) translateZ(50px);
  }
`;

const QuestionContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
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
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1vw;
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
  border: 2px solid cyan;
`;
