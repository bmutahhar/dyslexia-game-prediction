import React, { Component } from "react";
import styled from "styled-components";
import Character from "../Character";
import { Button } from "../Button";
import { HashLink as Link } from "react-router-hash-link";
import monkeytree from "../Images/Characters/monkeytree.png";
import tree from "../Images/Characters/tree.png";

export default class Login extends Component {
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
                Don't have an account? <Link to="/" style={styles.signup}> Sign Up</Link>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100vh;
  background-color: grey;
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
  background-image: linear-gradient(#0b8835, #597e87);
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
  border: 3px solid #707070;
  width: 100%;
  text-align: left;
  padding-left: 15px;
  background-color: #C9E3D2;
  box-shadow: 0px 1px 6px 5px rgba(0, 0, 0, 0.2);
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

const styles = {
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundColor: "grey",
  },
  signup:{
    margin: "5px",
    color: "white"
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
