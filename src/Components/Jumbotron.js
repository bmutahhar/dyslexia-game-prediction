import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HashLink as Link } from "react-router-hash-link";
import { useMediaQuery } from "react-responsive";
import styled, { keyframes } from "styled-components";
import { pulse } from "react-animations";
import { FiChevronsDown, FiChevronRight } from "react-icons/fi";

const Jumbotron = () => {
  const classes = useStyles();
  const isNotMobileDevice = useMediaQuery({
    query: "(min-device-width:600px)",
  });
  return (
    <>
      <Container>
        <Typography variant="h3" gutterBottom>
          Welcome to DyxsisML
        </Typography>
        <Typography variant="paragraph">
          DyxsisML, a fun and friendly gaming environment for the diagnosis of
          dyslexia.
          <br /> Click on <b>START</b>
        </Typography>
        <Button
          variant="contained"
          endIcon={<FiChevronRight className={classes.icon} />}
          component={Link}
          to={isNotMobileDevice? "/login":"/notSupported"}
          className={classes.button}
        >
          Start
        </Button>
        <PulseDiv>
          <Link
            smooth
            to="#howitworks"
            style={{ color: "white", textDecoration: "none" }}
          >
            Scroll below <br />
            <FiChevronsDown color="white" size="32px" />
          </Link>
        </PulseDiv>
      </Container>
    </>
  );
};

export default Jumbotron;

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#25ce4a",
    color: "#fff",
    width: "20%",
    "&:hover": {
      backgroundColor: "#027719",
      borderColor: "#027719",
      boxShadow: "none",
      color: "#fff",
      outline: "none",
    },
    [theme.breakpoints.up("xl")]: {
      height: "10%",
      fontSize: "24px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2vw",
      width: "40%",
    },
    [theme.breakpoints.down("550")]: {
      fontSize: "2.5vw",
    },
    [theme.breakpoints.down("425")]: {
      fontSize: "3vw",
    },
  },
  icon: { fontSize: "1.8vw", color: "white" },
  jumbotron: {},
}));

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background-color: transparent;
  z-index: 2;
  color: #fff;
  width: 50%;
  @media (min-width: 1920px) {
    height: 20vw;
    h3 {
      font-size: 3vw;
    }
    font-size: 1vw;
  }

  @media (min-width: 769px) and (max-width: 850px) {
    width: 70%;
  }

  @media (min-width: 600px) and (max-width: 768px) {
    width: 60%;
    h3 {
      font-size: 36px;
    }
    font-size: 16px;
  }
  @media (min-width: 425px) and (max-width: 599px) {
    width: 80%;
    h3 {
      font-size: 36px;
    }
    font-size: 16px;
  }
  @media (max-width: 424px) {
    width: 80%;
    h3 {
      font-size: 30px;
    }
    font-size: 12px;
  }
`;

const pulseAnimation = keyframes`${pulse}`;
const PulseDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-decoration: none;
  color: white;
  width: 25%;
  margin-top: 5px;
  animation: infinite 1s ${pulseAnimation};
  @media (min-width: 1920px) {
    font-size: 1vw;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`;
