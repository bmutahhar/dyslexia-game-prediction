import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import gamebg from "../Images/backgrounds/gamebg.png";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { IconButton } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

const ListVariant = {
  start: {
    opacity: 0,
    x: "-4vw",
  },
  end: {
    opacity: 1,
    x: 0,
  },
  texthover: {
    scale: 1.02,
    color: "lightgreen",
    originX: 0,

    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

const InstructionScreen = ({ onClick }) => {
  const classes = useStyles();

  return (
    <MainContainer className="container-fluid" background={gamebg}>
      <Typography
        variant="subtitle1"
        component={motion.p}
        style={{
          color: "white",

          // fontSize: "2.5vw",
          marginTop: "20px",
        }}
        initial={{
          opacity: 0,
          fontSize: "0vw",
        }}
        animate={{
          opacity: 1,
          fontSize: "2.5vw",
        }}
        transition={{
          ease: "easeIn",
          duration: 0.5,
          type: "spring",
          stiffeness: 40,
        }}
      >
        {" "}
        Game Instructions For Parents
      </Typography>

      <Instructions
        initial={{
          opacity: 0,
          width: "0vw",
          height: "0vh",
        }}
        animate={{
          opacity: 1,
          width: "70vw",
          height: "70vh",
        }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          type: "spring",
          stiffness: 50,
        }}
      >
        <ul>
          <List
            variants={ListVariant}
            initial="start"
            animate="end"
            transition={{
              delay: 1.6,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            Read out the questions to your child and help him/her understand as
            to how to solve them
          </List>
          <List
            variants={ListVariant}
            initial="start"
            animate="end"
            transition={{
              delay: 1.7,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            Do not help your child in answering the questions
          </List>
          <List
            variants={ListVariant}
            initial="start"
            animate="end"
            transition={{
              delay: 1.8,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            A parent should stay with the child throughout the game
          </List>
          <List
            variants={ListVariant}
            initial="start"
            animate="end"
            transition={{
              delay: 1.9,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            Keep any and everything away from your child that might distract
            his/her attention
          </List>
          <List
            variants={ListVariant}
            initial="start"
            animate="end"
            transition={{
              delay: 2.0,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            Keep on encourging your child throughout the game
          </List>
          <List
            variants={ListVariant}
            initial="start"
            animate="end"
            transition={{
              delay: 2.1,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            Do not get distracted yourself and notice your child's performance
          </List>
        </ul>
      </Instructions>
      <Proceed
        initial={{
          opacity: 0.3,
          width: "0vw",
          x: "-15vw",
        }}
        animate={{
          opacity: 1,
          width: "30vw",
          x: 0,
        }}
        transition={{
          delay: 2.2,
          duration: 0.8,
        }}
      >
        <Typography
          variant="subtitle1"
          component={motion.p}
          style={{
            color: "white",

            fontSize: "1.5vw",
            marginLeft: "6vw",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 3.16,
            duration: 0.9,
            type: "spring",
            stiffness: 40,
          }}
        >
          Proceed To The Game
        </Typography>
        <IconButton
          component={motion.button}
          onClick={onClick}
          initial={{
            opacity: 0,
            x: "-26vw",
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 3.1,
            duration: 0.8,
            type: "spring",
          }}
          className={classes.iconButton}
        >
          <NavigateNext className={classes.icon} />
        </IconButton>
      </Proceed>
    </MainContainer>
  );
};

export default InstructionScreen;

const List = styled(motion.li)`
  color: #faf6f3;
  font-size: 1.6vw;
  margin-top: 1vw;
`;
const Instructions = styled(motion.div)`
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  padding-left: 5vw;
  padding-top: 5vw;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid #c9c4c4;
`;
const Proceed = styled(motion.div)`
  display: flex;
  flex-direction: row;
  background-color: rgba(47, 255, 0, 0.5);
  height: 4.4vw;
  border-radius: 50px;
  align-items: center;
  font-align: center;
  justify-content: space-between;
  backdrop-filter: blur(20px);
  margin-top: 20px;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  align-items: center;
  justify-content: flex-start;
`;

const useStyles = makeStyles(({ theme }) => ({
  backdrop: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(18px)",
  },
  iconButton: {
    backgroundColor: "#25ce4a",
    padding: 5,
    width: "4.4vw",
    height: "4.4vw",
    "&:hover": {
      backgroundColor: "#027719",
    },
    "&:disabled": {
      backgroundColor: "#90ab95",
      color: "white",
      border: "none",
    },
  },
  icon: {
    fontSize: "3rem",
    color: "white",
  },
}));
