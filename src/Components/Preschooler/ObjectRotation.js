import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, Typography, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RotateLeft, RotateRight } from "@material-ui/icons";
import { BsInfoCircleFill } from "react-icons/bs";
import { UIButton } from "..";
import { motion } from "framer-motion";

import triangle from "../../Images/shapes/triangle.png";

const ObjectRotation = () => {
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const classes = useStyles();

  const handleOpen = () => {
    console.log(open);
    setOpen(true);
    setTimeout(handleClose, 3500);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rotateRight = () => {
    setRotation(rotation + 60);
  };

  const rotateLeft = () => {
    setRotation(rotation - 60);
  };
  return (
    <Container className="row">
      <GameContainer className="col-12">
        <QuestionContainer>
          <IconContainer>
            <IconButton onClick={rotateLeft}>
              <RotateLeft className={classes.icons} />
            </IconButton>
            <Typography variant="subtitle1" className={classes.info}>
              Left
            </Typography>
          </IconContainer>
          <ImageContainer animate={{ rotate: rotation }}>
            <Image src={triangle} alt="Polygon" />
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
        <AnswerSelection>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Rotate
          </Typography>
          <InfoContainer>
            <BsInfoCircleFill className={classes.info} />
            <Typography variant="subtitle1" className={classes.info}>
              Rotate the object as was shown
            </Typography>
          </InfoContainer>
          <UIButton variant="filled" type="button" onClick={handleOpen}>
            Show Image
          </UIButton>
        </AnswerSelection>
      </GameContainer>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <PopUp src={triangle} alt="Triangle" />
      </Backdrop>
    </Container>
  );
};

export default ObjectRotation;

const PopUp = ({ src, alt }) => {
  return (
    <PopImageContainer>
      <Image src={src} alt={alt} />
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
  backdrop: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(5px)",
  },
}));

const Container = styled.div`
  height: 100%;
`;

const GameContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
`;

const AnswerSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 30%;
  width: 100%;
`;

const ImageContainer = styled(motion.div)``;

const Image = styled.img`
  height: 22vw;
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
  justify-content: space-between;
  width: 100%;
`;

const PopImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
`;
