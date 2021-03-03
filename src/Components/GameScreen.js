import React, { useState, useEffect } from "react";
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

const badges = [b1, b2, b3, b4, b5, b6, b7, b8];
const GameScreen = ({ children, activeStep }) => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const totalLevels = useSelector((state) => state.questions.totalQuestions);

  const [showBadges, setShowBadges] = useState(
    Array(badges.length).fill(false)
  );

  useEffect(() => {
    if (activeStep % 2 === 0) {
      if (activeStep === totalLevels - 1) {
        let values = [...showBadges];
        values[Math.floor(activeStep / 2) - 1] = true;
        values[-1] = true;
        setShowBadges(values);
      } else {
        let values = [...showBadges];
        values[Math.floor(activeStep / 2) - 1] = true;
        setShowBadges(values);
      }
    }
  }, [activeStep]);
  return (
    <Container className="container-fluid" background={gamebg}>
      <Header className="row">
        <Badges className="col-2">
          {showBadges.map((badge, index) => {
            return badge ? (
              <Badgeimg src={badges[index]} alt="badge" key={index} />
            ) : (
                <BadgeHolder key={index} />
              );
          })}
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
  borderradius: 50%;
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
