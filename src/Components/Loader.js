import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Loader = ({ open, onClick }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open} onClick={onClick}>
      <CircularProgress className={classes.circularProgress} />
    </Backdrop>
  );
};

export default Loader;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1000,
    color: "#fff",
  },
  circularProgress: {
    color: "#fff",
    fontSize: 48,
  },
}));
