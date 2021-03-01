import React from "react";
import styled from "styled-components";

import tilebg from "../Images/backgrounds/tilebg.png";

export const Tile = ({
  name,
  question,
  onClick,
  background,
  children,
  ...props
}) => {
  if (question) {
    return (
      <TileComponent
        question={question}
        onClick={onClick}
        background={background}
        {...props}
      >
        {children}
      </TileComponent>
    );
  }
  return (
    <Label htmlFor={children} onClick={() => onClick(children)} question={question}>
      <input type="radio" id={children} value={children} name={name} />
      <TileComponent background={background} {...props}>
        {children}
      </TileComponent>
    </Label>
  );
};

export const DraggableTile = ({ background, children, ...props }) => {
  return (
    <TileComponent background={background} {...props}>
      {children}
    </TileComponent>
  );
};

const TileComponent = styled.div`
  font-size: 4vw;
  ${"" /* font-weight: bold; */}
  font-family: "Russo One", sans-serif;
  color: #910d0a;
  box-sizing: border-box;
  height: 7vw;
  width: 7vw;
  border: 4px solid #5a110f;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: grab;
  background-image: url(${({ background }) =>
    background ? background : tilebg});
  
  transition: 0.2s ease-in-out;
  ${({ question }) =>
    question
      ? `&:hover {
    transform: none;
    cursor:initial;
  }`
      : `&:hover {
    transform: scale(1.07);
    cursor: grab;
  } 
  &:active {
    transform: scale(0.5);
    cursor:grab;
  }`}
  
  }
`;

const Label = styled.label`
  input[type="radio"] {
    display: none;
  }
  ${({ question }) =>
    question
      ? ``
      : `input[type="radio"]:checked ~ div{
  transform: scale(1.1);
  border: 4px solid #187d31;
}`}
`;
