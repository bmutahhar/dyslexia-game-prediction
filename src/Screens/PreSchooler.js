

import React, { useState } from "react";
import styled from "styled-components";
import {
    ProfileAvatar,
    Timer,
    CustomStepper,
    NextButton,
    UIButton,
    Character,
    DragDrop,
    DisplayTile,
    CompletePuzzle,
    NameImage,
    ObjectRotation,
    WordConfirm,

} from "../Components";
import { useSelector } from "react-redux";

import gamebg from "../Images/backgrounds/gamebg.png";
import larka from "../Images/characters/larka2.svg";
import { motion } from "framer-motion";

const PreSchoolScreen = () => {
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
                <CompletePuzzle className="col-8"></CompletePuzzle>
                <AnswerSubmit className="col-2">
                    {activeStep === totalLevels - 1 ? (
                        <motion.div initial={{ y: "5vh" }} animate={{ y: 0 }} transition={{ type: "spring", duration: 1 }}>
                            <UIButton variant="filled" type="submit" onClick={() => { }}>
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

export default PreSchoolScreen;

const Container = styled.div`
  height: 100vh;
  background-color: #0A2A1D;
  

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239aa39c' fill-opacity='0.58'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");  `;
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
  border: 2px solid black;
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
