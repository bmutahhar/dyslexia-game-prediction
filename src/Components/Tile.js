import React from "react";
import styled from "styled-components";

import tilebg from "../Images/backgrounds/tilebg.png";

export const Tile = ({
  name,
  question,
  image,
  src,
  alt,
  onClick,
  background,
  children,
  ...props
}) => {
  if (question) {
    if (image) {
      return (
        <TileComponent
          question={question}
          onClick={onClick}
          background={background}
          {...props}
        >
          <Image src={src} alt={alt} />
        </TileComponent>
      );
    } else {
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
  } else {
    if (image) {
      return (
        <Label
          htmlFor={children}
          onClick={() => onClick(children)}
          question={question}
          data-correct={true}
        >
          <input type="radio" id={children} value={children} name={name} />
          <TileComponent background={background} {...props}>
            <Image src={src} alt={alt} />
          </TileComponent>
        </Label>
      );
    } else {
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
    }
  }
};

export const DraggableTile = ({
  background,
  children,
  image,
  src,
  alt,
  ...props
}) => {
  if (image) {
    return (
      <TileComponent background={background} {...props}>
        <Image src={src} alt={alt} />
      </TileComponent>
    );
  } else {
    return (
      <TileComponent background={background} {...props}>
        {children}
      </TileComponent>
    );
  }
};

const TileComponent = styled.div`
  font-size:${({ fontSize }) => (fontSize ? fontSize : "4vw")};
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
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
  background-color: #fff;
  background-image: url(${({ background }) =>
    background ? background : tilebg});
  background-size: cover;
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

const Image = styled.img`
  width: 50%;
  height: 50%;
  object-fit: contain;
  overflow: hidden;
`;
