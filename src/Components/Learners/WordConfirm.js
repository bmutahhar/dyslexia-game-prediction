import React from "react";
import styled from "styled-components";
import { Check, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Tile, AvatarMessage } from "../../Components";
import larka from "../../Images/characters/larka2.svg";

const WordConfirm = () => {
  const classes = useStyles();

  return (
    <MainContainer>
      <AvatarMessage className="col-2" src={larka} alt="Boy avatar" />
      <GameArea className="col-8">
        <QuestionContainer className="row">
          <WordArea>
            <Tile></Tile>
            <Tile></Tile>

            <Tile></Tile>

            <Tile></Tile>
          </WordArea>

          <Qinfo>Confirm if it is a word or not</Qinfo>
        </QuestionContainer>
        <AnswerContainer className="row">
          <ConfirmButton hcolor="green" color="#3bb502">
            <Check className={classes.icon} />
          </ConfirmButton>
          <ConfirmButton hcolor="#bd0909" color="#f70000">
            <Close className={classes.icon} />
          </ConfirmButton>
        </AnswerContainer>
      </GameArea>
    </MainContainer>
  );
};

export default WordConfirm;

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 40,
    color: "white",
  },
}));

const WordArea = styled.div`
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
  border: 2px solid yellow;
`;

const AnswerContainer = styled.div`
  display: flex;
  height: 30%;
  align-items: center;
  justify-content: space-around;
  border: 2px solid white;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  ${"" /* align-items: center; */}
  ${"" /* justify-content: center; */}
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1vw;
  color: white;
`;

const ConfirmButton = styled.div`
  display: flex;
  bottom: 20%;
  width: 25%;
  height: 40%;
  font-weight: 600;
  font-size: 1.5vw;
  align-items: center;
  justify-content: center;
  align-content: center;

  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 6px 0 rgba(0, 0, 0, 0.4);
  outline: none;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.hcolor};
    cursor: pointer;
  }
  &: focus {
    outline: none;
  }
  &: active {
    background-color: ${(props) => props.hcolor};
    box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.8);

    transform: translateY(4px);
    outline: none;
  }
`;
const GameArea = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid cyan;
`;
