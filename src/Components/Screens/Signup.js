import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Background from "../Background";
import Character from "../Character";
import { Button } from "../Button";
import { MdChildCare } from "react-icons/md";
import { BiUser, BiLockOpenAlt, BiLockAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosPerson } from "react-icons/io";
import { RiParentLine } from "react-icons/ri";
import signupbg from "../Images/signupbg.png";
import lion from "../Images/Characters/lion.png";
import eagle from "../Images/Characters/eagle.png";
import pacifier from "../Images/Characters/pacifier.svg";

export default class Signup extends Component {
  render() {
    return (
      <Background
        className="d-flex align-items-center justify-content-between flex-row"
        customStyle={false}
        src={signupbg}
      >
        <Header>
          <h1>DyxsisML</h1>
          <p>Sign up to track your child's performance</p>
        </Header>
        <Form>
          <InputGroup>
            <Input
              type="text"
              className="inputText"
              placeholder="Username"
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
          <RadioButtonGroup className="flex align-self-start" />
          <Link to="/" className="signup-btn">
            <Button buttonSize="btn--wide" buttonColor="green">
              Sign Up
            </Button>
          </Link>
        </Form>
        <OtherSignupComponent>
          <h2>Mutahhar</h2>
        </OtherSignupComponent>
        <Character
          className="eagle wow"
          src={eagle}
          alt="Eagle"
          style={styles.eagle}
        />
        <Character className="lion" src={lion} alt="Lion" style={styles.lion} />
      </Background>
    );
  }
}

const RadioButtonGroup = () => {
  return (
    <div className="flex flex-row justify-content-center align-items-center">
      <Label className="mr-2" for="gender">
        Child's Gender:
      </Label>
      <Label class="radio-inline mr-2">
        <input type="radio" name="gender" id="male" checked />
        Male
      </Label>
      <Label class="radio-inline m-2">
        <input type="radio" name="gender" id="female" />
        Female
      </Label>
    </div>
  );
};

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 15px;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 90%;
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
  for: props.for,
}))``;

const Input = styled.input.attrs((props) => ({
  id: props.id,
  type: props.type,
  placeholder: props.placeholder,
  value: props.value,
  name: props.name,
}))`
  width: 100%;
  font-size: 14px;
  line-height: 30px;
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
    bottom: 47px;
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
    bottom: 35px;
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
    ${"" /* -webkit-appearance: none; */}
    background-color:transparent;
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
${'' /* background-color:rgba(0, 0, 0, 0.5); */}
margin-left:5px;
margin-right:15px;

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
