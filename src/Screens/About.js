import React, { Component } from "react";
import { Background, Character } from "../Components";
import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";

import image from "../Images/backgrounds/second.jpg";
import dolphin from "../Images/characters/dolphin.png";
import fish1 from "../Images/characters/fish1.png";
import fish2 from "../Images/characters/fish2.png";
import fish3 from "../Images/characters/fish3.png";
import fish4 from "../Images/characters/fish4.png";
import fish5 from "../Images/characters/fish5.png";
import fish6 from "../Images/characters/fish6.png";
import dp1 from "../Images/characters/dp1.png";
import dp2 from "../Images/characters/dp2.png";
import dp3 from "../Images/characters/dp3.png";
import waves from "../Images/pagefooter/waves.svg";

export default class About extends Component {
  render() {
    return (
      <Background
        src={image}
        className="d-flex align-items-center justify-content-center flex-row"
        customStyle={false}
        id="about"
      >
        <Card1 className="wow">
          <Character
            src={dp2}
            alt="alam"
            className="dp2 wow"
            style={styles.dp}
            isAnimated={true}
            animation="zoomIn"
            transition="3s"
          />

          <Character
            src={fish6}
            alt="fish6"
            className="fish6 wow"
            style={styles.fish6}
            isAnimated={true}
            animation="zoomIn"
            transition="4s"
          />

          <Character
            src={fish4}
            alt="fish4"
            className="fish4 wow"
            style={styles.fish4}
            isAnimated={true}
            animation="zoomIn"
            transition="4.2s"
          />

          <Cardinfo>
            <Header>Team Leader</Header>
            <Info>Mutahhar-bin-Muzaffar</Info>
            <Header>Institute</Header>
            <Info>Comsats university Islamabad</Info>
            <Header>Work Division</Header>
            <Info>Coding, Backend</Info>
          </Cardinfo>
        </Card1>
        <Card2 className="wow">
          <Character
            src={dp1}
            alt="mutahhar"
            className="dp1 wow"
            style={styles.dp}
            isAnimated={true}
            animation="zoomIn"
            transition="3s"
          />

          <Character
            src={fish5}
            alt="fish5"
            className="fish5 wow"
            style={styles.fish5}
            isAnimated={true}
            animation="zoomIn"
            transition="4.2s"
          />

          <Character
            src={fish1}
            alt="fish1"
            className="fish1 wow"
            style={styles.fish1}
            isAnimated={true}
            animation="zoomIn"
            transition="4.2s"
          />

          <Cardinfo>
            <Header>Team Member</Header>
            <Info>Sher Alam Khan</Info>
            <Header>Institute</Header>
            <Info>Comsats university Islamabad</Info>
            <Header>Work Division</Header>
            <Info>Coding, Designing</Info>
          </Cardinfo>
        </Card2>
        <Card3 className="wow">
          <Character
            src={dp3}
            alt="gulmina"
            className="dp3 wow"
            style={styles.dp}
            isAnimated={true}
            animation="zoomIn"
            transition="3s"
          />
          <Character
            src={fish3}
            alt="fish3"
            className="fish3 wow"
            style={styles.fish3}
            isAnimated={true}
            animation="zoomIn"
            transition="4.2s"
          />

          <Character
            src={fish2}
            alt="fish2"
            className="fish2 wow"
            style={styles.fish2}
            isAnimated={true}
            animation="zoomIn"
            transition="4.2s"
          />
          <Cardinfo>
            <Header>Supervisor</Header>
            <Info>Gulmina Rextina</Info>
            <Header>Institute</Header>
            <Info>Comsats university Islamabad</Info>
          </Cardinfo>
        </Card3>

        <Character
          src={dolphin}
          alt="dolphin"
          className="dolphin wow"
          style={styles.dolphin}
          isAnimated={true}
          animation="zoomIn"
          transition="2s"
        />

        <Character
          src={waves}
          alt="waves"
          className="waves wow"
          style={styles.waves}
        />
      </Background>
    );
  }
}

const zoomAnimation = keyframes`${zoomIn}`;

const Card1 = styled.div`
  display: flex;
  position: absolute;
  width: 25%;
  height: 80%;
  bottom: -192%;
  background-image: linear-gradient(to top right, #1088bb, #0c1263);
  border-radius: 20px;
  box-shadow: 10px 15px 6px rgba(0, 0, 0, 0.25);
  animation: 1.5s ${zoomAnimation};
  transition: 0.3s;
  z-index: 1;
  text-align: center;

  &:hover {
    width: 27%;
    height: 87%;
    bottom: -195%;
    box-shadow: 12px 15px 7px rgba(0, 0, 0, 0.35);
  }
`;

const Card2 = styled(Card1)`
  left: 5%;
  animation: 2s ${zoomAnimation};
`;
const Card3 = styled(Card1)`
  right: 5%;
  animation: 2s ${zoomAnimation};
`;

const Header = styled.h3`
  color: white;
  font-size: 2vw;
`;
const Info = styled.p`
  color: #e6e9ed;
  font-size: 1.3vw;
`;

const Cardinfo = styled.div`
  border-radius: 9px;
  position: absolute;
  padding-top: 10%;
  background-color: rgba(3, 42, 94, 0.3);
  width: 95%;
  height: 65%;
  bottom: 4%;
  jusity-content: center;
  left: 2%;
  transition: 0.1s;
  z-index: 1;

  &:hover {
    padding-top: 14%;
  }
`;

const styles = {
  waves: {
    position: "absolute",
    zIndex: 0,
    bottom: "-200%",
    right: "0%",
    left: "0%",
  },

  dp: {
    height: "23%",
    position: "absolute",
    top: "6%",
    left: "30%",
  },

  dolphin: {
    position: "absolute",
    zIndex: 2,
    height: "25%",
    bottom: "-200%",
    left: "1%",
  },
  fish2: {
    position: "absolute",
    zIndex: 2,
    height: "15%",
    top: "-2%",
    right: "-10%",
    transform: "rotate(25deg) scaleX(-1)",
  },
  fish1: {
    position: "absolute",
    zIndex: 2,
    height: "16%",
    top: "-2%",
    left: "-10%",
    transform: "rotate(25deg)",
  },
  fish4: {
    position: "absolute",
    zIndex: 2,
    height: "20%",
    top: "-2%",
    left: "-10%",
    transform: "rotate(-18deg)",
  },
  fish3: {
    position: "absolute",
    zIndex: 2,
    height: "20%",
    bottom: "0.1%",
    right: "-10%",
    transform: "rotate(-5deg)",
  },
  fish5: {
    position: "absolute",
    zIndex: 2,
    height: "20%",
    bottom: "0.1%",
    right: "-10%",
    transform: "rotate(-20deg)",
  },
  fish6: {
    position: "absolute",
    zIndex: 2,
    height: "25%",
    bottom: "0.5%",
    right: "-10%",
    transform: "rotate(-23deg)",
  },
};
