import React, { Component, useState } from "react";
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { HiCheckCircle } from "react-icons/hi";

import styled from "styled-components";
import { Timer, QuestionScore } from "../Components";
import bg from "../Images/backgrounds/gamebg.png";

import larka from "../Images/characters/larka2.svg";
import larki from "../Images/characters/larki2.svg";

const ResultScreen = () => {
  var QuestionList = [];
  for (var i = 0; i < 15; i++) {
    QuestionList.push(
      <QuestionScore Answer={1} index={i} key={i}></QuestionScore>
    );
  }
  return (
    <Resultbg className="container-fluid" background={bg}>
      <Resultcards className="row">
        <Card>
          <TopBar className="row">
            <Profileimg>
              <img
                src={bg}
                alt="dp"
                style={{ height: "100%", width: "100%", borderRadius: "50%" }}
              ></img>
            </Profileimg>

            <h4 style={{ color: "white", fontSize: "1.6vw" }}>Game Level</h4>
            <Time>00:00</Time>
          </TopBar>
          {/* <Question className="row">
                        <p style={{ color: "white", fontSize: "1.3vw" }}>Question {1 + 1}</p>
                        <IoIosCheckmarkCircle style={{ color: "#F44336", fontSize: "2vw" }}></IoIosCheckmarkCircle>

                    </Question> */}

          {QuestionList}
        </Card>
        <Card>
          <Heading className="row">
            <h3 style={{ fontSize: "1.6vw" }}>Dyslexic Prediction</h3>
          </Heading>
          <Prediction className="row">
            <h1 style={{ fontSize: "5vw", color: "#FF6161" }}>{95}%</h1>
            <img
              src={larka}
              alt="larka"
              style={{ height: "10vw", marginLeft: "3vw" }}
            ></img>
          </Prediction>
          <Msg1 className="row">
            <p style={{ color: "#FF7F46" }}>
              Unfortunately your child has been diagnosed with Dyslexia with the
              prediction of 95%.
            </p>
          </Msg1>
          <Msg2 className="row">
            <p>
              {" "}
              We would recommend that you consider any of the nearest
              educational phycologist for your child. The phycologist will help
              your child in improving his condition
            </p>
          </Msg2>
          <NavButtons className="row">
            <PlayButton>Play Again</PlayButton>
            <ExitButton>Exit</ExitButton>
          </NavButtons>
        </Card>
        <Card></Card>
      </Resultcards>
    </Resultbg>
  );
};

export default ResultScreen;

const PlayButton = styled.button`
  border-radius: 7px;
  border: none;
  color: white;
  background-color: #3fcb6e;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 40%;
  height: 50%;
`;

const ExitButton = styled.button`
  border-radius: 7px;
  border: none;
  color: white;
  background-color: #cb3f3f;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 40%;
  height: 50%;
`;
const Heading = styled.div`
  margin-top: 1vw;
  display: flex;
  height: 10%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Prediction = styled.div`
  display: flex;
  flex-direction: row;
  height: 40%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Msg1 = styled.div`
  display: flex;
  margin-bottom: 1vw;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 100%;
`;

const Msg2 = styled.div`
  display: flex;
  margin-bottom: 1vw;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 100%;
`;

const NavButtons = styled.div`
  align-items: center;
  justify-content: space-around;
  height: 20%;
  width: 100%;
`;

const Time = styled.time`
  color: #ffffff;
  font-size: 1.6vw;
  margin: 2px 5px;
`;

const TopBar = styled.div`
  height: 13%;
  width: 100%;

  display: flex;
  padding-top: 1.5vw;
  padding-bottom: 1.5vw;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Profileimg = styled.div`
  background-color: red;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;
const Resultbg = styled.div`
  background-image: url(${({ background }) => background});
  height: 100vh;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const Resultcards = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

const Card = styled.div`
  padding-left: 1vw;
  padding-right: 1vw;
  padding-bottom: 1vw;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 90%;
  width: 30%;
  background-image: linear-gradient(to bottom, #388258, #0e0e13);
  color: white;
  border: 6px solid #5bc45f;
  border-radius: 10px;
`;
