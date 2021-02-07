import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import foxy from "../Images/characters/foxy.gif";

const NotSupported = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container>
      {/* <Space /> */}
      <Foxy src={foxy} alt="Foxy Waiting GIF" />
      <Typography variant="h3" className={classes.title}>
        Sorry!
      </Typography>
      <Typography
        variant="paragraph"
        paragraph
        align="justify"
        className={classes.message}
        gutterBottom
      >
        We don't support mobile devices currently. Please visit us again by
        using a tablet, a laptop, or a desktop computer.
      </Typography>
      <Button
        variant="contained"
        size="large"
        className={classes.button}
        onClick={() => history.goBack()}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default NotSupported;

const useStyles = makeStyles((theme) => ({
  title: {
    color: "white",
    fontWeight: "bold",
  },
  message: {
    margin: theme.spacing(2),
    fontWeight: 500,
  },
  button: {
    backgroundColor: "#FE6100",
    color: "white",
  },
}));

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #00ccff;
`;

const Foxy = styled.img`
  height: 50%;
`;
