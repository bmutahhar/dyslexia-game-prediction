import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Dragula from "react-dragula";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Tileplacer,
  Player,
  DraggableTile,
  AvatarMessage,
  NextButton,
  UIButton,
} from "../../Components";
import { addAnswer } from "../../actions";

import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";
import "react-dragula/dist/dragula.css";

const DragDrop = ({ activeStep, nextStep, word, options }) => {
  const arrLength = options.length;
  const [disabled, setDisabled] = useState(true);
  const elRefs = useRef([]);
  const ansRef = useRef(null);
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const dispatch = useDispatch();

  const getAnswer = () => {
    let answer = "";
    elRefs.current.map((el, i) => {
      answer += el.textContent;
    });
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
  }, [elRefs, ansRef, arrLength]);

  return (
    <MainContainer>
      <AvatarMessage
        className="col-2"
        src={gender === "male" ? larka : larki}
        alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
      />
      <GameArea className="col-8">
        <QuestionContainer className="row">
          <DragArea className="drag-area">
            {options.map((_, index) => {
              return (
                <Tileplacer
                  key={index}
                  ref={(el) => (elRefs.current[index] = el)}
                ></Tileplacer>
              );
            })}
          </DragArea>
          <Qinfo>Listen and complete the word by dragging the tiles</Qinfo>
          <Player color="white" text={word} />
        </QuestionContainer>
        <AnswerContainer ref={ansRef} className="row">
          {options.map((tile, index) => {
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
            <UIButton variant="contained" type="submit" onClick={() => {}}>
              Submit
            </UIButton>
          </motion.div>
        ) : (
          <NextButton
            disabled={disabled}
            onClick={() => {
              getAnswer();
              nextStep();
            }}
          />
        )}
      </NextButtonContainer>
    </MainContainer>
  );
};

export default DragDrop;

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
`;
