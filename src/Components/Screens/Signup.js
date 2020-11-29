import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { Link, withRouter } from "react-router-dom";
import Background from "../Background";
import Character from "../Character";
import { Button } from "../Button";
import { MdChildCare } from "react-icons/md";
import { BiUser, BiLockOpenAlt, BiLockAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { RiParentLine } from "react-icons/ri";
import signupbg from "../Images/signupbg.png";
import lion from "../Images/Characters/lion.png";
import eagle from "../Images/Characters/eagle.png";
import pacifier from "../Images/Characters/pacifier.svg";
import girl from "../Images/Characters/girl.svg";
import boy from "../Images/Characters/boy.svg";
import girlpink from "../Images/Characters/girlpink.svg";
import boyblue from "../Images/Characters/boyblue.svg";
import google from "../Images/Characters/google.png";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    retypePassword: "",
    email: "",
    parentName: "",
    childName: "",
    childAge: "",
    childGender: "",
  };
  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // this.props.history.push("/userform");
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeBoySrc() {
    var boyEl = document.getElementById("boy");
    var girlEl = document.getElementById("girl");
    boyEl.setAttribute("src", boyblue);
    girlEl.setAttribute("src", girl);
  }
  changeGirlSrc() {
    var boyEl = document.getElementById("boy");
    var girlEl = document.getElementById("girl");
    boyEl.setAttribute("src", boy);
    girlEl.setAttribute("src", girlpink);
  }

  render() {
    return (
      <Animation>
        <Background
          className="d-flex align-items-center justify-content-between flex-row"
          customStyle={false}
          src={signupbg}
        >
          <Header>
            <h1>DyxsisML</h1>
            <p>Sign up to track your child's performance</p>
          </Header>
          <Form onSubmit={this.onSubmit} method="post" autoComplete="off">
            <InputGroup>
              <Input
                type="text"
                className="inputText"
                placeholder="Username"
                name="username"
                required
                value={this.state.username}
                onChange={this.onChange}
              />
              <Label className="floating-label">
                <Icon>
                  <BiUser />
                </Icon>
                Username
              </Label>
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                className="inputText"
                placeholder="Password"
                name="password"
                required
                value={this.state.password}
                onChange={this.onChange}
              />
              <Label className="floating-label">
                <Icon>
                  <BiLockOpenAlt />
                </Icon>
                Password
              </Label>
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                className="inputText"
                placeholder="Password"
                name="retypePassword"
                required
                value={this.state.retypePassword}
                onChange={this.onChange}
              />
              <Label className="floating-label">
                <Icon>
                  <BiLockAlt />
                </Icon>
                Re-type Password
              </Label>
            </InputGroup>
            <InputGroup>
              <Input
                type="email"
                className="inputText"
                placeholder="Email"
                name="email"
                required
                value={this.state.email}
                onChange={this.onChange}
              />
              <Label className="floating-label">
                <Icon>
                  <HiOutlineMail />
                </Icon>
                Email
              </Label>
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                className="inputText"
                placeholder="Parent Name"
                name="parentName"
                required
                value={this.state.parentName}
                onChange={this.onChange}
              />
              <Label className="floating-label">
                <Icon>
                  <RiParentLine />
                </Icon>
                Parent's Full Name
              </Label>
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                className="inputText"
                placeholder="Child Name"
                name="childName"
                required
                value={this.state.childName}
                onChange={this.onChange}
              />
              <Label className="floating-label">
                <Icon>
                  <MdChildCare />
                </Icon>
                Child's Full Name
              </Label>
            </InputGroup>
            <InputGroup>
              <Input
                type="number"
                min="1"
                max="10"
                className="inputText"
                placeholder="Child's Age"
                name="childAge"
                value={this.state.childAge}
                onChange={this.onChange}
                required
              />
              <Label className="floating-label">
                <Icon>
                  <img
                    id="pacifier"
                    src={pacifier}
                    alt="Pacifier"
                    width="15px"
                    height="15px"
                  />
                </Icon>
                Child's Age
              </Label>
            </InputGroup>
            <InputGroup>
              <RadioButtons
                onBoy={this.changeBoySrc}
                onGirl={this.changeGirlSrc}
                onChange={this.onChange}
              />
            </InputGroup>
            <Container>
              <Button buttonSize="btn--wide" buttonColor="green" type="submit">
                Sign Up
              </Button>
            </Container>
          </Form>
          <OtherSignupComponent>
            <strong>OR</strong>
            <p>You can sign up with google</p>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <img src={google} alt="Google logo" width={30} height={30} />
                <span>Sign up with Google</span>
              </div>
            </a>
          </OtherSignupComponent>
          <Character
            className="eagle wow"
            src={eagle}
            alt="Eagle"
            style={styles.eagle}
          />
          <Character
            className="lion"
            src={lion}
            alt="Lion"
            style={styles.lion}
          />
        </Background>
      </Animation>
    );
  }
}

