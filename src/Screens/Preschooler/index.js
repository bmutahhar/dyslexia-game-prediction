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
  if (activeStep === 0) {
    return (
      <GameScreen activeStep={activeStep}>
        <ObjectRotation activeStep={activeStep} nextStep={nextStep} />
      </GameScreen>
    );
  } else if (activeStep === 1) {
    return (
      <GameScreen activeStep={activeStep}>
        <DisplayTile activeStep={activeStep} nextStep={nextStep} />
      </GameScreen>
    );
  } else if (activeStep === 2) {
    return (
      <GameScreen activeStep={activeStep}>
        <NameImage activeStep={activeStep} nextStep={nextStep} word="TIGER" />
      </GameScreen>
    );
  } else if (activeStep === 3) {
    return (
      <GameScreen activeStep={activeStep}>
        <DragDrop activeStep={activeStep} nextStep={nextStep} word="FOUR" />
      </GameScreen>
    );
  } else {
    return (
      <GameScreen activeStep={activeStep}>
        <DisplayTile activeStep={activeStep} nextStep={nextStep} />
      </GameScreen>
    );
  }
};

export default PreSchoolers;
