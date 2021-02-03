import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import foxy from "../Images/characters/foxy.gif";

const NotSupported = () => {
  const classes = useStyles();
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
      >
        We don't support mobile devices currently. Please visit us again by
        using a tablet, a laptop, or a desktop computer.
      </Typography>
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
    fontWeight:500,
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
