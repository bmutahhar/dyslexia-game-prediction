import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recordTime } from "../actions";

// This timer components displays both, forward, and backward clock.
const Timer = ({ initialMinutes, initialSeconds, reverse, callBack, stop }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    // The timer interval to run on each second.
    let myInterval = setInterval(() => {
      // If reverse clock is to be displayed
      if (reverse) {
        // Decrement the seconds
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          // If seconds == 0 and minutes == 0, clear the interval and call the callback function
          if (minutes === 0) {
            clearInterval(myInterval);
            // Callback is the function passed using props. The name 'callback' is generic which means to perform any given activity in the callback function.
            // The concept is to call the callback onces the backward clock stops. This is usually done when a tile is displayed for a few seconds and then it vanishes because the callback is executed.
            callBack();
          } 
           // If seconds == 0 but minutes != 0, decrement the minute and set the seconds to 59.
          else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      } 
      // This block is for the forward timer that is used to record the time for the entire gameplay session.
      else {
        // 30 minutes is the allowed time for each session, if the minutes exceeds then this, clear the interval automatically and record the time.
        if (minutes >= 30) {
          clearInterval(myInterval);
          const time = minutes * 60 + seconds;
          // Dispatch method called to record the time in redux store.
          dispatch(recordTime(time));
          history.push("/completed");
        } else if (seconds === 59) {
          // If seconds == 59, increment the minutes and reset the seconds to 0
          setMinutes(minutes + 1);
          setSeconds(0);
        } else {
          // Else just increment the seconds.
          setSeconds(seconds + 1);
        }
      }
    }, 1000);
    // If the given time is remaining, meaning it has not been 30 minutes yet but the game is completed, then clear the interval and record the time.
    if (stop) {
      clearInterval(myInterval);
      const time = minutes * 60 + seconds;
      dispatch(recordTime(time));
      history.push("/completed");
    }

    // clear function which is executed to free the memory by removing the time interval is the component is unmounted.
    // Unmouting means, the user navigates to different screen, the page is refreshed, window is closed, etc.
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
