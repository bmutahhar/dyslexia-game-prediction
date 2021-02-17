import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { PlayArrowRounded, PauseRounded } from "@material-ui/icons";

import { stunners } from "../Sounds";

const Player = ({ color }) => {
  const [iconName, setIconName] = useState("play");
  const [time, setTime] = useState("00:00");
  const player = useRef(null);
  const progressbar = useRef(null);
  const togglePlay = () => {
    if (iconName === "play") {
      player.current.play();
      setIconName("pause");
    } else {
      player.current.pause();
      setIconName("play");
    }
  };
  function calculateCurrentValue(currentTime) {
    var current_minute = parseInt(currentTime / 60) % 60,
      current_seconds_long = currentTime % 60,
      current_seconds = current_seconds_long.toFixed(),
      current_time =
        (current_minute < 10 ? "0" + current_minute : current_minute) +
        ":" +
        (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
  }

  function initProgressBar() {
    var current_time = player.current.currentTime;
    var currentTime = calculateCurrentValue(current_time);
    if (current_time === player.current.duration) {
      setIconName("play");
      setTime("00:00");
      progressbar.current.value = 0;
      return;
    }
    setTime(currentTime);
    progressbar.current.value =
      player.current.currentTime / player.current.duration;
  }

  return (
    <Container>
      <audio ref={player} src={stunners} onTimeUpdate={initProgressBar} />
      <Controls>
        <IconButton
          onClick={togglePlay}
          style={{ margin: 5, padding: 5, display: "inline" }}
        >
          {iconName === "play" ? (
            <PlayArrowRounded fontSize="large" style={{ color: color }} />
          ) : (
              <PauseRounded fontSize="large" style={{ color: color }} />
            )}
        </IconButton>
        <ProgressBarAndTimer>
          <ProgressBar ref={progressbar} max="1" value="0" />
          <Timer color={color}>{time}</Timer>
        </ProgressBarAndTimer>
      </Controls>
    </Container>
  );
};

export default Player;

const Container = styled.div`
  border-radius: 50px;
  width: 50%;
  background-color: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10px);
  border: 3px solid #C9C4C4;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressBarAndTimer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const ProgressBar = styled.progress`
  display: flex;
  flex-basis: 80%;
  flex-grow: 2;
  height: 4px;
  border-radius: 50px;
  &[value] {
    appearance: none;
    -webkit-appearance: none;
    ::-webkit-progress-bar {
      background-color: #eee;
      height: 4px;
      border-radius: 50px;
    }
    ::-webkit-progress-value {
      background-color: #00FF2B;
      height: 4px;
      border-radius: 50px;
    }
  }
`;
const Timer = styled.small`
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
  color: ${({ color }) => color};
`;
