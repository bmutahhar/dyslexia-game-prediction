import React, { Component } from "react";
import croppedLogo from "./Images/logo-cropped.png"
import "./styles/Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-transparent">
        <a className="navbar-brand mr-auto" href="#">
          <img
            src={croppedLogo}
            alt="Dyslexia"
            className="img-fluid"
            width="100"
            height="50"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav  ml-auto">
            <a className="nav-link text-white active" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
            <a className="nav-link text-white" href="#">
              How it works?
            </a>
            <a className="nav-link text-white" href="#">
              About Us
            </a>
            <a href="#" className="nav-link text-white">
              Contact Us
            </a>
            <a href="#" className="nav-link">
              <button className="btn btn-outline-sucess btn-success text-white align-self-center btn-sm">Log In</button>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
