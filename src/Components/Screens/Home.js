import React, { Component } from "react";
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
    
    return (
      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        id = "home"
        customStyle={false}
        src={image}
        // style={{position:"fixed"}}
      >
        <Jumbotron />
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
          style={styles.bottomMonkey}
        />
        <Character
        className="lion"
        src={lion} 
        alt="Lion"
        style={styles.lion} 
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
  }
}
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
    // backgroundColor: "#eee",
    width: "100%",
    position: "absolute",
    zIndex:0,
    bottom: 0,
    right: 0,
    left: 0,
  },
};