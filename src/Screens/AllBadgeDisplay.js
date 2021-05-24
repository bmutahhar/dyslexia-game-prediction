import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NextButton } from "../Components";
import { CircularProgress, Typography, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import styled from "styled-components";
import Confetti from "react-confetti";

import b1 from "../Images/badges/Dear.svg";
import b2 from "../Images/badges/Dog.svg";
import b3 from "../Images/badges/Elephant.svg";
import b4 from "../Images/badges/Foxy.svg";
import b5 from "../Images/badges/Monkey.svg";
import b6 from "../Images/badges/Panda.svg";
import b7 from "../Images/badges/Teddy.svg";
import b8 from "../Images/badges/Zebra.svg";
import gamebg from "../Images/backgrounds/gamebg.png";
import errorguy from "../Images/characters/errorguy.gif";
import { yay } from "../Sounds";

const BadgeVarient = {
  start: {
    opacity: 0,
    scale: 0.3,
    rotate: "0deg",
  },

  end: {
    opacity: 0,
    scale: 1,
    rotate: "360deg",
  },
};

const AllBadgeDisplay = () => {
  const alt = "Badge";
  const url = process.env["REACT_APP_API_URL"];
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const finalScores = useSelector((state) => state.scores);
  const level = useSelector((state) => state.currentLevel);
  const time = useSelector((state) => state.time);
  const gender = useSelector((state) => state.gender);
  const isUserLoggedIn = useSelector((state) => state.user.loggedIn);
  let history = useHistory();
  const audio = new Audio(yay);
  const classes = useStyles();

  const close = () => {
    audio.pause();
    setOpen(false);
  };

  const submitScore = () => {
    const token = sessionStorage.getItem("token");
    let scores = [...finalScores];
    const data = {
      level: level.replace("/", ""),
      gender: gender,
      totalTimeToFinish: time,
      scores: scores,
    };
    let endpoint = `${url}/api/v1/nonUserScores`;
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (isUserLoggedIn && token) {
      endpoint = `${url}/api/v1/userScores`;
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
    }
    close();
    setStatus({ ...status, loading: true });
    fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((respJson) => {
        if (respJson.error.trim().length === 0) {
          console.log("Score Submitted Successfully!");
          setTimeout(() => {
            setStatus({ loading: false, success: true, error: "" });
            history.push("/diagnosisResult");
          }, 1000);
        } else {
          console.log("Error while submitting score...");
          setStatus({ loading: false, success: false, error: respJson.error });
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
        setStatus({ success: false, error: err, loading: false });
      });
  };

  useEffect(() => {
    audio.play();
  }, []);

  const AllBadgesJSX = (
    <Backdrop className={classes.backdrop} open={open}>
      <PopImageContainer>
        <Confetti numberOfPieces="500" />

        <BadgeDisplay>
          <Image src={b1} alt={alt} />
          <Image src={b2} alt={alt} />
          <Image src={b3} alt={alt} />
          <Image src={b4} alt={alt} />
        </BadgeDisplay>
        <BadgeDisplay>
          <Image src={b5} alt={alt} />
          <Image src={b6} alt={alt} />
          <Image src={b7} alt={alt} />
          <Image src={b8} alt={alt} />
        </BadgeDisplay>
        <Typography
          variant="subtitle1"
          style={{
            color: "white",
            fontSize: "3.5vw",
            marginTop: "20px",
          }}
        >
          Congratulations! You've Completed The Game
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            color: "white",

            fontSize: "2.5vw",
            marginTop: "10px",
          }}
        >
          You've Earned All Of The Badges
        </Typography>
        {/* <UIButton variant="contained" type="button">
                    Proceed
               </UIButton> */}
        <Proceed
        // initial={{
        //   opacity: 0.3,
        //   width: "0vw",
        //   x: "-15vw"
        // }}
        // animate={{
        //   opacity: 1,
        //   width: "30vw",
        //   x: 0
        // }}

        // transition={{
        //   delay: 2.2,
        //   duration: 0.8
        // }}
        >
          <Typography
            variant="subtitle1"
            component={motion.p}
            style={{
              color: "white",

              fontSize: "1.5vw",
              marginLeft: "6vw",
            }}
            // initial={{
            //   opacity: 0,
            // }}
            // animate={{
            //   opacity: 1,
            // }}

            // transition={{
            //   delay: 3.16,
            //   duration: 0.9,
            //   type: "spring",
            //   stiffness: 40

            // }}
          >
            Proceed To The Result
          </Typography>
          <NextButton onClick={submitScore} />
          {/* <IconButton component={motion.button} onClick={close}
          initial={{
            opacity: 0,
            x: "-26vw"


          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: 3.1,
            duration: 0.8,
            type: "spring",

          }}
          className={classes.iconButton}

        >
        <NavigateNext className={classes.icon} />
        </IconButton> */}
        </Proceed>
      </PopImageContainer>
    </Backdrop>
  );

  const LoadingJSX = (
    <LoadingContainer>
      <CircularProgress
        style={{ color: "white", marginBottom: 40 }}
        size={150}
      />
      <Typography
        variant="h5"
        style={{
          color: "white",
        }}
      >
        Submitting Score...
      </Typography>
    </LoadingContainer>
  );

  const ErrorJSX = (
    <Backdrop className={classes.backdrop} open={!status.success}>
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
        We are extremely sorry! We could not process the diagnosis due to some
        error.
      </Errormsg>
      <Errormsg2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.6,
          duration: 0.3,
        }}
      >
        Please try again.
      </Errormsg2>
    </Backdrop>
  );

  return (
    <MainContainer className="container-fluid" background={gamebg}>
      {open ? AllBadgesJSX : status.loading ? LoadingJSX : ErrorJSX}
    </MainContainer>
  );
};

export default AllBadgeDisplay;
const Proceed = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(47, 255, 0, 0.5);
  width: 30vw;
  height: 4.4vw;
  border-radius: 50px;
  align-items: center;
  font-align: center;
  justify-content: space-between;
  backdrop-filter: blur(20px);
`;
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Image = styled(motion.img)`
  height: 11vw;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 6px;
`;
const BadgeDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const PopImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const Errorgif = styled(motion.img)`
  transform: scaleX(-1);
`;

const Errormsg = styled(motion.h1)`
  color: white;
  font-size: 2.2vw;
`;

const Errormsg2 = styled(motion.h2)`
  color: white;
  font-size: 1.8vw;
`;

const useStyles = makeStyles(({ theme }) => ({
  backdrop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
}));
