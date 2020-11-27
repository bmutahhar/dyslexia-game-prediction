import React, { Component } from "react";
import { HashLink as Link } from "react-router-hash-link";
import styled, { keyframes } from "styled-components";
import { pulse } from "react-animations";
import { FiChevronsDown, FiChevronRight } from "react-icons/fi";
import { BsCircleFill } from "react-icons/bs";



import { Button } from "./Button";
export default class Jumbotron extends Component {
  render() {
    return (
      <>
        <div
          className="jumbotron jumbotron-fluid text-white rounded d-flex align-content-center justify-content-center align-items-center flex-column"
          style={styles.jumbotron}
        >
          <h1 className="display-4">Welcome to DyxsisML</h1>
          <p>
            DyxsisML, a fun and friendly gaming environment for the diagnosis of
            dyslexia.
            <br /> Click on <b>START</b>
          </p>
          <Link to="/login">
            <Button
              buttonStyle="btn--primary"
              buttonColor="green"
              buttonSize="btn--medium"
            >
              Start
              <FiChevronRight color="white" size="24px" />
            </Button>
          </Link>
          <PulseDiv>
            <Link smooth to="#howitworks" style={styles.link}>
              Scroll below <br />
              <FiChevronsDown color="white" size="32px" />
            </Link>
          </PulseDiv>
        </div>
      </>
    );
  }
}

const pulseAnimation = keyframes`${pulse}`;
const PulseDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-decoration: none;
  color: white;
  width: 120px;
  margin-top: 5px;
  animation: infinite 1s ${pulseAnimation};
`;

const styles = {
  jumbotron: {
    background: "transparent",
    minWidth: "60%",
    minHeight: "auto",
    borderWidth: "3px",
    borderRadius: "3px",
    zIndex: 2,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
};
