import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { ProfileAvatar, Timer, CustomStepper } from "../Components";
import { useSelector } from "react-redux";
import doggy from "../Images/characters/dog4.gif";

import gamebg from "../Images/backgrounds/gamebg.png";
const Loader = ({ open, onClick }) => {
  const classes = useStyles();
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
        </Profile>
      </Header>
      <LoadingScreen className="row">
        <Backdrop className={classes.backdrop} open={open} onClick={onClick}>

          <Doggy src={doggy} alt="dog Waiting GIF" />
          <Loadingmsg>Loading......Please Wait!</Loadingmsg>
        </Backdrop>

      </LoadingScreen>

    </Container>


  );
};

export default Loader;
const Loadingmsg = styled.h1`
color: white;
height: 7vh;
font-size: 2.5vw;

overflow: hidden;
  border-right: .20em solid green;
  white-space: nowrap;
  letter-spacing: .15em;
  animation: 
    typing 2.5s steps(35, end),
    blink-caret .4s step-end infinite;


@keyframes typing {
  from { width: 0 }
  to { width: 37% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: green; }
}
`;
const useStyles = makeStyles((theme) => ({
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
const Doggy = styled.img`
  height: 40%;
  transform: scaleX(-1);
`;