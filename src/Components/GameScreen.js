import React from "react";
import styled from "styled-components";
import { ProfileAvatar, Timer, CustomStepper } from "../Components";
import { useSelector } from "react-redux";

import gamebg from "../Images/backgrounds/gamebg.png";

const GameScreen = ({ children, activeStep }) => {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  return (
    <Container className="container-fluid" background={gamebg}>
      <Header className="row">
        <Badges className="col-2">
          <h2 style={{ color: "white" }}>BADGES</h2>
        </Badges>
        <ProgressStepper className="col-8">
          <CustomStepper activeStep={activeStep} />
        </ProgressStepper>
        <Profile className="col-2">
          <Timer initialSeconds={0} initialMinutes={0} />
          {loggedIn && <ProfileAvatar />}
        </Profile>
      </Header>
      <GameArea className="row">{children}</GameArea>
    </Container>
  );
};

export default GameScreen;

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
  height: 90%;
`;

const Badges = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressStepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
