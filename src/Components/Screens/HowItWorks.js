import React, { Component } from "react";
import image from "../Images/third.png";
import bird1 from "../Images/Characters/bird1.png";
import bird2 from "../Images/Characters/bird2.png";
import bird3 from "../Images/Characters/bird3.png";
import bird4 from "../Images/Characters/bird4.png";

import eagle from "../Images/Characters/eagle.png";
import sun from "../Images/Characters/sun.png";
import cloud from "../Images/Characters/cloud.png";
import cloudsun from "../Images/Characters/cloudsun.png";
import cloudfooter from "../Images/Characters/cloudfooter1.png";
import Background from "../../Components/Background";

import Character from "../Character";
import Video from "../Video";


export default class HowItWorks extends Component {
  render() {
    return (
      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        id="howitworks"
        customStyle={false}
        src={image}
      >
        <Background
          className="d-flex justify-justify-content-between flex-column"
          style={styles.blueDiv}
          customStyle={true}
        >
          <Video className="Video" style={styles.Video} />
        </Background>
        {/* <button style={styles.button}>click me</button> */}

        <Background
          className="d-flex justify-justify-content-between flex-column"
          style={styles.msgDiv}
          customStyle={true}
        >
          <h3>Hello Kids, I'M Eaggie</h3>
          <p>Watch The Instructional Video To Learn How To Play The Game</p>
        </Background>

        <Background
          className="d-flex justify-justify-content-between flex-column"
          style={styles.msgDiv1}
          customStyle={true}
        >
          <h3>HI, I'M SUNNY</h3>
          <p>I Hope You Kids Have A Bright And Wonderful Day. :)</p>
        </Background>

        <Character
          className="eagle"
          src={eagle}
          alt="eagle"
          style={styles.eagle}
        />

        <Character
          className="cloudfooter"
          src={cloudfooter}
          alt="cloudfooter"
          style={styles.cloudfooter}
        />

        <Character
          className="bird1"
          src={bird1}
          alt="bird1"
          style={styles.bird1}
        />

        <Character
          className="bird2"
          src={bird2}
          alt="bird2"
          style={styles.bird2}
        />

        <Character
          className="bird3"
          src={bird3}
          alt="bird3"
          style={styles.bird3}
        />

        <Character
          className="bird4"
          src={bird4}
          alt="bird4"
          style={styles.bird4}
        />

        <Character className="sun" src={sun} alt="sun" style={styles.sun} />

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
    );
  }
}

const styles = {
  blueDiv: {
    backgroundImage: "linear-gradient(#17E2D4, #1050CE)",
    boxShadow: "5px 20px 20px 5px rgba(0, 0, 0, 0.5)",
    display: "flex",

    minWidth: "50%",
    minHeight: "40%",
    width: "60%",
    height: "65%",
    margin: "2px",
    padding: "20px",
    borderRadius: "20px",
  },

  msgDiv: {
    color: "black",
    fontSize: "18px",
    backgroundColor: "#FCFDFF",
    alignItems: "center",
    textAlign: "left",
    justifyContent: "center",
    borderRadius: "30px",
    border: "5px solid #8F4321",

    position: "absolute",

    minWidth: "10%",
    minHeight: "25%",

    width: "15%",
    height: "45%",
    margin: "5px",
    padding: "20px",
    right: "2%",
    bottom: "-68%",
  },

  msgDiv1: {
    color: "black",
    fontSize: "18px",
    backgroundColor: "#FFE401",
    alignItems: "center",
    textAlign: "left",
    justifyContent: "center",
    borderRadius: "30px",
    border: "5px solid #FDB200",

    position: "absolute",

    minWidth: "10%",
    minHeight: "25%",

    width: "15%",
    height: "45%",
    margin: "5px",
    padding: "20px",
    left: "2%",
    bottom: "-82%",
  },

  Video: {
    height: "100%",
    width: "100%",
    border: "none",
  },

  sun: {
    position: "absolute",
    zIndex: 1,
    height: "25%",
    bottom: "-35%",
    left: "0%",
  },

  cloudsun: {
    position: "absolute",
    zIndex: 2,
    height: "13%",
    bottom: "-35%",
    left: "4%",
  },

  cloud: {
    position: "absolute",
    zIndex: 1,
    height: "13%",
    bottom: "-20%",
    right: "4%",
  },

  bird1: {
    transform: "scaleX(-1)",
    position: "absolute",
    zIndex: 3,

    bottom: "-30%",
    right: "17%",
  },

  bird2: {
    position: "absolute",
    zIndex: 3,

    bottom: "-25%",
    left: "19%",
  },

  bird3: {
    position: "absolute",
    zIndex: 3,

    bottom: "-85%",
    left: "18%",
  },

  bird4: {
    position: "absolute",
    zIndex: 3,

    bottom: "-84%",
    right: "16%",
  },

  eagle: {
    height: "30%",
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
  button: {
    textAlign: "center",
    position: "absolute",
    backgroundColor: "#66CC00",
    color: "white",
    // minWidth: "2%",
    // minHeight: "5%",
    width: "6%",

    height: "12%",
    right: "2%",
    bottom: "-32%",
    borderRadius: "50%",

    border: "none",
  },
};
