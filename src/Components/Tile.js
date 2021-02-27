import React from "react";
import styled from "styled-components";

import tilebg from "../Images/backgrounds/tilebg.png";

const Tile = ({ children, ...props }) => {
  return (
    <TileComponent background={tilebg} {...props}>
      {children}
    </TileComponent>
  );
};
export default Tile;

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
  
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  } 
  &:focus {
    transform: scale(0.5);
  }
  &:active {
    transform: scale(0.5);
    cursor:grab;
  }
  }
`;
