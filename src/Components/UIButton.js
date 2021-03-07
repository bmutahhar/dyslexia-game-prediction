import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const UIButton = ({ onClick, children, ...props }) => {
  return (
    <>
      <CustomButton onClick={onClick} {...props}>
        {children}
      </CustomButton>
    </>
  );
};

export default UIButton;

const CustomButton = withStyles({
  root: {
    color: "#fff",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 18,
    fontWeight: 400,
    // width: "80%",
    marginTop: "10px",
    padding: "6px 10px",
    border: "1px solid",
    // lineHeight: 1.5,
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
      backgroundColor: "#90ab95",
      color: "white",
      border: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
})(Button);
