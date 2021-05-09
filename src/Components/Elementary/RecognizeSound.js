import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tile, Player, UIButton, NextButton, AvatarMessage, BadgePopUp } from "../../Components";
import { motion } from "framer-motion";
import { Backdrop } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";
import { PlayArrowRounded, PauseRounded } from "@material-ui/icons";
import { useSpeechSynthesis } from "react-speech-kit";





const RecognizeSound = ({
    activeStep,
    nextStep,
    word,
    question,
    options,
    showBadge,
    badge,
    openBadge,
    badgeName,
    text,
}) => {
    const totalLevels = useSelector((state) => state.questions.totalQuestions);
    const gender = useSelector((state) => state.gender);
    const dispatch = useDispatch();
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const classes = useStyles();
    const playIcons = "play ".repeat(4).trim().split(" ")
    const [iconNames, setIconNames] = useState(playIcons);
    const [iconName1, setIconName1] = useState("play");
    const [iconName2, setIconName2] = useState("play");
    const [iconName3, setIconName3] = useState("play");
    const { speak, cancel, voices, speaking } = useSpeechSynthesis();


    const togglePlay = (i) => {
        if (iconNames[i] === "play") {
            speak({
                text: text[i],
                rate: 0.6,
                voice: voices[3],
            });
            let icons = playIcons;
            icons[i] = "pause";
            setIconNames(icons);
        } else {

            let icons = [...iconNames];
            icons[i] = "play"
            cancel();

            setIconNames(icons);
        }
    };



    var playButton = [];
    for (var i = 0; i < 4; i++) {
        playButton.push(


            <PlayButton togglePlay={togglePlay} iconName={iconNames[i]} index={i} />
        );
    }





    if (showBadge) {
        return (
            <Backdrop className={classes.backdrop} open={showBadge}>
                <BadgePopUp src={badge} alt="Badge" badgeName={badgeName} />
            </Backdrop>
        );
    } else {
        return (
            <MainContainer>
                <AvatarMessage
                    className="col-2"
                    src={gender === "male" ? larka : larki}
                    alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
                />
                <GameArea className="col-8">
                    <QuestionContainer className="row">

                        <WordArea>
                            {word.split("").map((el, i) => {
                                return (
                                    <TileBox
                                        key={i}
                                        initial={{
                                            opacity: 0,
                                            // x: "25vw",
                                            y: "-35vh",
                                            translateY: 60,
                                            scale: 0.6,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                            scale: 1,
                                            translateY: 0,
                                        }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 8.5,
                                            type: "spring",
                                            stiffness: 80,
                                        }}
                                    >
                                        <Tile question height="10vw" width="10vw">
                                            {el}
                                        </Tile>
                                    </TileBox>
                                );
                            })}
                        </WordArea>

                        <Qinfo>
                            Listen to each player and match the word given above
                        </Qinfo>

                    </QuestionContainer>
                    <AnswerContainer className="row">
                        {playButton}
                    </AnswerContainer>
                </GameArea>
                <NextButtonContainer className="col-2">
                    {activeStep === totalLevels - 1 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ type: "tween", duration: 1 }}
                        >
                            <UIButton
                                variant="contained"
                                type="button"
                                component={Link}
                                to="/completed"
                            >
                                Submit
              </UIButton>
                        </motion.div>
                    ) : (
                        <NextButton
                            onClick={() => {
                                if ((activeStep + 1) % 2 === 0) openBadge();
                                nextStep();
                            }}
                        />
                    )}
                </NextButtonContainer>
            </MainContainer>
        );
    }
};

export default RecognizeSound;

const PlayButton = ({ togglePlay, iconName, index }) => {

    return (<PlayButtonContainer onClick={() => togglePlay(index)}

    >
        {iconName === "play" ? (
            <PlayArrowRounded fontSize="large" style={{ color: "white", fontSize: "5vw" }} />
        ) : (
            <PauseRounded fontSize="large" style={{ color: "white", fontSize: "5vw" }} />
        )}
    </PlayButtonContainer  >)
}

const TileBox = styled(motion.div)``;
const WordArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlayButtonContainer = styled.button`
align-items: center;
justify-content: center;
border-radius: 50%;
  width: 8vw;
  height: 8vw;
  background-color: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10px);
  border: 3px solid #c9c4c4;
  transition: 0.3s ease-in-out;

  &:hover {
    width: 10vw;
    height: 10vw;
  }

  &: focus {
      background-color: #05e338;
      
  }
`;

const QuestionContainer = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnswerContainer = styled.div`
padding-bottom: 6vw;
padding-left: 7vw;
padding-right: 7vw;
  display: flex;
  height: 40%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Qinfo = styled(motion.h5)`
  margin-top: 30px;
  color: white;
`;



const GameArea = styled.div`
  height: 100%;
  width: 100%;
`;

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
`;
const useStyles = makeStyles(({ theme }) => ({

    backdrop: {
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(18px)",
    },
}));

