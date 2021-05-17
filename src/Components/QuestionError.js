import React from "react";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { ProfileAvatar, CustomStepper } from "../Components";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import errorguy from "../Images/characters/errorguy.gif";

import gamebg from "../Images/backgrounds/gamebg.png";
const QuestionError = ({ open, onClick, message1, message2 }) => {
  const classes = useStyles();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  return (
    <Container className="container-fluid" background={gamebg}>
      <Header className="row">
        <Badges className="col-2">
          <BadgeHolder />
          <BadgeHolder />
          <BadgeHolder />
          <BadgeHolder />
          <BadgeHolder />
          <BadgeHolder />
          <BadgeHolder />
          <BadgeHolder />
        </Badges>
        <ProgressStepper className="col-8">
          <CustomStepper activeStep={0} />
        </ProgressStepper>
        <Profile className="col-2">
          <Time>00:00</Time>
          {loggedIn && <ProfileAvatar />}
        </Profile>
      </Header>
      <LoadingScreen className="row">
        <Backdrop className={classes.backdrop} open={open} onClick={onClick}>
          <Errorgif
            initial={{ opacity: 0, height: "0%" }}
            animate={{ opacity: 1, height: "40%" }}
            transition={{
              duration: 0.8,
              type: "tween",
            }}
            src={errorguy}
            alt="error guy GIF"
          />
          <Errormsg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.3,
              duration: 0.3,
            }}
          >
            {message1}
          </Errormsg>
          <Errormsg2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.6,
              duration: 0.3,
            }}
          >
            {message2}
          </Errormsg2>
        </Backdrop>
      </LoadingScreen>
    </Container>
  );
};

export default QuestionError;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    color: "#fff",
  },
  circularProgress: {
    color: "#fff",
    fontSize: 48,
  },
}));

const Time = styled.time`
  color: #ffffff;
  font-size: 2.5vw;
  margin: 2px 5px;
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
const LoadingScreen = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const Errorgif = styled(motion.img)`
  transform: scaleX(-1);
`;

const Errormsg = styled(motion.h1)`
  color: white;
  font-size: 2.5vw;
`;

const Errormsg2 = styled(motion.h2)`
  color: white;
  font-size: 1.5vw;
`;
