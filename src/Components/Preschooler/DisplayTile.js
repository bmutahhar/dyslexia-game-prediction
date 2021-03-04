import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tile,
  Timer,
  UIButton,
  AvatarMessage,
  NextButton,
} from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import { addAnswer } from "../../actions";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";
import { IconButton, Typography, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RotateLeft, RotateRight } from "@material-ui/icons";
import b1 from "../../Images/badges/b10.svg";
import Confetti from 'react-confetti';

const DisplayTile = ({ name, question, options, activeStep, nextStep }) => {
  const [Bopen, setBopen] = useState(false);
  const [AllBopen, setAllBopen] = useState(false);

  const [open, setOpen] = useState(true);
  const [answer, setAnswer] = useState("");
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const dispatch = useDispatch();
  const classes = useStyles();


  const BadgeOpen = () => {
    setBopen(true);
    setTimeout(BadgeClose, 3500);
  };

  const BadgeClose = () => {
    setBopen(false);
  };

  const AllBadgeOpen = () => {
    setAllBopen(true);
    setTimeout(BadgeClose, 5500);
  };

  const AllBadgeClose = () => {
    setAllBopen(false);
  };


  const showDisplay = () => {
    setOpen(true);
  };
  const closeDisplay = () => {
    setOpen(false);
  };

  const onClick = (answer) => {
    setAnswer(answer);
  };
  const getAnswer = () => dispatch(addAnswer(answer));

  return (
    <MainContainer>
      <AvatarMessage
        className="col-2"
        src={gender === "male" ? larka : larki}
        alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
      />
      <GameArea className="col-8">
        <QuestionContainer className="row">
          <AnimatePresence>
            {open && (
              <TileContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Timer
                  initialSeconds={5}
                  initialMinutes={0}
                  reverse
                  callBack={closeDisplay}
                />
                <Tile question={true}>{question}</Tile>
              </TileContainer>
            )}
          </AnimatePresence>
          <Qinfo>Select the matching tile from below as was shown above</Qinfo>
          <UIButton
            variant="contained"
            disabled={open}
            type="button"
            onClick={showDisplay}
          >
            Show Again
          </UIButton>
        </QuestionContainer>
        {/* <AnswerContainer className="row">
          {options.map((el, i) => {
            return (
              <Tile name={name} key={i} onClick={onClick}>
                {el}
              </Tile>
            );
          })}
        </AnswerContainer> */}
      </GameArea>
      <NextButtonContainer className="col-2">
        {activeStep === totalLevels - 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", duration: 1 }}
          >
            <UIButton variant="contained" type="submit" onClick={() => {
              BadgeOpen();

            }}>
              Submit
            </UIButton>
          </motion.div>
        ) : (
            <NextButton
              onClick={() => {
                getAnswer();
                nextStep();
              }}
            />
          )}
      </NextButtonContainer>
      <Backdrop className={classes.backdrop} open={Bopen}>

        <BadgePopUp src={b1} alt="badge" />

      </Backdrop>

    </MainContainer>
  );
};
export default DisplayTile;

const BadgePopUp = ({ src, alt }) => {
  return (


    <PopImageContainer>
      <Confetti numberOfPieces="500" ></Confetti>

      <ImageContainer>

        <Image src={src} alt={alt} />
        <Image src={src} alt={alt} />
        <Image src={src} alt={alt} />
        <Image src={src} alt={alt} />


      </ImageContainer>
      <ImageContainer>

        <Image src={src} alt={alt} />
        <Image src={src} alt={alt} />
        <Image src={src} alt={alt} />
        <Image src={src} alt={alt} />



      </ImageContainer>
      <Typography variant="subtitle1" style={{
        color: "white",

        fontSize: "3.5vw",
        marginTop: "20px",
      }}>
        Congratulations! You've Completed The Game.
</Typography>
      <Typography variant="subtitle1" style={{
        color: "white",

        fontSize: "2.5vw",
        marginTop: "10px",
      }}>
        You've Earned All Of The Badges.
</Typography>

    </PopImageContainer>



  );
};

const useStyles = makeStyles(({ theme }) => ({

  backdrop: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(18px)",
  },
}));

const QuestionContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1.5vw;
  color: white;
  font-family: "Open Sans", sans-serif;
`;

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
`;

const TileContainer = styled(motion.div)`
  box-sizing: border-box;
  height: 13.5vw;
  width: 13.5vw;
  background-color: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10px);
  border: 3px solid #c9c4c4;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const AnswerContainer = styled.div`
  display: flex;
  height: 30%;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const GameArea = styled.div`
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled(motion.div)`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: center;
`;

const Image = styled.img`
  height: 12vw;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  
`;







const PopImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  
  
`;