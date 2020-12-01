import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { shake } from "react-animations";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { slideInDown } from "react-animations";
import Character from "../Character";
import Home from "./Home";
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
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Background>
      <Form>
        <InputTextField
          className={classes.margin}
          label="Username or email"
          variant="outlined"
          id="username"
          fullWidth
          autoComplete="off"
        />
        <InputTextField
          className={classes.margin}
          label="Password"
          variant="outlined"
          id="password"
          fullWidth
          autoComplete="off"
        />
        <Error>{errorMessage}</Error>
        <FormButtonGroup>
          <Link to="/">
            <UserButton variant="contained" fullWidth>
              Sign In
            </UserButton>
          </Link>
          <Link to="/userform">
            <UserButton variant="contained" fullWidth>
              Play As Guest
            </UserButton>
          </Link>
          <FormFooter>
            Don't have an account?
            <Link to="/signup">Sign up</Link>
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

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const slideInAnimation = keyframes`${slideInDown}`;
const shakeAnimation = keyframes`${shake}`;

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
  animation: 0.6s ${slideInAnimation};
`;
const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 5px;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 40%;
  font-size: 18px;
  z-index: 2;
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
  z-index: 1;
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
const InputTextField = withStyles({
  root: {
    backgroundColor: "rgba(145, 255, 215, 0.6)",
    borderRadius: "5px",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#5BA945",
    },
    "& label": {
      color: "#fff",
      fontSize: "1.3vw",
    },
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
        borderRadius: "5px",
        color: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5BA945",
        color: "#fff",
      },
      "& .MuiOutlinedInput-input": {
        color: "#fff",
      },
    },
  },
})(TextField);

const UserButton = withStyles({
  root: {
    color: "#fff",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    fontWeight: 400,
    padding: "6px 12px",
    margin: "5px 0px",
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
      color: "#fff",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
      backgroundColor: "#027719",
      borderColor: "#027719",
    },
    "&:disabled": {
      backgroundColor: "#89e093",
      color: "white",
      border: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
})(Button);

const FormButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 5px 0px;
  margin: 5px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  a {
    width: 100%;

    &:hover {
      text-decoration: none;
    }
  }
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  font-size: 1.4vw;
  width: 100%;
  a {
    width: 25%;
    color: white;
    margin: 2px;
    padding: 2px;
    &:hover {
      color: #30b7f0;
    }
  }
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  backdrop-filter: blur(10px) brightness(45%) saturate(150%) opacity(100%);
`;

const Error = styled.span`
  color: #8f0909;
  font-size: 14px;
  padding-left: 10px;
  margin-top: -5px;
  width: 100%;
  text-align: left;
  text-align: center;
  animation: 1s ${shakeAnimation};
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
