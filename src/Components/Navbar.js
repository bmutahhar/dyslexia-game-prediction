/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HashLink as LinkHash } from "react-router-hash-link";
import { FaTimes, FaBars } from "react-icons/fa";
import { ProfileAvatar } from "../Components";
import logo from "../Images/backgrounds/dyslexia.png";
// import logo from "../Images/backgrounds/logo-cropped.png";
import "./styles/Navbar.css";

const Navbar = ({ isNotMobileDevice }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(false);
  const [pfp, setPfp] = useState(null);
  const isUserLoggedIn = useSelector((state) => state.user.loggedIn);
  const handleClick = () => {
    setClick(!click);
  };
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", showButton);

    return () => window.removeEventListener("resize", showButton);
  }, []);

  useEffect(() => {
    const dp = JSON.parse(sessionStorage.getItem("pfp"));
    console.log(dp);
    setPfp(dp);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-dark bg-transparent text-center"
      style={{ fontSize: "18px", fontWeight: "600" }}
    >
      <LinkHash smooth to="#home" className="navbar-brand mr-auto">
        <img
          src={logo}
          alt="Dyslexia"
          className="img-fluid"
          width="150"
          height="50"
        />
      </LinkHash>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={handleClick}
      >
        {click ? <FaTimes /> : <FaBars />}
        {/* <span className="navbar-toggler-icon"></span> */}
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav  ml-auto">
          <LinkHash smooth to="#home" className="nav-link  active m-2">
            Home
          </LinkHash>
          <LinkHash smooth to="#howitworks" className="nav-link  m-2">
            How it works?
          </LinkHash>
          <LinkHash smooth to="#about" className="nav-link  m-2">
            About Us
          </LinkHash>
          <LinkHash smooth to="#contact" className="nav-link  m-2">
            Contact Us
          </LinkHash>
          <NavButtonContainer>
            {!isUserLoggedIn ? (
              <NavButton to={isNotMobileDevice ? "/login" : "/notSupported"}>
                Log In
              </NavButton>
            ) : (
              <ProfileAvatar menu pfp={pfp} />
            )}
          </NavButtonContainer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavButton = styled(Link)`
  background-color: #25ce4a;
  border-radius: 5px;
  border: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 20px;
  height: 70%;
  color: #fff;
  transition: 0.2s all ease-in-out;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #027719;
    transition: 0.2s all ease-in-out;
    color: #fff;
    text-decoration: none;
    outline: none;
    ${"" /* transform: scale(1.1); */}
  }

  &:active {
    background-color: #027719;
    ${"" /* box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.8); */}
    transform: translateY(2px);
    transition: 0.1s all ease-in;
  }

  @media screen and (max-width: 768px) {
    width: 25%;
    height: 25%;
  }
`;

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: white;

  @media screen and (max-width: 768px) {
    height: 25%;
  }
`;
