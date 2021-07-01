import React from "react";
import styled from "styled-components";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const QuestionScore = ({ answer, index }) => {
  return (
    <Question className="row">
      <p style={{ color: "white", fontSize: "1.5vw" }}>Question {index + 1}</p>
      {answer >= 0.5 ? (
        <IoIosCheckmarkCircle
          style={{ color: "#3BB54A", fontSize: "2vw" }}
        ></IoIosCheckmarkCircle>
      ) : (
        <IoIosCloseCircle
          style={{ color: "#F44336", fontSize: "2vw" }}
        ></IoIosCloseCircle>
      )}
    </Question>
  );
};

export default QuestionScore;

const Question = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5%;
  width: 100%;
  margin-top: 1vw;
`;
