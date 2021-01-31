import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInUp, bounce } from "react-animations";
import { useMediaQuery } from "react-responsive";

import image from "../Images/first.png";
import topMonkey from "../Images/Characters/topmonkey.png";
import bottomMonkey from "../Images/Characters/bottommonkey.png";
import grass from "../Images/Characters/grass.svg";
import altGrass from "../Images/Characters/grass.png";
import lion from "../Images/Characters/lion.png";
import Background from "../Background";
import Character from "../Character";
import Jumbotron from "../Jumbotron";

export default class Home extends Component {
  render() {
    return <HomePage />;
  }
}

const HomePage = () => {
  const [monkeyMessage, setMonkeyMessage] = useState(false);
  const [lionMessage, setLionMessage] = useState(false);

  const [monkeyAnimation, setMonkeyAnimation] = useState(true);
  const [monkeypopup, setMonkeyPopup] = useState(true);

  const [lionAnimation, setLionAnimation] = useState(true);
  const [lionpopup, setLionPopup] = useState(true);

  const isNotMobileDevice = useMediaQuery({
    query: "(min-device-width:600px)",
  });

  const displayMonkeyMessage = () => {
    setMonkeyMessage(!monkeyMessage);
    setMonkeyAnimation(!monkeyAnimation);
    setMonkeyPopup(false);
  };
  const displayLionMessage = () => {
    setLionMessage(!lionMessage);
    setLionAnimation(!lionAnimation);
    setLionPopup(false);
  };

  return (
    <Background
      className="d-flex align-items-center justify-content-center flex-column"
      id="home"
      customStyle={false}
      src={image}
    >
      <Jumbotron />
      {isNotMobileDevice && lionMessage && (
        <LionMessage>
          <h3>Hey, I'M SIMBA</h3>
          <p>
            I'm A Friend Of Jonny, Me And Jonny Will Tag Along While You Have
            Some Fun
          </p>
        </LionMessage>
      )}
      {isNotMobileDevice && monkeyMessage && (
        <MonkeyMessage>
          <h3>HI, I'M JONNY</h3>
          <p>
            You Are Really Going To Enjoy This Game, Come Lets Have Some Fun
          </p>
        </MonkeyMessage>
      )}

      {isNotMobileDevice && monkeypopup && <MonkeyPopup>Hey!</MonkeyPopup>}

      {isNotMobileDevice && lionpopup && <LionPopup>Hey!</LionPopup>}
      {isNotMobileDevice && (
        <>
          <Character
            className="top-monkey"
            src={topMonkey}
            alt="Top Monkey"
            style={styles.topMonkey}
          />
          <Character
            className="bottom-monkey"
            src={bottomMonkey}
            alt="Bottom Monkey"
            onClick={displayMonkeyMessage}
            style={styles.bottomMonkey}
            isAnimated={monkeyAnimation}
            animation="pulse"
            transition=" infinite 1s"
          />

          <Character
            className="lion"
            src={lion}
            alt="Lion"
            style={styles.lion}
            onClick={displayLionMessage}
            isAnimated={lionAnimation}
            animation="pulse"
            transition=" infinite 1s"
          />
        </>
      )}
      <Character
        className="grass"
        src={grass}
        alt="Grass"
        style={styles.grass}
        onError={() => `this.src=${altGrass}`}
      />
    </Background>
  );
};

const fadeInAnimation = keyframes`${zoomInUp}`;
const bounce1 = keyframes`${bounce}`;

const LionMessage = styled.div`
  color: black;
  font-size: 16px;
  background-color: #f3a61f;
  align-items: center;
  text-align: left;
  justify-content: center;
  border-radius: 30px;
  border: 5px solid #993a02;
  position: absolute;
  min-width: 10%;
  min-height: 25%;
  width: 15%;
  height: 45%;
  margin: 5px;
  padding: 10px;
  right: 3%;
  bottom: 30%;
  animation: 0.6s ${fadeInAnimation};
  z-index: 1;

  @media (min-width: 900px) and (max-width: 1024px) {
    h3 {
      font-size: 18px;
    }
    font-size: 14px;
    width: 15%;
    height: 40%;
  }

  @media (min-width: 768px) and (max-width: 900px) {
    h3 {
      font-size: 18px;
    }
    font-size: 14px;
    width: 20%;
    height: 35%;
    padding: 5px;
  }
`;

