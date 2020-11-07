import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
import Navbar from "../Navbar";

import "./styles/Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid bg-custom d-flex flex-column align-items-center justify-content-center">
        <Navbar />
        <Jumbotron/>
   
      </div>
    );
  }
}
