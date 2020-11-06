import React, { Component } from "react";
import "./Navbar.css"

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-transparent">
        <a className="navbar-brand mr-auto" href="#">
        <img src={require('./logo.png')} alt="Dyslexia" className="img-fluid" width="150" height="60"/>
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
            <a className="nav-link active" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
            <a className="nav-link" href="#">
             How it works?
            </a>
            <a className="nav-link" href="#">
              About Us
            </a>
            <a href="#" className="nav-link">
                Contact Us
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
