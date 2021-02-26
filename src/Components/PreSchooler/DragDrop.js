import React, { useState, useRef, useEffect, createRef } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import Dragula from "react-dragula";

import { Tileplacer, Player, DraggableTile } from "../../Components";
import { Tile } from "../Tile";

import "react-dragula/dist/dragula.css";

const DragDrop = () => {
  const arrLength = 4;
  const [isDragging, setIsDragging] = useState([]);
  const [isPlaced, setIsPlaced] = useState([]);
  const elRefs = useRef([]);
  const qRef = useRef(null);
  const ansRef = useRef(null);
  const tiles = ["A", "B", "C", "D"];
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setLoading(false);
  };

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev, index) {
    ev.dataTransfer.setData("text", index);
  }

  function dropToDefault(ev) {
    ev.preventDefault();
    if (ev.target.childNodes.length >= arrLength) return;
    var index = ev.dataTransfer.getData("text");
    var data = elRefs.current[index];
    ev.target.appendChild(data);
  }

  function drop(ev) {
    ev.preventDefault();
    if (ev.target.childNodes.length >= 1) return;
    var index = ev.dataTransfer.getData("text");
    var data = elRefs.current[index];
    ev.target.appendChild(data);
  }

  useEffect(() => {
    if (elRefs.current && ansRef.current) {
      console.log("123456789012345");
      Dragula([...elRefs.current, ansRef.current], {
        accepts: function (el, target, source, sibling) {
          if (target.parentElement.classList.contains("drag-area")) {
            return target.childNodes.length !== 1;
          } else {
            return true;
          }
        },
      });
    }
  }, [elRefs, ansRef]);

  return (
    <MainContainer>
      <QuestionContainer>
        <DragArea className="drag-area">
          {tiles.map((tile, index) => {
            return (
              <Tileplacer
                key={index}
                ref={(el) => (elRefs.current[index] = el)}
              ></Tileplacer>
            );
          })}
        </DragArea>
        <Qinfo>Listen and complete the word by dragging the tiles</Qinfo>
        <Player color="white" />
      </QuestionContainer>
      <AnswerContainer ref={ansRef}>
        {tiles.map((tile, index) => {
          return <DraggableTile key={index}>{tile}</DraggableTile>;
        })}
      </AnswerContainer>
    </MainContainer>
  );
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
