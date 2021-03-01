import React, { useState, useEffect } from "react";
import { GameScreen } from "../../Components";
import {
  ObjectRotation,
  NameImage,
  DragDrop,
  DisplayTile,
  TileLayout
} from "../../Components/Preschooler";


const PreSchoolers = () => {
  const angles = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
  const [activeStep, setActiveStep] = useState(0);
  const [angle, setAngle] = useState(
    angles[Math.floor(Math.random() * angles.length)]
  );

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

  useEffect(() => { });

  if (activeStep === 0) {
    return (
      <GameScreen activeStep={activeStep}>
        <TileLayout />
      </GameScreen>
    );
  }

  else if (activeStep === 1) {
    return (
      <GameScreen activeStep={activeStep}>
        <ObjectRotation
          angle={angle}
          activeStep={activeStep}
          nextStep={nextStep}
        />
      </GameScreen>
    );
  } else if (activeStep === 2) {
    return (
      <GameScreen activeStep={activeStep}>
        <DisplayTile
          name="displayTile"
          question="x"
          options={shuffleArray(["b", "c", "g", "x"])}
          activeStep={activeStep}
          nextStep={nextStep}
        />
      </GameScreen>
    );
  } else if (activeStep === 3) {
    return (
      <GameScreen activeStep={activeStep}>
        <NameImage
          activeStep={activeStep}
          nextStep={nextStep}
          word="TIGER"
          options={shuffleArray("TIGER".split(""))}
        />
      </GameScreen>
    );
  } else if (activeStep === 4) {
    return (
      <GameScreen activeStep={activeStep}>
        <DragDrop
          activeStep={activeStep}
          nextStep={nextStep}
          word="FOUR"
          options={shuffleArray("FOUR".split(""))}
        />
      </GameScreen>
    );
  } else {
    return (
      <GameScreen activeStep={activeStep}>
        <DisplayTile
          name="displayTile"
          question="x"
          options={shuffleArray(["b", "c", "g", "x"])}
          activeStep={activeStep}
          nextStep={nextStep}
        />
      </GameScreen>
    );
  }
};

export default PreSchoolers;