const RadioButtons = (props) => {
  return (
    <RadioButtonGroup onChange={props.onChange}>
      <Label className="" htmlFor="gender">
        Child's Gender:
      </Label>
      <Label className="male">
        <input type="radio" name="gender" id="male" value="male" required />
        <img
          id="boy"
          src={boy}
          alt="boy"
          width={40}
          height={40}
          onClick={props.onBoy}
        />
      </Label>
      <Label className="female">
        <input type="radio" name="gender" id="female" value="female" />
        <img
          id="girl"
          src={girl}
          alt="girl"
          width={40}
          height={40}
          onClick={props.onGirl}
        />
      </Label>
    </RadioButtonGroup>
  );
};

const Container = styled.div`
  margin: 5px;
  background-color: transparent;
  width: 60%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 95%;
  margin: 10px 20px;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
`;
const Label = styled.label.attrs((props) => ({
  htmlFor: props.htmlFor,
}))``;

const Input = styled.input.attrs((props) => ({
  id: props.id,
  type: props.type,
  placeholder: props.placeholder,
  value: props.value,
  name: props.name,
  onChange: props.onChange,
}))`
  width: 100%;
  font-size: 14px;
  line-height: 35px;
  letter-spacing: 1px;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  background-color: rgba(145, 255, 215, 0.6);
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
  &::placeholder {
    color: transparent;
    opacity: 1;
  }
`;

const InputGroup = styled.div`
  background-color: transparent;
  margin: 15px 5px;
  width: 60%;
  height: 30px;
  input:focus ~ .floating-label,
  input:not(:placeholder-shown) ~ .floating-label {
    position: relative;
    bottom: 50px;
    ${"" /* left: -105px; */}
    ${"" /* right: 0; */}
    font-size: 10px;
    opacity: 1;
    letter-spacing: 1.5;
  }
  .floating-label {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    height: 100%;
    ${"" /* width: 50%; */}
    padding: 2px 10px;
    background-color: transparent;
    text-align: left;
    color: #eee;
    position: relative;
    bottom: 38px;
    ${"" /* right: 100px; */}
    pointer-events: none;
    transition: all 0.5s ease-out;
  }
  input:focus {
    outline: none;
  }
  input:focus ~ .floating-label #pacifier,
  input:not(:placeholder-shown) ~ .floating-label #pacifier {
    width: 10px;
    height: 10px;
  }

  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
const Icon = styled.i`
  margin-top: -3px;
  margin-right: 4px;
  }
`;

const Header = styled.div`
display: flex;
flex-flow: column wrap;
color: white;
${"" /* background-color:rgba(0, 0, 0, 0.5); */}
margin-left:5px;
margin-right:5px;

h1{
  font-size:48px;
  font-family:"Roboto"
  letter-spacing:5px;
}
p{
  font-size:20px;
  font-family:"Roboto"
  letter-spacing:5px;
}
`;
const OtherSignupComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 20%;
  margin-left: 35px;
  margin-right: 5px;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4286f5;
    padding: 5px 10px;
    position: relative;
    margin-top: -10px;

    pointer: cursor;
    &:hover {
      pointer: cursor;
    }
  }
  a {
    color: #fff;
    &:hover {
      text-decoration: none;
      color: white;
    }
  }
  img {
    background-color: #4286f5;
  }
`;

const RadioButtonGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  font-size: 15px;
  height: 45px;
  letter-spacing: 1px;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  background-color: transparent;
  ${"" /* background-color: rgba(145, 255, 215, 0.6); */}

  /* HIDE RADIO */
  [type="radio"] {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* IMAGE STYLES */
  [type="radio"] + img {
    cursor: pointer;
    position: relative;
    left: -35px;
    top: -5px;
  }
`;

const styles = {
  eagle: {
    height: "30%",
    position: "absolute",
    bottom: "0",
    right: "5%",
    zIndex: 2,
  },
  lion: {
    height: "30%",
    position: "absolute",
    bottom: 5,
    left: "5%",
    zIndex: 1,
    transform: "rotateY(180deg)",
  },
};

const signupAnimation = keyframes`${fadeIn}`;
const Animation = styled.div`
  animation: 1s ${signupAnimation};
`;

export default withRouter(Signup);
