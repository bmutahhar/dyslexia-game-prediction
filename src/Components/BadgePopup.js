import React from "react";
import styled from "styled-components";
import Confetti from "react-confetti";
import { Typography } from "@material-ui/core";
const BadgePopUp = ({ src, alt, badgeName }) => {
  return (
    <PopImageContainer>
      <Confetti numberOfPieces="500"/>

      <div>
        <Image src={src} alt={alt} />
      </div>
      <Typography
        variant="subtitle1"
        style={{
          color: "white",

          fontSize: "3.5vw",
          marginTop: "20px",
        }}
      >
        Congratulations!
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          color: "white",

          fontSize: "2.5vw",
          marginTop: "10px",
        }}
      >
        You've Earned A {badgeName} Badge. Keep playing!!!
      </Typography>
    </PopImageContainer>
  );
};

export default BadgePopUp;

const Image = styled.img`
  height: 22vw;
`;

const PopImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin-bottom: 50px;
`;
