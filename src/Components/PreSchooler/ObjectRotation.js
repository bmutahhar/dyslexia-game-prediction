import React from "react";
import styled from "styled-components";
import { IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RotateLeft, RotateRight, Info } from "@material-ui/icons";
import { BsInfoCircleFill } from "react-icons/bs";
import { NextButton, UIButton } from "../../Components";

import triangle from "../../Images/shapes/triangle.png";

const ObjectRotation = () => {
  const classes = useStyles();
  return (
    <>
      <Container className="col-10">
        <MainArea className="row">
          <GameContainer className="col-10">
            <QuestionContainer>
              <IconContainer>
                <IconButton>
                  <RotateLeft className={classes.icons} />
                </IconButton>
                <Typography variant="subtitle1" className={classes.title}>
                  Left
                </Typography>
              </IconContainer>
              <ImageContainer>
                <Image src={triangle} alt="Polygon" />
              </ImageContainer>
              <IconContainer>
                <IconButton>
                  <RotateRight className={classes.icons} />
                </IconButton>
                <Typography variant="subtitle1" className={classes.title}>
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
                <Typography variant="subtitle1" className={classes.title}>
                  Rotate the object as was shown
                </Typography>
              </InfoContainer>
              <UIButton variant="filled" type="button" onClick={{}}>Show Image</UIButton>
            </AnswerSelection>
          </GameContainer>
          <AnswerSubmit className="col-2">
            <NextButton />
          </AnswerSubmit>
        </MainArea>
      </Container>
    </>
  );
};

export default ObjectRotation;

const useStyles = makeStyles(({ theme }) => ({
  icons: {
    fontSize: "5rem",
    color: "white",
  },
  title: {
    color: "white",
  },
  info: {
    color: "white",
    margin: "2px 5px",
    fontSize: 20,
  },
}));

const Container = styled.div`
  height: 100%;
  border: 2px solid orange;
`;

const GameContainer = styled.div`
  height: 100%;
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
`;

const Gameoption = styled.div`
  border: 2px solid black;
  height: 30%;
`;

const MainArea = styled.div`
  border: 2px solid black;
  height: 100%;
`;
const AnswerSelection = styled.div`
  display: flex;
  border: 2px solid yellow;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 30%;
  width: 100%;
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

const Emptyspace = styled.div`
  border: 2px solid green;
  background-color: black;
`;

const ImageContainer = styled.div`
  border: 2px solid red;
`;

const Image = styled.img`
  ${"" /* height: 80%; */}
  border: 2px solid white;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  margin: 5px 25px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  margin-bottom:15px;
`;

const QuestionContainer = styled.div`
  border: 2px solid cyan;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
