import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { fadeIn, slideInDown } from "react-animations";
import { Link, withRouter } from "react-router-dom";
import Background from "../Background";
import Character from "../Character";
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
    gender: "",
    errors: {
      username: "",
      password: "",
      retypePassword: "",
      email: "",
      parentName: "",
      childName: "",
      childAge: "",
      gender: "",
    },
    disabled: true,
  };

  checkAge(val) {
    const numRegex = /^[0-9]*$/;
    let check = false;
    if (numRegex.test(val)) {
      let num = parseInt(val);
      if (num >= 1 && num <= 10) {
        check = true;
      }
    }
    return check;
  }

  enableButton = () => {
    const {
      username,
      password,
      retypePassword,
      email,
      parentName,
      childName,
      childAge,
      gender,
      errors,
    } = this.state;

    const disable =
      username.trim().length !== 0 &&
      password.trim().length !== 0 &&
      retypePassword.trim().length !== 0 &&
      email.trim().length !== 0 &&
      parentName.trim().length !== 0 &&
      childName.trim().length !== 0 &&
      childAge.trim().length !== 0 &&
      gender.trim().length !== 0 &&
      errors.username.trim().length === 0 &&
      errors.password.trim().length === 0 &&
      errors.retypePassword.trim().length === 0 &&
      errors.email.trim().length === 0 &&
      errors.parentName.trim().length === 0 &&
      errors.childName.trim().length === 0 &&
      errors.childAge.trim().length === 0 &&
      errors.gender.trim().length === 0
        ? false
        : true;
    this.setState({ disabled: disable });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.history.push("/userform");
  };
  onChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    value = value.trim();
    let errors = this.state.errors;
    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "Username must be at least 5 characters long" : "";
        break;
      case "password":
        errors.password = validPasswordRegex.test(value)
          ? ""
          : "Password must be minimum eight characters, at least one letter, one number and one special character";
        break;
      case "retypePassword":
        errors.retypePassword =
          this.state.password.trim() === value.trim()
            ? ""
            : "Password do not match correctly";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Email address must be a valid email";
        break;
      case "parentName":
        errors.parentName =
          value.length < 5
            ? "Parent name must be at least 5 characters long"
            : "";
        break;
      case "childName":
        errors.childName =
          value.length < 5
            ? "Child name must be at least 5 characters long"
            : "";
        break;
      case "childAge":
        errors.childAge = this.checkAge(value)
          ? ""
          : "Age must a number between 1 and 10";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value }, this.enableButton);
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
            {this.state.errors.username.length > 0 && (
              <Error>{this.state.errors.username}</Error>
            )}
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
            {this.state.errors.password.length > 0 && (
              <Error>{this.state.errors.password}</Error>
            )}
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
            {this.state.errors.retypePassword.length > 0 && (
              <Error>{this.state.errors.retypePassword}</Error>
            )}
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
            {this.state.errors.email.length > 0 && (
              <Error>{this.state.errors.email}</Error>
            )}
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
            {this.state.errors.parentName.length > 0 && (
              <Error>{this.state.errors.parentName}</Error>
            )}
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
            {this.state.errors.childName.length > 0 && (
              <Error>{this.state.errors.childName}</Error>
            )}
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
            {this.state.errors.childAge.length > 0 && (
              <Error>{this.state.errors.childAge}</Error>
            )}
            <InputGroup>
              <RadioButtons
                onBoy={this.changeBoySrc}
                onGirl={this.changeGirlSrc}
                onChange={this.onChange}
              />
            </InputGroup>
            {this.state.errors.gender.length > 0 && (
              <Error>{this.state.errors.gender}</Error>
            )}
            <Container>
              <SignupButton
                variant="contained"
                type="submit"
                disabled={this.state.disabled}
              >
                Sign Up
              </SignupButton>
            </Container>
          </Form>
          <OtherSignupComponent>
            <SignInLinkComponent>
              Already have an account?
              <Link to="/login">Log In</Link>
            </SignInLinkComponent>
            <strong>OR</strong>
            <p>You can sign up with google</p>
            <GoogleButton>
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
            </GoogleButton>
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
      <Label className="label" htmlFor="gender">
        Child's Gender:
      </Label>
      <Label className="male">
        <input type="radio" name="gender" id="male" value="male" />
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

const slideInAnimation = keyframes`${slideInDown}`;

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
  animation: 1s ${slideInAnimation};
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
  font-size: 1.2vw;
  line-height: 35px;
  letter-spacing: 1px;
  border: none;
  border-radius: 5px;
  padding: 5px 10px 2px 10px;
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
  margin: 5px 5px;
  width: 60%;
  height: 45px;
  input:focus ~ .floating-label,
  input:not(:placeholder-shown) ~ .floating-label {
    position: relative;
    bottom: 55px;
    right: 1px;
    font-size: 10px;
    opacity: 1;
    letter-spacing: 1.5;
  }
  .floating-label {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    font-size: 1.5vw;
    padding: 2px 10px;
    background-color: transparent;
    text-align: left;
    color: #eee;
    position: relative;
    bottom: 45px;
    pointer-events: none;
    transition: all 0.3s ease-out;
    z-index: 2;
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
margin-left:5px;
margin-right:5px;
animation: 1s ${slideInAnimation};

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
  font-size: 1.3vw;
  width: 25%;
  height: 30%;
  margin-left: 35px;
  margin-right: 5px;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
  animation: 1s ${slideInAnimation};
`;

const SignInLinkComponent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  font-size: 1.3vw;
  width: 100%;
  a {
    width: 21%;
    text-align:center;
    color: white;
    &:hover {
      color: #30b7f0;
      text-decoration: none;
    }
  }
`;

const GoogleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4286f5;
  width: 70%;
  padding: 5px 10px;
  position: relative;
  font-size: 1.3vw;
  margin-top: -10px;
  border-radius: 5px;
  pointer: cursor;
  &:hover {
    pointer: cursor;
  }
  &:hover {
    background-color: #2e68c7;
  }
  &: focus {
    outline: none;
  }
  &: active {
    background-color: #2e68c7;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.8);

    transform: translateY(2px);
    outline: none;
  }
  a {
    color: #fff;
    &:hover {
      text-decoration: none;
      color: white;
    }
  }
  img {
    background-color: inherit;
  }
`;

const RadioButtonGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  font-size: 1.5vw;
  height: 45px;
  letter-spacing: 1px;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  background-color: transparent;

  .label {
    position: relative;
    top: 4px;
  }

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
    top: -3px;
  }
`;

const Error = styled.span`
  color: #e31414;
  font-size: 10px;
  padding-left: 10px;
  margin-top: -5px;
  width: 60%;
  text-align: left;
`;

const SignupButton = withStyles({
  root: {
    color: "#fff",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    fontWeight: 400,
    width: "60%",
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#25ce4a",
    borderColor: "#25ce4a",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#027719",
      borderColor: "#027719",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
      backgroundColor: "#027719",
      borderColor: "#027719",
    },
    "&:disabled": {
      backgroundColor: "#90ab95",
      color: "white",
      border: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
})(Button);

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

const validEmailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export default withRouter(Signup);
