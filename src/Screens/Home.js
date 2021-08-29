import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInUp, bounce } from "react-animations";
import { useMediaQuery } from "react-responsive";
import { Background, Jumbotron, Character } from "../Components";

import image from "../Images/backgrounds/first.jpg";
import topMonkey from "../Images/characters/topmonkey.png";
import bottomMonkey from "../Images/characters/bottommonkey.png";
import grass from "../Images/pagefooter/grass.svg";
import lion from "../Images/characters/lion.png";

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
  text-align: center;
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

  @media (min-width: 1920px) {
    h3 {
      font-size: 44px;
    }
    font-size: 36px;
  }

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
    right: 1%;
    bottom: 25%;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    h3 {
      font-size: 18px;
    }
    font-size: 14px;
    width: 20%;
    height: 35%;
    padding: 10px 5px 5px 5px;
    right: 0%;
    bottom: 20%;
  }
`;

const MonkeyPopup = styled.div`
  color: black;
  background-color: #f9ceae;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  border: 2px solid #5b3e36;
  position: absolute;
  width: 70px;
  height: 70px;
  margin: 5px;
  left: 6%;
  bottom: 27%;
  animation: 2s 1s 3 ${bounce1};
  z-index: 2;
  @media (min-width: 1920px) {
    width: 5%;
    height: 12%;
    font-size: 24px;
    bottom: 35%;
    left: 7%;
  }
  @media (min-width: 1440px) and (max-width: 1920px) {
    bottom: 35%;
    font-size: 20px;
  }
  @media (min-width: 1280px) and (max-width: 1439px) {
    font-size: 18px;
    font-weight: 500;
    bottom: 30%;
  }
  @media (min-width: 960px) and (max-width: 1279px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 769px) and (max-width: 960px) {
    bottom: 21%;
    left: 5%;
    width: 60px;
    height: 60px;
  }
  @media (min-width: 700px) and (max-width: 768px) {
    bottom: 20%;
    left: 4%;
    width: 60px;
    height: 60px;
  }
  @media (min-width: 600px) and (max-width: 699px) {
    bottom: 18%;
    left: 4%;
    width: 50px;
    height: 50px;
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
  width: 70px;
  height: 70px;
  font-size: 14px;
  margin: 5px;
  right: 8%;
  bottom: 27%;
  animation: 2s 1s 3 ${bounce1};
  z-index: 2;
  @media (min-width: 1920px) {
    width: 5%;
    height: 12%;
    font-size: 24px;
    bottom: 35%;
    right: 9%;
  }

  @media (min-width: 1440px) and (max-width: 1920px) {
    bottom: 35%;
    font-size: 20px;
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    font-size: 18px;
    font-weight: 500;
    bottom: 30%;
  }

  @media (min-width: 960px) and (max-width: 1279px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 768px) and (max-width: 959px) {
    bottom: 22%;
    right: 7%;
    width: 60px;
    height: 60px;
  }
  @media (min-width: 700px) and (max-width: 767px) {
    bottom: 20%;
    right: 6%;
    width: 60px;
    height: 60px;
  }
  @media (min-width: 600px) and (max-width: 699px) {
    bottom: 18%;
    right: 6%;
    width: 50px;
    height: 50px;
  }
`;

const MonkeyMessage = styled.div`
  color: black;
  font-size: 16px;
  background-color: #f9ceae;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 30px;
  border: 5px solid #5b3e36;
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

  @media (min-width: 1920px) {
    h3 {
      font-size: 44px;
    }
    font-size: 36px;
  }

  @media (min-width: 901px) and (max-width: 1024px) {
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
    left: 1%;
    bottom: 25%;
  }

  @media (min-width: 600px) and (max-width: 767px) {
    h3 {
      font-size: 18px;
    }
    font-size: 14px;
    width: 20%;
    height: 35%;
    padding: 10px 5px 5px 5px;
    left: 0%;
    bottom: 20%;
  }
`;

const styles = {
  topMonkey: {
    height: "13vw",
    position: "absolute",
    top: 0,
    right: "15%",
    zIndex: 1,
  },
  bottomMonkey: {
    height: "13vw",
    position: "absolute",
    bottom: 5,
    left: "3%",
    zIndex: 1,
  },
  lion: {
    height: "13vw",
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
