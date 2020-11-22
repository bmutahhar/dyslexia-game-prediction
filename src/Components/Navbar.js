/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from "react";
import {Link} from "react-router-dom";
import whiteLogo from "./Images/logo-white.png"
import "./styles/Navbar.css";

const scrollTo = (id)=>{
  var el = document.getElementById(id);
  el.scrollIntoView({
    behavior:"smooth"
  }); 
}

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-transparent">
        <a className="navbar-brand mr-auto" href="/#home" onClick={()=>scrollTo('home')}>
          <img
            src={whiteLogo}
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
            <a className="nav-link text-white active" href="/#home" onClick={()=>scrollTo('home')} >
              Home
            </a>
            <a className="nav-link text-white" href="/#howitworks" onClick={()=>scrollTo('howitworks')}>
              How it works?
            </a>
            <a href="/#contact" className="nav-link text-white" onClick={()=>scrollTo('contact')}>
              Contact Us
            </a>
            <a className="nav-link text-white" href="/#about" onClick={()=>scrollTo('about')}>
              About Us
            </a>
            <Link to="/login" className="nav-link">
              <button className="btn btn-outline-sucess btn-success text-white align-self-center btn-sm">Log In</button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
