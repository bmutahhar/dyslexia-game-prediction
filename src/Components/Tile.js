import React, { forwardRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import tilebg from "../Images/backgrounds/tilebg.png";

export const Tile = ({ children, ...props }) => {
  return (
    <TileComponent
      background={tilebg}
      whileHover={{
        scale: 1.1,
      }}
      {...props}
    >
      {children}
    </TileComponent>
  );
};

export const DraggableTile = forwardRef(
  ({ children, draggable, onDragStart, ...props }, ref) => {
    return (
      <TileComponent
        ref={ref}
        draggable={draggable}
        onDragStart={onDragStart}
        background={tilebg}
        {...props}
      >
        {children}
      </TileComponent>
    );
  }
);

const draggableVariant = {
  dragging: {
    scale: 0.5,
  },
  inactive: {
    scale: 1,
  },
};

const TileComponent = styled.div`
  font-size: 4vw;
  ${"" /* font-weight: bold; */}
  font-family: "Russo One", sans-serif;
  color: #910d0a;
  box-sizing: border-box;
  height: 8vw;
  width: 8vw;
  border: 4px solid #5a110f;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: grab;
  background-image: url(${(props) => props.background});
  ${
    "" /* transition: 0.2s ease-in-out;

  transform: perspective(500px) translateZ(0px);

  &:hover {
    transform: perspective(500px) translateZ(50px);
  } */
  }
`;
