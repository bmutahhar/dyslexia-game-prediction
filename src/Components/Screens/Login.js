import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import Character from "../Character";
import { Button } from "../Button";
import monkeytree from "../Images/Characters/monkeytree.png";
import tree from "../Images/Characters/tree.png";

class Login extends Component {

  render() {
    return (
      <Container>
        <Background>
          <Form>
            <Span>Username</Span>
            <Input id="username" type="text" placeholder="Username or Email" />
            <Span>Password</Span>
            <Input id="password" type="password" placeholder="Password" />
            <FormButtonGroup>
              <Button
                buttonStyle="btn--primary"
                buttonColor="green"
                buttonSize="btn--small"
                onClick={this.props.handleLogin}
              >
                Sign In
              </Button>
              <Button
                buttonStyle="btn--primary"
                buttonColor="green"
                buttonSize="btn--small"
              >
                Play As Guest
              </Button>
              <FormFooter>
                {/* Don't have an account? <Link to="/" style={styles.signup}> Sign Up</Link> */}
                Don't have an account? <Link onClick={this.props.handleLogin} >Sign up</Link>
              </FormFooter>
            </FormButtonGroup>
          </Form>
          <Character
            className="monkeytree"
            src={monkeytree}
            alt="Monkey & Tree"
            style={styles.monkeyTree}
            //   onerror={`this.src=${altGrass}`}
          />
          <Character
            className="tree"
            src={tree}
            alt="Bottom Tree"
            style={styles.Tree}
            //   onerror={`this.src=${altGrass}`}
          />
        </Background>
      </Container>
    );
  }
}

export default withRouter(Login);

const slideInAnimation = keyframes`${fadeIn}`;

const Container = styled.div`
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
  
  
  backdrop-filter: blur(15px) brightness(45%) saturate(150%) opacity(100%);
  animation: 0.8s ${slideInAnimation};
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
  box-shadow: 10px 15px 10px rgba(0,0,0,0.4);
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
  z-index: 10;
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 2px;
  margin-left: 10px;
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
  font-size: 18px;
`;

const Link = styled.a`
  text-decoration: none;
  color: white;
  margin: 2px 5px;

  &:hover {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
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
};
