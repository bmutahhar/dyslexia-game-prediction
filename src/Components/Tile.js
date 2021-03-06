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
  const image =
    "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";
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
    <Label
      htmlFor={children}
      onClick={() => onClick(children)}
      question={question}
      data-correct={true}
    >
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
  font-size:${({ fontSize }) => (fontSize ? fontSize : "4vw")};
  ${"" /* font-weight: bold; */}
  font-family: "Russo One", sans-serif;
  color: #910d0a;
  box-sizing: border-box;
  height: ${({ height }) => (height ? height : "7vw")};
  width:${({ width }) => (width ? width : "7vw")};
  border: 4px solid #5a110f;
  border-radius: 5px;
  margin:3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: grab;
  background-color: #25ce4a;
  background-image: url(${({ background }) =>
    background ? background : tilebg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s ease-in-out;
  ${({ question }) =>
    question
      ? `&:hover {
    transform: none;
    cursor:initial;
  }`
      : `&:hover {
    transform: scale(1.1);
    cursor: grab;
    transition: 0.3s ease-in-out;
  } 
  &:active {
    transform: scale(0.7);
    cursor:grab;
    transition: 0.3s ease-in-out;
  }`}
  img {
    width: 50%;
    object-fit: contain;
    overflow: hidden;
  }
  
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
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
