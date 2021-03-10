import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Confetti from "react-confetti";
import { IconButton, Typography, Backdrop } from "@material-ui/core";
import gamebg from "../Images/backgrounds/gamebg.png";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { NavigateNext } from "@material-ui/icons";
import b1 from "../Images/badges/Dear.svg";
import b2 from "../Images/badges/Dog.svg";
import b3 from "../Images/badges/Elephant.svg";
import b4 from "../Images/badges/Foxy.svg";
import b5 from "../Images/badges/Monkey.svg";
import b6 from "../Images/badges/Panda.svg";
import b7 from "../Images/badges/Teddy.svg";
import b8 from "../Images/badges/Zebra.svg";
import { NextButton } from "../Components";
import { yay } from "../Sounds";


const BadgeVarient = {
  start: {
    opacity: 0,
    scale: 0.3,
    rotate: "0deg"
  },

  end: {
    opacity: 0,
    scale: 1,
    rotate: "360deg"
  }
}


const AllBadgeDisplay = () => {
  const alt = "Badge";
  const audio = new Audio(yay);
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const close = () => {
    audio.pause();
    setOpen(false);
  };

  useEffect(() => {
    audio.play();
  }, []);

  return (
    <MainContainer className="container-fluid" background={gamebg}>
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
            <NextButton onClick={close} />
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
    </MainContainer >
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
  height: 100vh;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
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

const useStyles = makeStyles(({ theme }) => ({
  backdrop: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(18px)",
  },
}));