const MonkeyPopup = styled.div`
  color: black;

  background-color: #f9ceae;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 15px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  border: 2px solid #5b3e36;
  position: absolute;
  margin: 5px;
  left: 6%;
  bottom: 27%;
  animation: 2s 1s 3 ${bounce1};
  z-index: 2;
  @media (min-width:1920px){
    width:5%;
    height:12%;
    font-size:24px;
    bottom:35%;
    left:7%;
  }
  @media (min-width: 1280px) and (max-width:1439px){
    padding: 17px;
    font-size: 18px;
    font-weight: 500;
    bottom: 30%;
  }
  @media (min-width: 1440px) and (max-width: 1920px) {
    bottom: 35%;
    font-size: 20px;
    padding:20px;
  }
  @media (min-width:768px) and (max-width:960px){
    bottom: 21%;
    left:5%;
  }
  @media (min-width:700px) and (max-width:767px){
    bottom: 20%;
    padding:10px;
    left:4%;
  }
  @media (min-width:600px) and (max-width:699px){
    bottom: 18%;
    padding:10px;
    left:4%;
  }
`;

const LionPopup = styled.div`
  color: black;

  background-color: #f3a61f;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 50%;
  border: 2px solid #993a02;
  position: absolute;
  font-size: 14px;
  padding: 15px;
  margin: 5px;
  right: 8%;
  bottom: 27%;
  animation: 2s 1s 3 ${bounce1};
  z-index: 2;
  @media (min-width:1920px){
    width:5%;
    height:12%;
    font-size:24px;
    bottom:35%;
    right:9%;
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    padding: 17px;
    font-size: 18px;
    font-weight: 500;
    bottom: 30%;
  }
  @media (min-width: 1440px) and (max-width: 1920px) {
    bottom: 35%;
    font-size: 20px;
    padding:20px;
  }
  @media (min-width:768px) and (max-width:960px){
    bottom: 22%;
    right:7%;
  }
  @media (min-width:700px) and (max-width:767px){
    bottom: 20%;
    padding:10px;
    right:6%;
  }
  @media (min-width:600px) and (max-width:699px){
    bottom: 18%;
    padding:10px;
    right:6%;
  }
`;

const MonkeyMessage = styled.div`
    
    color: black;
    font-size: 16px;
    background-color: #F9CEAE;
    align-items: center
    text-align: left;
    justify-content: center;
    border-radius: 30px;
    border: 5px solid #5B3E36;
    position: absolute;
    min-width: 10%;
    min-height: 25%;
    width: 15%;
    height: 45%;
    margin: 5px;
    padding: 10px;
    left: 2%;
    bottom: 30%;
    animation: 0.6s ${fadeInAnimation};
    
    @media (min-width: 900px) and (max-width: 1024px) {
    h3 {
      font-size: 18px;
    }
    font-size: 14px;
    width: 15%;
    height: 40%;
  }

  @media (min-width: 768px) and (max-width: 900px) {
    h3 {
      font-size: 18px;
    }
    font-size: 14px;
    width: 20%;
    height: 35%;
    padding: 5px;
  }

  @media (max-width: 425px) {
    display: none;
  }
`;

const styles = {
  topMonkey: {
    height: "12.5vw",
    position: "absolute",
    top: 0,
    right: "15%",
    zIndex: 1,
  },
  bottomMonkey: {
    height: "12.5vw",
    position: "absolute",
    bottom: 5,
    left: "3%",
    zIndex: 1,
  },
  lion: {
    height: "12.5vw",
    position: "absolute",
    bottom: 5,
    right: "5%",
    zIndex: 1,
  },
  grass: {
    width: "100%",
    position: "absolute",
    zIndex: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
};
