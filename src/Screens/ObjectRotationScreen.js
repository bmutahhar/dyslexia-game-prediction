import React, { useState } from "react";
import styled from "styled-components";
// import { ObjectRotationScreen } from ".";
import {
  ProfileAvatar,
  Timer,
  CustomStepper,
  NextButton,
  SubmitButton,
  Character,
  ObjectRotation
} from "../Components";

import gamebg from "../Images/backgrounds/gamebg.png";
import tilebg from "../Images/backgrounds/tilebg.png";
import larka from "../Images/characters/larka2.svg";

const ObjectRotationScreen = () => {
  return (
    <Container className="container-fluid" background={gamebg}>
      <Header className="row">
        <Badges className="col-2">
        <h2 style={{color: "white"}}>BADGES</h2>
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
        <ObjectRotation/>
      </GameArea>
    </Container>
  );
};

export default ObjectRotationScreen;

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
  ${'' /* border: 2px solid black; */}
  height: 90%;
`;


const Badges = styled.div`
  border: 2px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Avatarmsg = styled.div`
  ${'' /* border: 2px solid red; */}
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;
const ProgressStepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid red;
  width: 100%;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 2px solid white;
`;




const styles = {
  avatar: {
    // width: "100%",
    height: "20vw",
  },
};
