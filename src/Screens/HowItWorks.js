import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInUp, zoomInDown, bounce, zoomIn } from "react-animations";
import { useMediaQuery } from "react-responsive";
import { Character, Video, Background } from "../Components";

import image from "../Images/backgrounds/third.jpg";
import bird1 from "../Images/characters/bird1.png";
import bird2 from "../Images/characters/bird2.png";
import bird3 from "../Images/characters/bird3.png";
import bird4 from "../Images/characters/bird4.png";
import eagle from "../Images/characters/eagle.png";
import sun from "../Images/characters/sun.png";
import cloud from "../Images/characters/cloud.png";
import cloudsun from "../Images/characters/cloudsun.png";
import cloudfooter from "../Images/pagefooter/cloudfooter.png";

export default class HowItWorks extends Component {
  render() {
    return <Howitworkspage />;
  }
}

const Howitworkspage = () => {
  const [sunMessage, setSunMessage] = useState(false);
  const [eagleMessage, setEagleMessage] = useState(false);

  const [sunAnimation, setSunAnimation] = useState(true);
  const [sunpopup, setSunPopup] = useState(true);

  const [eagleAnimation, setEagleAnimation] = useState(true);
  const [eaglepopup, setEaglePopup] = useState(true);

  const displaySunMessage = () => {
    setSunAnimation(!sunAnimation);
    setSunPopup(false);
    setSunMessage(!sunMessage);
  };

  const displayEagleMessage = () => {
    setEagleAnimation(!eagleAnimation);
    setEaglePopup(false);
    setEagleMessage(!eagleMessage);
  };

  const isTablet = useMediaQuery({ query: "(max-device-width: 768px)" });
  return (
    <>
      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        id="howitworks"
        customStyle={false}
        src={image}
      >
        <BlueDiv className="d-flex justify-justify-content-between flex-column wow">
          <Video className="Video" style={styles.Video} />
        </BlueDiv>

        {eagleMessage && (
          <EagleMessage>
            <h3>Hello Kids, I'M Eaggie</h3>

            <p>Watch The Instructional Video To Learn How To Play The Game</p>
          </EagleMessage>
        )}
        {sunMessage && (
          <SunMessage>
            <h3>HI, I'M SUNNY</h3>

            <p>I Hope You Kids Have A Bright And Wonderful Day. :)</p>
          </SunMessage>
        )}

        {sunpopup && (
          <SunPopup className="wow">
            <h6>Hey!</h6>
          </SunPopup>
        )}

        {eaglepopup && (
          <EaglePopup className="wow">
            <h6>Hey!</h6>
          </EaglePopup>
        )}

        <Character
          className="eagle wow"
          src={eagle}
          alt="eagle"
          onClick={displayEagleMessage}
          style={styles.eagle}
          isAnimated={eagleAnimation}
          animation="pulse"
        />

        <Character
          className="cloudfooter"
          src={cloudfooter}
          alt="cloudfooter"
          style={styles.cloudfooter}
        />

        <Character
          className="bird1 wow"
          src={bird1}
          alt="bird1"
          style={isTablet ? styles.bird1tablet : styles.bird1}
          isAnimated={true}
          animation="zoomIn"
          transition="3s"
        />

        <Character
          className="bird2 wow"
          src={bird2}
          alt="bird2"
          style={styles.bird2}
          isAnimated={true}
          animation="zoomIn"
          transition="3.1s"
        />

        <Character
          className="bird3 wow"
          src={bird3}
          alt="bird3"
          style={styles.bird3}
          isAnimated={true}
          animation="zoomIn"
          transition="3.2s"
        />

        <Character
          className="bird4 wow"
          src={bird4}
          alt="bird4"
          style={styles.bird4}
          isAnimated={true}
          animation="zoomIn"
          transition="3.3s"
        />

        <Character
          className="sun wow"
          src={sun}
          alt="sun"
          onClick={displaySunMessage}
          style={styles.sun}
          isAnimated={sunAnimation}
          animation="pulse"
        />

        <Character
          className="cloud"
          src={cloud}
          alt="cloud"
          style={styles.cloud}
        />

        <Character
          className="cloudsun"
          src={cloudsun}
          alt="cloudsun"
          style={styles.cloudsun}
        />
      </Background>
    </>
  );
};

const zoomInupAnimation = keyframes`${zoomInUp}`;
const zoomIndownAnimation = keyframes`${zoomInDown}`;
const bounce1 = keyframes`${bounce}`;

const zoomAnimation = keyframes`${zoomIn}`;

const EagleMessage = styled.div`
  color: black;
  font-size: 18px;
  background-color: #fcfdff;
  align-items: center;
  text-align: left;
  justify-content: center;
  border-radius: 30px;
  border: 5px solid #8f4321;

  position: absolute;

  min-width: 10%;
  min-height: 25%;

  width: 15%;
  height: 45%;
  margin: 5px;
  padding: 20px;
  right: 2%;
  bottom: -68%;
  animation: 0.6s ${zoomInupAnimation};
`;

