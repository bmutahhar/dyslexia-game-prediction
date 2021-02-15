import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavigateNext } from "@material-ui/icons";

const NextButton = ({ onClick, disabled }) => {
  const classes = useStyles();
  return (
    <div>
      <IconButton
        className={classes.iconButton}
        onClick={onClick}
        disabled={disabled}
      >
        <NavigateNext className={classes.icon} />
      </IconButton>
    </div>
  );
};

export default NextButton;

const useStyles = makeStyles(({ theme }) => ({
  iconButton: {
    backgroundColor: "#49AE18",
    padding: 5,
    "&:hover": {
      backgroundColor: "#327511",
    },
    "&:disabled": {
      backgroundColor: "#90ab95",
      color: "white",
      border: "none",
    },
  },
  icon: {
    fontSize: "3rem",
    color: "white",
  },
}));
