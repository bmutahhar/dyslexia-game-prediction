import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, Typography, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RotateLeft, RotateRight } from "@material-ui/icons";
import { BsInfoCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AvatarMessage,
  UIButton,
  NextButton,
  BadgePopUp,
} from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import { addAnswer } from "../../actions";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const ObjectRotation = ({
  word,
  question,
  showBadge,
  badge,
  activeStep,
  nextStep,
  angle,
  degree,
  openBadge,
  badgeName,
}) => {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [rotation, setRotation] = useState(0);
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const gender = useSelector((state) => state.gender);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
    setShown(true);
    setTimeout(handleClose, 4500);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rotateRight = () => {
    setRotation(rotation + degree);
  };

  const rotateLeft = () => {
    setRotation(rotation - degree);
  };

  const getAnswer = () => dispatch(addAnswer(rotation));
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
            <IconContainer>
              <IconButton onClick={rotateLeft}>
                <RotateLeft className={classes.icons} />
              </IconButton>
              <Typography variant="subtitle1" className={classes.info}>
                Left
              </Typography>
            </IconContainer>
            <ImageContainer animate={{ rotate: rotation }}>
              <Image src={word.image} alt={word.alt} />
            </ImageContainer>
            <IconContainer>
              <IconButton onClick={rotateRight}>
                <RotateRight className={classes.icons} />
              </IconButton>
              <Typography variant="subtitle1" className={classes.info}>
                Right
              </Typography>
            </IconContainer>
          </QuestionContainer>
          <AnswerSelection className="row">
            <InfoContainer>
              <BsInfoCircleFill className={classes.info} />
              <Typography variant="subtitle1" className={classes.info}>
                {shown
                  ? question
                  : "Click the below button to view question image"}
              </Typography>
            </InfoContainer>
            <UIButton variant="contained" type="button" onClick={handleOpen}>
              Show Image
            </UIButton>
          </AnswerSelection>
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
                  getAnswer();
                  if ((activeStep + 1) % 2 === 0) openBadge();
                  nextStep();
                }}
              />
            )}
        </NextButtonContainer>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <PopUp src={word.image} alt={word.image} rotation={angle} />
        </Backdrop>
      </MainContainer>
    );
  }
};

export default ObjectRotation;

const PopUp = ({ src, alt, rotation }) => {
  return (
    <PopImageContainer>
      <ImageContainer animate={{ rotate: rotation }}>
        <Image src={src} alt={alt} />
      </ImageContainer>
    </PopImageContainer>
  );
};

const useStyles = makeStyles(({ theme }) => ({
  icons: {
    fontSize: "5.5vw",
    color: "white",
  },
  title: {
    color: "white",
    fontSize: "2.5vw",
  },
  info: {
    color: "white",
    margin: "2px 5px",
    fontSize: "1.5vw",
  },
  Msg: {
    color: "white",

    fontSize: "2.5vw",
  },
  backdrop: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(18px)",
  },
}));

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

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
`;

const AnswerSelection = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  align-items: center;
  justify-content: flex-start;
`;

const ImageContainer = styled(motion.div)``;

const Image = styled.img`
  height: 15vw;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const QuestionContainer = styled.div`
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 50px;
`;

const PopImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin-bottom: 50px;
`;
