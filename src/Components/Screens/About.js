import React, { Component } from "react";
import Background from "../../Components/Background";
import Character from "../Character";
import image from "../../Components/Images/second.png";
import card from "../Images/Characters/card.png";
import dolphin from "../Images/Characters/dolphin.png";
import fish1 from "../Images/Characters/fish1.png";
import fish2 from "../Images/Characters/fish2.png";
import fish3 from "../Images/Characters/fish3.png";
import fish4 from "../Images/Characters/fish4.png";
import fish5 from "../Images/Characters/fish5.png";
import fish6 from "../Images/Characters/fish6.png";
import dp1 from "../Images/Characters/dp1.png";
import dp2 from "../Images/Characters/dp2.png";
import dp3 from "../Images/Characters/dp3.png";

const Card = (props) => {
  const styles = {
    card: {
      display: "flex",
      fontSize: "16px",
      textAlign: "justify",
      textJustify: "inter-word",
      color: "white",
      width: "25%",
      height: "100%",
      padding: "5px",
      borderRadius: "50px",
      backgroundColor: "white",
      backgroundImage: `url(${props.src})`,
      backgroundRepeat:"no-repeat",
      boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
    },
  };
  return (
    <div
      className={`container ${props.className}`}
      style={
        props.customStyle
          ? Object.assign(styles.card, props.style)
          : styles.card
      }
    >
      {props.children}
    </div>
  );
};

const Image = (props) => {
  return (
    <div className={props.className} style={{ margin: 2, padding: 10 }}>
      <img
        src={props.src}
        alt={props.alt}
        onerror={props.onerror}
        style={props.style}
      />
    </div>
  );
};

export default class About extends Component {
  render() {
    return (
      <Background
        src={image}
        className="d-flex align-items-center justify-content-center flex-row"
        id = "about"
        customStyle={false}
      >
        <div
          className="d-flex justify-content-between"
          style={styles.cardWrapper}
        >
          <Card
            className="d-flex justify-content-start flex-column"
            src={card}
            customStyle={false}
          >
            <Image
              className="d-flex justify-content-center Supervisor"
              src={dp3}
              alt="Supervisor"
              style={styles.image}
            />
            <div
              style={{
                margin: 2,
                padding: 5,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <p style={styles.header}>Supervisor</p>
              <p style={styles.name}>Gulmina Rextina</p>
              <p style={styles.header}>INSTITUTION</p>
              <p style={styles.name}>COMSATS University,Islamabad</p>
            </div>
          </Card>
          <Card
            className="d-flex justify-content-start flex-column"
            src={card}
            customStyle={false}
          >
            <Image
              className="d-flex justify-content-center Team-Leader"
              src={dp2}
              alt="Team-Leader"
              style={styles.image}
            />
            <div
              style={{
                margin: 2,
                padding: 5,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <p style={styles.header}>TEAM LEADER</p>
              <p style={styles.name}>Mutahhar bin Muzaffar</p>
              <p style={styles.header}>INSTITUTION</p>
              <p style={styles.name}>COMSATS University,Islamabad</p>
              <p style={styles.header}>WORK DIVISION</p>
              <p style={styles.name}>Coding, Backend</p>
            </div>
          </Card>
          <Card
            className="d-flex justify-content-start flex-column"
            src={card}
            customStyle={false}
          >
            <Image
              className="d-flex justify-content-center Team-Member"
              src={dp1}
              alt="Team-Member"
              style={styles.image}
            />
            <div
              style={{
                margin: 2,
                padding: 5,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <p style={styles.header}>TEAM Member</p>
              <p style={styles.name}>Sher Alam Khan</p>
              <p style={styles.header}>INSTITUTION</p>
              <p style={styles.name}>COMSATS University,Islamabad</p>
              <p style={styles.header}>WORK DIVISION</p>
              <p style={styles.name}>Coding, Designing</p>
            </div>
          </Card>
        </div>

        <Character
          src={dolphin}
          className="dolphin"
          alt="dolphin"
          style={styles.dolphin}
        />
        <Character
          src={fish1}
          alt="fish1"
          className="fish1"
          style={styles.fish1}
        />
        <Character
          src={fish2}
          alt="fish2"
          className="fish2"
          style={styles.fish2}
        />
        <Character
          src={fish3}
          alt="fish3"
          className="fish3"
          style={styles.fish3}
        />
        <Character
          src={fish4}
          alt="fish4"
          className="fish4"
          style={styles.fish4}
        />
        <Character
          src={fish5}
          alt="fish5"
          className="fish5"
          style={styles.fish5}
        />
        <Character
          src={fish6}
          alt="fish6"
          className="fish6"
          style={styles.fish6}
        />
      </Background>
    );
  }
}

const styles = {
  cardWrapper: {
    // backgroundColor: "white",
    width: "90%",
    height: "80%",
    padding: "10px",
  },
  image: {
    width: "60%",
    height: "100%",
  },
  header: { fontSize: 20, fontWeight: 700 },
  name: { fontSize: 18 },
  dolphin: {
    position: "absolute",
    // zIndex: 2,
    height: "25%",
    bottom: "-100%",
    left: "3%",
    // right: "2%",
    // transform: "rotate(-20deg)",
  },
  fish1: {
    position: "absolute",
    zIndex: 2,
    height: "10%",
    bottom: "-45%",
    left: "32%",
  },
  fish2: {
    position: "absolute",
    // zIndex: 1,
    height: "10%",
    bottom: "-95%",
    left: "40%",
  },
  fish3: {
    position: "absolute",
    zIndex: 2,
    height: "20%",
    bottom: "-95%",
    right: "4%",
  },
  fish4: {
    position: "absolute",
    zIndex: 2,
    height: "20%",
    bottom: "-30%",
    left: "4%",
  },
  fish5: {
    position: "absolute",
    zIndex: 2,
    height: "10%",
    // width: "5%",
    bottom: "-25%",
    right: "30%",
  },
  fish6: {
    position: "absolute",
    zIndex: 2,
    height: "15%",
    // width: "5%",
    bottom: "-40%",
    right: "5%",
    transform: "rotate(-25deg)",
  },
};
