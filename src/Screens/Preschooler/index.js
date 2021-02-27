import React, { useState } from "react";
import { GameScreen } from "../../Components";
import {
  ObjectRotation,
  NameImage,
  DragDrop,
  DisplayTile,
} from "../../Components/Preschooler";

import { CompletePuzzle, WordConfirm } from "../../Components/Learners";

const PreSchoolers = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  return (
    <GameScreen activeStep={activeStep}>
      <WordConfirm activeStep={activeStep} nextStep={nextStep} word="TIGER" />
      {/* <NameImage /> */}
    </GameScreen>
  );
};

export default PreSchoolers;
