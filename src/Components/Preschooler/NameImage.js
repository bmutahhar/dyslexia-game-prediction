import React, { Component } from "react";
import styled from "styled-components";
import { Tileplacer, Character, Tile } from "../../Components";

import leapord from "../../Images/characters/leapord.png";

export default class NameImage extends Component {
  render() {
    return (
      <MainContainer>
        <QuestionContainer>
          <DragArea>
            <Character
              className="avatar"
              src={leapord}
              alt="Boy Avatar"
              style={styles.avatar}
            />
            <Tileplacer></Tileplacer>
            <Tileplacer></Tileplacer>
            <Tileplacer></Tileplacer>
            <Tileplacer></Tileplacer>
          </DragArea>

          <Qinfo>Name the character by dragging the tiles</Qinfo>
        </QuestionContainer>
        <AnswerContainer>
          <Tile></Tile>
          <Tile></Tile>

          <Tile></Tile>

          <Tile></Tile>
        </AnswerContainer>
      </MainContainer>
    );
  }
}

const styles = {
  avatar: {
    height: "15vw",
    marginRight: "2vw",
  },
};

const DragArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionContainer = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnswerContainer = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
  align-items: center;
  justify-content: center;
  
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1vw;
  color: white;
`;
