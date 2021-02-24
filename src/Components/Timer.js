import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Timer = ({ initialMinutes, initialSeconds, reverse, callBack }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (reverse) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            callBack();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      } else {
        if (minutes >= 30) {
          clearInterval(myInterval);
        } else if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        } else {
          setSeconds(seconds + 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      {minutes === 0 && seconds === 0 ? (
      <Time>00:00</Time>
      ) : (
        <Time>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </Time>
      )}
    </>
  );
};

export default Timer;

const Time = styled.time`
  color: #ffffff;
  font-size: 2.5vw;
  margin: 2px 5px;
`;
