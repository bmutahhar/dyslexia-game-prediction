import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Timer, CustomStepper } from "../Components";
import { useSelector } from "react-redux";

import gamebg from "../Images/backgrounds/gamebg.png";

const GameScreen = ({ children, activeStep, badges, stop }) => {
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const [showBadges, setShowBadges] = useState(
    Array(badges.length).fill(false)
  );

  // This block actually displays the badge and badge holders on top left of the screen.
  // This block executes whenever activeStep value is updated.
  useEffect(() => {
    if (activeStep === 0) return;
    else if (activeStep % 2 === 0) {
      // Logic to display the last badge.
      if (activeStep === totalLevels - 1) {
        let values = [...showBadges];
        values[Math.floor(activeStep / 2) - 1] = true;
        values[-1] = true;
        setShowBadges(values);
      } else {
        // Logic to display all the badges except the last one. this is the same formula as explained in index.js file
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
              <Badgeimg src={badges[index].image} alt="badge" key={index} />
            ) : (
              <BadgeHolder key={index} />
            );
          })}
        </Badges>
        <ProgressStepper className="col-8">
          <CustomStepper activeStep={activeStep} />
        </ProgressStepper>
        <Profile className="col-2">
          {/* The stop state is passed to the timer component as props. */}
          <Timer initialSeconds={0} initialMinutes={0} stop={stop} />
        </Profile>
      </Header>
      <GameArea className="row">{children}</GameArea>
    </Container>
  );
};

export default GameScreen;

const Badgeimg = styled.img`
  height: 1.7vw;
  width: 1.7vw;
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
`;

const BadgeHolder = styled.div`
  height: 1.7vw;
  width: 1.7vw;
  border-radius: 50%;
  display: flex;
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
