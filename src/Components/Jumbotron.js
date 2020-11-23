import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/Jumbotron.css";
export default class Jumbotron extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid text-white rounded">
        <h1 className="display-3">Welcome, Kids!</h1>
        <p>
          Welcome to Dyslexia, a fun and friendly gaming environment for the
          diagnosis of dyslexia
          <br /> click on <b>START</b>
        </p>
        <Link to="/login">
          <button className="btn btn-outline-sucess btn-success text-white align-self-center btn-lg">
            Start
          </button>
        </Link>
      </div>
    );
  }
}
