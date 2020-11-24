import React, { Component } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { FiChevronsDown, FiChevronRight } from "react-icons/fi";
import { Button } from "./Button";
export default class Jumbotron extends Component {
  render() {
    return (
      <>
        <div
          className="jumbotron jumbotron-fluid text-white rounded d-flex align-content-center justify-content-center align-items-center flex-column"
          style={styles.jumbotron}
        >
          <h1 className="display-3">Welcome to DyxsisML</h1>
          <p>
            DyxsisML, a fun and friendly gaming environment for the diagnosis of
            dyslexia.
            <br /> Click on <b>START</b>
          </p>
          {/* <Link to="/login">
            <button className="btn btn-outline-sucess btn-success text-white align-item-center btn-lg">
              Start
              <FiChevronRight color="white" size="24px" />
            </button>
          </Link> */}
          {/* <Link to="/login">
            <Button buttonStyle="btn--primary" buttonColor="green" buttonSize="btn--medium" >
              Start
              <FiChevronRight color="white" size="24px" />
            </Button>
          </Link> */}
          <Button
            buttonStyle="btn--primary"
            buttonColor="green"
            buttonSize="btn--medium"
            onClick={this.props.handleLogin}
          >
            Start
            <FiChevronRight color="white" size="24px" />
          </Button>
          <Link
            smooth
            to="#howitworks"
            className="d-flex align-items-center flex-column"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              color: "white",
              width: "120px",
              marginTop: "15px",
            }}
          >
            Scroll below <br />
            <FiChevronsDown color="white" size="32px" />
          </Link>
        </div>
      </>
    );
  }
}
const styles = {
  jumbotron: {
    background: "transparent",
    minWidth: "60%",
    minHeight: "auto",
    borderWidth: "3px",
    borderRadius: "3px",
  },
};
