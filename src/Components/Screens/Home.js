import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInUp } from "react-animations";
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
    return <HomePage handleLogin={this.props.handleLogin} />;
  }
}

const HomePage = (props) => {
  const [monkeyMessage, setMonkeyMessage] = useState(false);
  const [lionMessage, setLionMessage] = useState(false);

  const displayMonkeyMessage = () => setMonkeyMessage(!monkeyMessage);
  const displayLionMessage = () => setLionMessage(!lionMessage);

  return (

    <Background
      className="d-flex align-items-center justify-content-center flex-column"
      id="home"
      customStyle={false}
      src={image}
    >
      <Jumbotron handleLogin={props.handleLogin} />
      {lionMessage && (
        <LionMessage>
          <h3>Hey, I'M SIMBA</h3>
          <p>
            I'm A Friend Of Jonny, Me And Jonny Will Tag Along While You Have
            Some Fun
            </p>
        </LionMessage>
      )}
      {monkeyMessage && (
        <MonkeyMessage>
          <h3>HI, I'M JONNY</h3>
          <p>
            You Are Really Going To Enjoy This Game, Come Lets Have Some Fun
            </p>
        </MonkeyMessage>
      )}

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
        isAnimated={true}

      />







      <Character
        className="lion"
        src={lion}
        alt="Lion"
        style={styles.lion}
        onClick={displayLionMessage}
        isAnimated={true}

      />
      <Character
        className="grass"
        src={grass}
        alt="Grass"
        style={styles.grass}
        onerror={`this.src=${altGrass}`}
      />
    </Background>

  );
};

const fadeInAnimation = keyframes`${zoomInUp}`;


const LionMessage = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    color: black;
    font-size: 18px;
    background-color: #F3A61F;
    align-items: center;
    text-align: left;
    justify-content: center;
    border-radius: 30px;
    border: 5px solid #993A02;
    position: absolute;
    min-width: 10%;
    min-height: 25%;
    width: 15%;
    height: 45%;
    margin: 5px;
    padding: 20px;
    right: 3%;
    bottom: 30%;
    animation: 0.6s ${fadeInAnimation};
`;

const MonkeyMessage = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    color: black;
    font-size: 18px;
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
    padding: 20px;
    left: 3%;
    bottom: 30%;
    animation: 0.6s ${fadeInAnimation};
`;





const styles = {
  topMonkey: {
    height: "30%",
    position: "absolute",
    top: 0,
    right: "15%",
    zIndex: 1,

  },
  bottomMonkey: {
    height: "30%",
    position: "absolute",
    bottom: 5,
    left: "3%",
    zIndex: 1,


  },
  lion: {
    height: "30%",
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
