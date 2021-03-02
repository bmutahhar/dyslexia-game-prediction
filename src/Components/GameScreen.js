import React, { useState } from "react";
import styled from "styled-components";
import { ProfileAvatar, Timer, CustomStepper } from "../Components";
import { useSelector } from "react-redux";

import gamebg from "../Images/backgrounds/gamebg.png";
import b1 from "../Images/badges/b10.svg";
import b2 from "../Images/badges/b2.svg";

import b3 from "../Images/badges/b3.svg";
import b4 from "../Images/badges/b4.svg";
import b5 from "../Images/badges/b5.svg";
import b6 from "../Images/badges/b6.svg";
import b7 from "../Images/badges/b7.svg";
import b8 from "../Images/badges/b8.svg";



const GameScreen = ({ children, activeStep }) => {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const [showb1, setShowb1] = useState(true);
  const [showb2, setShowb2] = useState(false);
  const [showb3, setShowb3] = useState(false);
  const [showb4, setShowb4] = useState(false);
  const [showb5, setShowb5] = useState(false);
  const [showb6, setShowb6] = useState(false);
  const [showb7, setShowb7] = useState(false);
  const [showb8, setShowb8] = useState(false);

  // if (activeStep == 2) {
  //   console.log(activeStep)
  //   setShowb1(true);
  // }

  // else if (activeStep == 4) {
  //   setShowb2(true);
  // }

  // else if (activeStep == 6) {
  //   setShowb3(true);
  // }
  // else if (activeStep == 8) {
  //   setShowb4(true);
  // }
  // else if (activeStep == 10) {
  //   setShowb5(true);
  // }
  // else if (activeStep == 12) {
  //   setShowb6(true);
  // }
  // else if (activeStep == 14) {
  //   setShowb7(true);
  //   setShowb8(true);
  // }



  return (
    <Container className="container-fluid" background={gamebg}>
      <Header className="row">
        <Badges className="col-2">

          {showb1 ? (
            <Badgeimg src={b1} alt="badge"></Badgeimg>

          ) : (
              <BadgeHolder />
            )}

          {showb2 ? (
            <Badgeimg src={b2} alt="badge"></Badgeimg>


          ) : (
              <BadgeHolder />

            )}
          {showb3 ? (
            <Badgeimg src={b3} alt="badge"></Badgeimg>

          ) : (
              <BadgeHolder />

            )}
          {showb4 ? (
            <Badgeimg src={b4} alt="badge"></Badgeimg>

          ) : (
              <BadgeHolder />

            )}
          {showb5 ? (
            <Badgeimg src={b5} alt="badge"></Badgeimg>

          ) : (
              <BadgeHolder />

            )}
          {showb6 ? (
            <Badgeimg src={b6} alt="badge"></Badgeimg>

          ) : (
              <BadgeHolder />

            )}
          {showb7 ? (
            <Badgeimg src={b7} alt="badge"></Badgeimg>

          ) : (
              <BadgeHolder />

            )}
          {showb8 ? (
            <Badgeimg src={b8} alt="badge"></Badgeimg>

          ) : (
              <BadgeHolder />

            )}




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

const Badgeimg = styled.img`
height: 1.5vw;
width: 1.5vw; 
borderRadius: 50%;
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
  height: 90%;
`;

const Badges = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 2px solid red;
`;

const BadgeHolder = styled.div`
height: 1.5vw;
width: 1.5vw;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(7, 94, 12, 0.4);
border: 1px solid #08780e;
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
