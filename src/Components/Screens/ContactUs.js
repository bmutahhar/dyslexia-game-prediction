import React, { Component } from "react";
import image from "../Images/last.png";
import stone from "../Images/Characters/stonefooter.png";
import kangaroo from "../Images/Characters/kangaroo.png";
import Background from "../../Components/Background";

import Character from "../Character";
import Jumbotron from "../Jumbotron";
import Navbar from "../Navbar";

export default class ContactUs extends Component {
  render() {
    const styles = {
      
      
      kangaroo: {
        height: "40%",
        position: "absolute",
        bottom: "0",
        right: "3%",
        zIndex: 2,
      },
      stone: {
        width: "100%",
        position: "absolute",
        zIndex:1,
        bottom: 0,
        right: 0,
        left: 0,
      },
    };
    return (
      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        customStyle={false}
        src={image}
        // style={{position:"fixed"}}
      >
        
        <Character
        className="kangaroo"
        src={kangaroo} 
        alt="kangaroo"
        style={styles.kangaroo} 
        />
        <Character
          className="stone"
          src={stone}
          alt="stone"
          style={styles.stone}
          onerror={`this.src=${stone}`}
        />
        <Navbar />
        <Jumbotron />
      </Background>
    );
  }
}