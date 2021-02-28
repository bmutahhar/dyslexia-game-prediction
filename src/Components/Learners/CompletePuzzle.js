import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Dragula from "react-dragula";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
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
} from "../../Components";
import { addAnswer } from "../../actions";

import larka from "../../Images/characters/larka2.svg";
import "react-dragula/dist/dragula.css";

const CompletePuzzle = () => {
  return (
    <MainContainer>
      <AvatarMessage className="col-2" src={larka} alt="Boy avatar" />
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
    </MainContainer>
  );
};

export default CompletePuzzle;

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
