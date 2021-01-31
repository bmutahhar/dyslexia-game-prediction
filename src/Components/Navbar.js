/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from "react";
// import {Link} from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { FaTimes, FaBars } from "react-icons/fa";
import logo from "./Images/logo-cropped.png";
import { Button } from "./Button";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      button: true,
    };
  }
  handleClick = () => {
    this.setState({ click: !this.state.click });
  };
  closeMobileMenu = () => {
    this.setState({ click: false });
  };
  showButton = () => {
    if (window.innerWidth <= 960) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  render() {
    window.addEventListener("resize", this.showButton);

    return (
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-light bg-transparent"
        style={{ fontSize: "18px", fontWeight: "600" }}
      >
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
          onClick={this.handleClick}
        >
          {this.state.click ? <FaTimes /> : <FaBars />}
          {/* <span className="navbar-toggler-icon"></span> */}
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
            {this.state.button ? (
              <Link to={this.props.isNotMobileDevice? "/login": "/notSupported"} className="login-btn">
                <Button
                  buttonStyle="btn--outline"
                  buttonColor="green"
                  buttonSize="btn--small"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Link to={this.props.isNotMobileDevice? "/login": "/notSupported"} className="login-btn">
                <Button
                  buttonStyle="btn--outline"
                  buttonColor="green"
                  buttonSize="btn--wide"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
