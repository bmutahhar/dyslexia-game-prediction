import React, { useState } from "react";
import { GameScreen } from "../../Components";
import {
  ObjectRotation,
  NameImage,
  DragDrop,
  DisplayTile,
} from "../../Components/Preschooler";
import { CompletePuzzle } from "../../Components/Learners";

const PreSchoolers = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  return (
    <GameScreen activeStep={activeStep}>
      <DragDrop activeStep={activeStep} nextStep={nextStep} />
      {/* <NameImage /> */}
    </GameScreen>
  );
};

export default PreSchoolers;
