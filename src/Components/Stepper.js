import React from "react";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const CustomStepper = ({ activeStep }) => {
  const steps = useSelector((state) => state.questions.steps);
  const classes = useStyles();
  return (
    <>
      <Stepper
        className={classes.root}
        activeStep={activeStep}
        connector={<CustomConnector />}
      >
        {steps.map((label, index) => {
          return (
            <Step key={label} classes={{ root: classes.steps }}>
              <StepLabel
                classes={{
                  //   label: classes.steps,
                  //   labelContainer: classes.steps,
                  iconContainer: classes.steps,
                }}
                StepIconProps={{
                  classes: {
                    active: classes.active,
                    completed: classes.completed,
                    text: classes.text,
                  },
                }}
              />
            </Step>
          );
        })}
      </Stepper>
    </>
  );
};

export default CustomStepper;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 0,
    backgroundColor: "transparent",
  },
  steps: {
    margin: 0,
    padding: 0,
  },
  active: {
    color: "#28a745 !important",
    "& $text": {
      fill: "#fff",
    },
  },
  completed: {
    color: "#28a745 !important",
  },
  text: {
    fill: "none",
  },
}));

const CustomConnector = withStyles({
  active: {
    "& $line": {
      borderColor: "green",
      borderWidth: 2,
    },
  },
  completed: {
    "& $line": {
      borderWidth: 2,
      borderColor: "green",
    },
  },
  line: {
    borderWidth: 0,
  },
})(StepConnector);
