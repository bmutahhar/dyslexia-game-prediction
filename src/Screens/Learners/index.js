import React, { useState, useEffect } from "react";
import { GameScreen } from "../../Components";

import { CompletePuzzle, WordConfirm } from "../../Components/Learners";

const Learners = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  useEffect(() => {});

  if (activeStep === 0) {
    return (
      <GameScreen activeStep={activeStep}>
        <WordConfirm activeStep={activeStep} nextStep={nextStep} />
      </GameScreen>
    );
  } else if (activeStep === 1) {
    return (
      <GameScreen activeStep={activeStep}>
        <CompletePuzzle activeStep={activeStep} nextStep={nextStep} />
      </GameScreen>
    );
  } else {
    return (
      <GameScreen activeStep={activeStep}>
        <WordConfirm activeStep={activeStep} nextStep={nextStep} />
      </GameScreen>
    );
  }
};

export default Learners;
