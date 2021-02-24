import React, { useState, useRef, useEffect, createRef } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";

import { Tileplacer, Player, DraggableTile } from "../../Components";
import { Tile } from "../Tile";

const DragDrop = () => {
  const arrLength = 4;
  const [isDragging, setIsDragging] = useState([]);
  const [isPlaced, setIsPlaced] = useState([]);
  const elRefs = useRef([]);
  const tiles = ["A", "B", "C", "D"];
  const [loading, setLoading] = useState(true);

  const onDragStart = (index) => {
    let draggingValues = [...isDragging];
    draggingValues[index] = true;
    let placedValues = [...isPlaced];
    placedValues[index] = false;
    setIsPlaced(placedValues);
    setIsDragging(draggingValues);

    console.log(elRefs.current[index]);
  };
  const onDragEnd = (index) => {
    let draggingValues = [...isDragging];
    draggingValues[index] = false;
    let placedValues = [...isPlaced];
    placedValues[index] = true;
    setIsDragging(draggingValues);
    setIsPlaced(placedValues);
  };

  const clearDragValue = (index) => {
    let draggingValues = [...isDragging];
    draggingValues[index] = false;
    let placedValues = [...isPlaced];
    placedValues[index] = false;
    setIsDragging(draggingValues);
    setIsPlaced(placedValues);
  };

  const handleClose = () => {
    setLoading(false);
  };

  useEffect(() => {
    setIsDragging((isDragging) =>
      Array(arrLength)
        .fill()
        .map((_, i) => isDragging[i] || false)
    );
    setIsPlaced((isPlaced) =>
      Array(arrLength)
        .fill()
        .map((_, i) => isPlaced[i] || false)
    );
    elRefs.current = elRefs.current.slice(0, arrLength);
    setLoading(false)
  }, [arrLength]);

  if (loading) {
    return <Loading open={loading} onClick={handleClose} />;
  } else {
    return (
      <MainContainer>
        <QuestionContainer>
          <DragArea>
            {tiles.map((tile, index) => {
              return (
                <Tileplacer key={index}>
                  {isPlaced[index] && (
                    <DraggableTile
                      key={index}
                      onDragStart={() => clearDragValue(index)}
                      onDragEnd={() => clearDragValue(index)}
                      isDragging={false}
                    >
                    </DraggableTile>
                  )}
                </Tileplacer>
              );
            })}
          </DragArea>
          <Qinfo>Listen and complete the word by dragging the tiles</Qinfo>
          <Player color="white" />
        </QuestionContainer>
        <AnswerContainer>
          {tiles.map((tile, index) => {
            return (
              !isPlaced[index] && (
                <DraggableTile
                  key={index}
                  ref={el=>elRefs.current[index]=el}
                  onDragStart={() => onDragStart(index)}
                  onDragEnd={() => onDragEnd(index)}
                  isDragging={isDragging[index]}
                  // dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                >
                  {tile}
                </DraggableTile>
              )
            );
          })}
        </AnswerContainer>
      </MainContainer>
    );
  }
};

export default DragDrop;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1000,
    color: "#fff",
  },
  circularProgress: {
    color: "#fff",
    fontSize: 48,
  },
}));

const Loading = ({ open, onClick }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open} onClick={onClick}>
      <CircularProgress className={classes.circularProgress} />
    </Backdrop>
  );
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
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1vw;
  color: white;
`;
