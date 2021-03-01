import React, { useState, useEffect } from "react";
import { GameScreen } from "../../Components";

import { CompletePuzzle, WordConfirm } from "../../Components/Learners";

const Learners = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const shuffleArray = (array) => {
    let newArray = array.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
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