const BlueDiv = styled.div`
  background-image: linear-gradient(#17e2d4, #1050ce);
  box-shadow: 5px 20px 20px 5px rgba(0, 0, 0, 0.5);
  display: flex;

  width: 60%;
  height: 65%;
  margin: 2px;
  padding: 20px;
  border-radius: 20px;
  animation: 4s ${zoomAnimation};

  @media (min-width: 1920px) {
    height: 65%;
  }
  @media (min-width: 1440px) and (max-width: 1920px) {
    height: 65%;
  }
  @media (min-width: 1280px) and (max-width: 1439px) {
    height: 60%;
  }
  @media (min-width: 600px) and (max-width: 1279px) {
    height: 40%;
  }
`;

const SunMessage = styled.div`
  color: black;
  font-size: 18px;
  background-color: #ffe401;
  align-items: center;
  text-align: left;
  justify-content: center;
  border-radius: 30px;
  border: 5px solid #fdb200;

  position: absolute;

  min-width: 10%;
  min-height: 25%;

  width: 15%;
  height: 45%;
  margin: 5px;
  padding: 20px;
  left: 2%;
  bottom: -82%;
  animation: 0.6s ${zoomIndownAnimation};
`;

const SunPopup = styled.div`
  color: black;

  background-color: #ffe401;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #fdb200;
  position: absolute;
  min-width: 5%;
  min-height: 10%;
  width: 5%;
  height: 5%;
  margin: 5px;
  z-index: 3;
  padding-top: 20px;
  left: 8%;
  bottom: -35%;
  animation: 2s 1s 3 ${bounce1};
  @media (min-width: 1920px) {
    width: 5%;
    height: 12%;
    font-size: 24px;
  }
  @media (min-width: 1440px) and (max-width: 1920px) {
    font-size: 20px;
  }
  @media (min-width: 1280px) and (max-width: 1439px) {
    font-size: 18px;
    font-weight: 500;
  }
  @media (min-width: 960px) and (max-width: 1279px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 768px) and (max-width: 960px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: 700px) and (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: 600px) and (max-width: 699px) {
    width: 50px;
    height: 50px;
  }
`;

const EaglePopup = styled.div`
  color: black;

  background-color: #fcfdff;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #8f4321;
  position: absolute;
  min-width: 5%;
  min-height: 10%;
  width: 5%;
  height: 5%;
  margin: 5px;
  padding-top: 20px;
  right: 13%;
  bottom: -95%;
  z-index: 2;
  animation: 2s 1s 3 ${bounce1};
  @media (min-width: 1920px) {
    width: 5%;
    height: 12%;
    font-size: 24px;
  }
  @media (min-width: 1440px) and (max-width: 1920px) {
    font-size: 20px;
  }
  @media (min-width: 1280px) and (max-width: 1439px) {
    font-size: 18px;
    font-weight: 500;
  }
  @media (min-width: 960px) and (max-width: 1279px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 768px) and (max-width: 960px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: 700px) and (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: 600px) and (max-width: 699px) {
    width: 50px;
    height: 50px;
  }
`;

const styles = {
  Video: {
    height: "100%",
    width: "100%",
    border: "none",
  },

  sun: {
    position: "absolute",
    zIndex: 1,
    height: "13vw",
    bottom: "-35%",
    left: "0%",
  },

  cloudsun: {
    position: "absolute",
    zIndex: 2,
    height: "6vw",
    bottom: "-35%",
    left: "4%",
  },

  cloud: {
    position: "absolute",
    zIndex: 1,
    height: "6vw",
    bottom: "-20%",
    right: "4%",
  },

  bird1: {
    transform: "scaleX(-1)",
    position: "absolute",
    zIndex: 3,
    height: "8vw",
    bottom: "-30%",
    right: "17%",
  },

  bird1tablet: {},

  bird2: {
    position: "absolute",
    zIndex: 3,
    height: "6vw",
    bottom: "-25%",
    left: "19%",
  },

  bird3: {
    position: "absolute",
    zIndex: 3,
    height: "6vw",
    bottom: "-85%",
    left: "18%",
  },

  bird4: {
    position: "absolute",
    zIndex: 3,
    height: "8vw",
    bottom: "-84%",
    right: "16%",
  },

  eagle: {
    height: "13vw",
    position: "absolute",
    bottom: "-100%",
    right: "1%",
    zIndex: 2,
  },
  cloudfooter: {
    width: "100%",
    position: "absolute",
    zIndex: 1,

    bottom: "-100%",
    right: 0,
    left: 0,
  },
};
