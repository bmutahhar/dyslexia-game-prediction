/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from "react";
// import {Link} from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import logo from "./Images/logo-cropped.png";
import "./styles/Navbar.css";


export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-transparent">
        <Link smooth to="#home" className="navbar-brand mr-auto">
          <img
            src={logo}
            alt="Dyslexia"
            className="img-fluid"
            width="100"
            height="50"
          />
        </Link>
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
            <Link smooth to="#home" className="nav-link text-white active">
              Home
            </Link>
            <Link smooth to="#howitworks" className="nav-link text-white">
              How it works?
            </Link>

            <Link smooth to="#about" className="nav-link text-white">
              About Us
            </Link>
            <Link smooth to="#contact" className="nav-link text-white">
              Contact Us
            </Link>
            
            <Link to="/login" className="nav-link">
              <button className="btn btn-outline-sucess btn-success text-white align-self-center btn-sm">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
