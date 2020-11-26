import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fadeIn, slideInDown } from "react-animations";
import Character from "../Character";
import Home from "./Home";
import { Button } from "../Button";
import monkeytree from "../Images/Characters/monkeytree.png";
import tree from "../Images/Characters/tree.png";

export default class Login extends Component {
  render() {
    return (
      <>
        <Home />
        <Blur />
        <AnimatedDiv>
          <LoginComponent />
        </AnimatedDiv>
      </>
    );
  }
}

const LoginComponent = () => {
  return (
    <Background>
      <Form>
        <Span>Username</Span>
        <Input id="username" type="text" placeholder="Username or Email" />
        <Span>Password</Span>
        <Input id="password" type="password" placeholder="Password" />
        <FormButtonGroup>
          <Link to="/">
            <Button
              buttonStyle="btn--primary"
              buttonColor="green"
              buttonSize="btn--small"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/userform">
            <Button
              buttonStyle="btn--primary"
              buttonColor="green"
              buttonSize="btn--small"
            >
              Play As Guest
            </Button>
          </Link>
          <FormFooter>
            Don't have an account?
            <Link to="/signup" style={styles.link}>
              Sign up
            </Link>
          </FormFooter>
        </FormButtonGroup>
      </Form>
      <Character
        className="monkeytree"
        src={monkeytree}
        alt="Monkey & Tree"
        style={styles.monkeyTree}
      />
      <Character
        className="tree"
        src={tree}
        alt="Bottom Tree"
        style={styles.Tree}
      />
    </Background>
  );
};

const fadeInAnimation = keyframes`${slideInDown}`;

const AnimatedDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100vh;
  width: 100%;
  height: 100vh;
  z-index: 2;
  animation: 0.6s ${fadeInAnimation};
`;
const Form = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 5px;
  align-items: start;
  justify-content: center;
  width: 40%;
  font-size: 18px;
`;

const Background = styled.div`
  background-image: linear-gradient(to top right, #597e87, #0b8835);
  box-shadow: 10px 15px 10px rgba(0, 0, 0, 0.4);
  min-height: 80vh;
  min-width: 60%;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: left;
  z-index: 2;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 2px;
  margin-left: 5px;
  padding-left: 5px;
`;

const Input = styled.input.attrs((props) => ({
  id: props.id,
  type: props.type,
  placeholder: props.placeholder,
}))`
  border-radius: 41px;
  padding: 2px;
  border: none;
  width: 100%;
  text-align: left;
  padding-left: 15px;
  background-color: #c9e3d2;
  margin-bottom: 5px;

  &:focus {
    outline: none;
  }
`;

const FormButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 5px;
  margin: 5px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  backdrop-filter: blur(10px) brightness(45%) saturate(150%) opacity(100%);
`;

const styles = {
  signup: {
    margin: "5px",
    color: "white",
  },
  monkeyTree: {
    height: "48%",
    position: "absolute",
    top: "13%",
    left: "19.90%",
    zIndex: 1,
  },
  Tree: {
    height: "35%",
    position: "absolute",
    bottom: "10%",
    right: "19%",
    zIndex: 1,
  },
  link: {
    color: "white",
    margin: "2px",
    padding: "2px",
    textDecoration: "none",
  },
};
