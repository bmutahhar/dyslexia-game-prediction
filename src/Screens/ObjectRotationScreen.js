import React from "react";
import styled from "styled-components";
import { Player } from "../Components";

import gamebg from "../Images/backgrounds/gamebg.png";

const ObjectRotationScreen = () => {
  return (
    <Container className="container-fluid" background={gamebg}>
      <Player color="white"/>
    </Container>
  );
};

export default ObjectRotationScreen;

const Container = styled.div`
  height: 100vh;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
