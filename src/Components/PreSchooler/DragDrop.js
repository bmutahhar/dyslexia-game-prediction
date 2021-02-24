import React, { useState, useRef, forwardRef } from "react";
import styled from "styled-components";

import { Tileplacer, Player, DraggableTile } from "../../Components";

const DragDrop = () => {
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const tiles = [ref0, ref1, ref2, ref3];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = () => {
    setIsDragging(true);
  };

  const dragEnd = (_, info) => {
    setIsDragging(false);
  };

  return (
    <MainContainer>
      <QuestionContainer>
        <DragArea>
          <Tileplacer></Tileplacer>
          <Tileplacer></Tileplacer>
          <Tileplacer></Tileplacer>
          <Tileplacer></Tileplacer>
        </DragArea>

        <Qinfo>Listen and complete the word by dragging the tiles</Qinfo>
        <Player color="white" />
      </QuestionContainer>
      <AnswerContainer>
        <DraggableTile>D</DraggableTile>
        <DraggableTile>G</DraggableTile>
        <DraggableTile>A</DraggableTile>
        <DraggableTile>X</DraggableTile>
      </AnswerContainer>
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
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1vw;
  color: white;
`;
