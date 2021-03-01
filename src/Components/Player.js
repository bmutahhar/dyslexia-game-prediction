import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { PlayArrowRounded, PauseRounded } from "@material-ui/icons";
import { useSpeechSynthesis } from "react-speech-kit";

const Player = ({ color, text }) => {
  const [iconName, setIconName] = useState("play");
  const [time, setTime] = useState("00:00");
  const progressbar = useRef(null);
  const { speak, cancel, voices, speaking } = useSpeechSynthesis();
  const togglePlay = () => {
    if (iconName === "play") {
      speak({
        text: text,
        rate: 0.7,
        voice: voices[3],
      });
      setIconName("pause");
    } else {
      cancel();
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

  useEffect(() => {
    let seconds = 0;
    let count = 1;
    let timeInterval = "";
    let progressInterval = "";
    console.log(voices)
    if (speaking) {
      progressInterval = setInterval(() => {
        progressbar.current.value = count / text.length;
        count += 1;
      }, 250);
      timeInterval = setInterval(() => {
        seconds += 1;
        var currentTime = calculateCurrentValue(seconds);
        setTime(currentTime);
      }, 1000);
    } else {
      setIconName("play");
      setTime("00:00");
      progressbar.current.value = 0;
    }
    return () => {
      clearInterval(timeInterval);
      clearInterval(progressInterval);
    };
  }, [speaking]);

  return (
    <Container>
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
  border: 3px solid #c9c4c4;
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
      background-color: #00ff2b;
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
