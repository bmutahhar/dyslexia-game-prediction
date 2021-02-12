import React, { Component, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { shake } from "react-animations";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { slideInDown } from "react-animations";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Home } from "../Screens";
import { Character } from "../Components";
import { signin } from "../actions";

import monkeytree from "../Images/characters/monkeytree.png";
import tree from "../Images/characters/tree.png";

class Login extends Component {
  dismiss = () => {
    this.props.history.replace("/");
  };
  render() {
    return (
      <>
        <Home />
        <Blur onClick={this.dismiss} />
        <AnimatedDiv>
          <LoginComponent />
        </AnimatedDiv>
      </>
    );
  }
}

const LoginComponent = () => {
  const classes = useStyles();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const dispatch = useDispatch();

  function postData(data) {
    fetch("/api/v1/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((respJson) => {
        if (respJson.error.trim().length === 0) {
          setStatus({ loading: false, success: true, error: "" });
          dispatch(signin(respJson.token));
          setTimeout(() => history.push("/userform"), 1000);
        } else {
          setStatus({ loading: false, success: false, error: respJson.error });
        }
      })
      .catch((error) => {
        alert(error);
        setStatus({ loading: false, success: false, error: error });
      });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    let message = "";
    if (username.trim().length === 0 && password.trim().length === 0) {
      message = "Please enter your username and password";
      setStatus({ success: false, loading: false, error: message });
    } else if (username.trim().length !== 0 && password.trim().length === 0) {
      message = "Please enter your password before proceeding";
      setStatus({ success: false, loading: false, error: message });
    } else if (username.trim().length === 0 && password.trim().length !== 0) {
      message = "Please enter your username before proceeding";
      setStatus({ success: false, loading: false, error: message });
    } else {
      setStatus({ loading: true, success: false, error: "" });
      postData(
        JSON.stringify({
          username: username,
          password: password,
        })
      );
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    switch (name.trim()) {
      case "username":
        setUsername(value.trim());
        break;
      case "password":
        setPassword(value.trim());
        break;

      default:
        break;
    }
  };

  const onClick = () =>
    setStatus({ loading: false, success: false, error: "" });

  return (
    <Background>
      <Form method="post" onSubmit={onSubmit} autoComplete="off">
        <InputTextField
          className={classes.margin}
          label="Username or email"
          variant="outlined"
          id="username"
          fullWidth
          name="username"
          value={username}
          onChange={onChange}
          onFocus={onClick}
        />
        <InputTextField
          className={classes.margin}
          label="Password"
          variant="outlined"
          id="password"
          type={visibility ? "text" : "password"}
          fullWidth
          name="password"
          value={password}
          onChange={onChange}
          onClick={onClick}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setVisibility(!visibility)}
                  style={{
                    "MuiButtonBase-root MuiIconButton-root": {
                      outline: "none",
                    },
                  }}
                >
                  {visibility ? (
                    <MdVisibility color="white" size={20} />
                  ) : (
                    <MdVisibilityOff color="white" size={20} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {status.error.trim().length > 0 && <Error>{status.error}</Error>}
        <FormButtonGroup>
          <UserButton type="submit" variant="contained" fullWidth>
            {status.loading ? (
              <CircularProgress style={{ color: "white" }} size={30} />
            ) : status.success ? (
              <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                <IoIosCheckmarkCircleOutline color="white" size={28} />
              </Zoom>
            ) : (
              "Sign In"
            )}
          </UserButton>
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
  top: 8%;
  left: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62%;
  border-radius: 50px;

  height: 82vh;
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
  min-width: 97%;
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
        borderColor: "#5BA945",
        borderRadius: "5px",
        color: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5BA945",
        color: "#fff",
      },
      "& .MuiOutlinedInput-input": {
        color: "#fff",
        borderColor: "#5BA945",
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
  z-index: 2;
  backdrop-filter: blur(10px) brightness(45%) saturate(150%) opacity(100%);
`;

const Error = styled.span`
  color: #8f0909;
  font-size: 12px;
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
    height: "60%",
    position: "absolute",
    top: "3%",
    left: "1.50%",
    zIndex: 1,
  },
  Tree: {
    height: "40%",
    position: "absolute",
    bottom: "1%",
    right: "1%",
    zIndex: 1,
  },
  icon: {
    position: "absolute",
    top: "4%",
    right: "4%",
  },
};

export default withRouter(Login);
