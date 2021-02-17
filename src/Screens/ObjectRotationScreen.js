import React, { useState } from "react";
import styled from "styled-components";
import {
  ProfileAvatar,
  Timer,
  CustomStepper,
  NextButton,
  SubmitButton,
  Character,
} from "../Components";

import gamebg from "../Images/backgrounds/gamebg.png";
import tilebg from "../Images/backgrounds/tilebg.png";
import larka from "../Images/characters/larka2.svg";

const PreSchooler = () => {
  return (
    <Container className="container-fluid" background={gamebg}>
      <Header className="row">
        <Badges className="col-2">
          {/* <Text>badges</Text> */}
        </Badges>
        <ProgressStepper className="col-8">
          <CustomStepper />
        </ProgressStepper>
        <Profile className="col-2">
          <Timer>00:00</Timer>
          <ProfileAvatar />
        </Profile>
      </Header>
      <GameArea className="row">
        <Avatarmsg className="col-2">
          <Character
            className="avatar"
            src={larka}
            alt="Boy Avatar"
            style={styles.avatar}
          />
        </Avatarmsg>
        <GameContainer className="col-10">
          <MainArea className="row"></MainArea>
          <Gameoption className="row">
            <AnswerSelection className="col-10"></AnswerSelection>
            <AnswerSubmit className="col-2">
              {/* <SubmitButton variant="filled">Submit</SubmitButton> */}
              <NextButton/>
            </AnswerSubmit>
          </Gameoption>
        </GameContainer>
      </GameArea>
    </Container>
  );
};

export default PreSchooler;

const Qinfo = styled.p`
  font-size: 0.8vw;
  color: white;
`;
const Text = styled.h2`
  font-size: 2vw;
  color: white;
`;
const Container = styled.div`
  height: 100vh;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
`;

const Header = styled.div`
  height: 10%;
`;
const GameArea = styled.div`
  border: 2px solid black;
  height: 90%;
`;

const GameContainer = styled.div`
  height: 100%;
  border: 2px solid orange;
`;
const Gameoption = styled.div`
  border: 2px solid black;
  height: 30%;
`;
const Badges = styled.div`
  border: 2px solid red;
`;
const Avatarmsg = styled.div`
  border: 2px solid red;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;
const Avatar = styled.div`
  border: 2px solid red;
`;
const ProgressStepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MainArea = styled.div`
  border: 2px solid yellow;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AnswerSelection = styled.div`
  display: flex;
  border: 2px solid yellow;
  align-items: center;
  justify-content: center;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Emptyspace = styled.div`
  border: 2px solid green;
  background-color: black;
  height: 70%;
`;
const AnswerSubmit = styled.div`
  border: 2px solid green;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Tileplacer = styled.div`
  box-sizing: border-box;
  height: 8.5vw;
  width: 8.5vw;
  background-color: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10px);
  border: 3px solid #c9c4c4;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

const Tileholder = styled.div`
  box-sizing: border-box;
  height: 10vw;
  width: 10vw;
  background-color: rgba(197, 133, 47, 0.6);
  filter: brightness(65%);
  border: 2px solid #707070;
  border-radius: 5px;
`;

const Tile = styled.div`
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
  background-image: url(${(props) => props.background});
`;

const styles = {
  avatar: {
    // width: "100%",
    height: "20vw",
  },
};
