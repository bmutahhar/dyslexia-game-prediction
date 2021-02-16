import React from "react";
import styled from "styled-components";

const Timer = ({ children }) => {
  return (
    <>
      <Time>{children}</Time>
    </>
  );
};

export default Timer;

const Time = styled.time`
  color: #ffffff;
  font-size: 2.5vw;
  margin:2px 5px;
`;
