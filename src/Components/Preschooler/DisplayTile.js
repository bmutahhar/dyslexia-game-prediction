import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Tile, Timer, UIButton } from "../../Components";

const DisplayTile = () => {
  const [open, setOpen] = useState(true);
  const showDisplay = () => {
    setOpen(true);
  };
  const closeDisplay = () => {
    setOpen(false);
  };
  return (
    <MainContainer>
      <QuestionContainer>
        {open && (
          <AnimatePresence>
            <TileContainer exit={{ opacity: 0 }}>
              <Timer
                initialSeconds={5}
                initialMinutes={0}
                reverse
                callBack={closeDisplay}
              />
              <Tile>B</Tile>
            </TileContainer>
          </AnimatePresence>
        )}
        <Qinfo>Select the matching tile from below as was shown above</Qinfo>
        <UIButton variant="filled" type="button" onClick={showDisplay}>
          Show Again
        </UIButton>
      </QuestionContainer>
      <AnswerContainer>
        <Tile>C</Tile>
        <Tile>D</Tile>
        <Tile>B</Tile>
        <Tile>3</Tile>
      </AnswerContainer>
    </MainContainer>
  );
};
export default DisplayTile;

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

const TileContainer = styled(motion.div)`
  box-sizing: border-box;
  height: 13.5vw;
  width: 13.5vw;
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
`;
