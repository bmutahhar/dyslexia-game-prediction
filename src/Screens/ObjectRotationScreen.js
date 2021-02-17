import React, { useState } from "react";
import styled from "styled-components";
import {
  ProfileAvatar,
  Timer,
  CustomStepper,
  NextButton,
  UIButton,
  Character,
  ObjectRotation,
} from "../Components";
import { useSelector } from "react-redux";

import gamebg from "../Images/backgrounds/gamebg.png";
import larka from "../Images/characters/larka2.svg";
import { motion } from "framer-motion";

const ObjectRotationScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const totalLevels = useSelector((state) => state.levels.totalLevels);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
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
        <ObjectRotation className="col-8" />
        <AnswerSubmit className="col-2">
          {activeStep === totalLevels - 1 ? (
            <motion.div initial={{y:"20vh"}} animate={{y:0}} transition={{type:"tween",duration:1}}>
            <UIButton variant="filled" type="submit" onClick={() => {}}>
              Submit
            </UIButton>
            </motion.div>
          ) : (
            <NextButton onClick={nextStep} />
          )}
        </AnswerSubmit>
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
  ${"" /* border: 2px solid black; */}
  height: 90%;
`;

const Badges = styled.div`
  border: 2px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Avatarmsg = styled.div`
  ${"" /* border: 2px solid red; */}
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

const AnswerSubmit = styled.div`
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
`;

const styles = {
  avatar: {
    // width: "100%",
    height: "20vw",
  },
};
