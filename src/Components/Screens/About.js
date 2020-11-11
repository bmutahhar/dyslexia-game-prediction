import React, { Component } from "react";
import Background from "../../Components/Background";
import image from "../../Components/Images/second.png";
import Jumbotron from "../Jumbotron";
import Navbar from "../Navbar";

export default class About extends Component {
  render() {
    return (
      <Background
        src={image}
        className="d-flex align-items-center justify-content-center flex-column"
        customStyle={true}
        style={{ backgroundImage: `url(${image})` }}
      >
        <Navbar />
        <Jumbotron />
      </Background>
    );
  }
}
