import React, { useState } from "react";
import { GameScreen } from "../../Components";
import {
  ObjectRotation,
  DisplayTile,
  TileLayout,
  SelectOption,
} from "../../Components/Preschooler";
import { DragDrop, NameImage } from "../../Components/Learners";

const PreSchoolers = () => {
  const angles = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
  const [activeStep, setActiveStep] = useState(0);
  const angle = angles[Math.floor(Math.random() * angles.length)];

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

  if (activeStep === 0) {
    return (
      <GameScreen activeStep={activeStep}>
        <SelectOption activeStep={activeStep} nextStep={nextStep} options={["A", "B", "C", "D"]} />
      </GameScreen>
    );
  } else if (activeStep === 1) {
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
  } else if (activeStep === 5) {
    return (
      <GameScreen activeStep={activeStep}>
        <TileLayout
          question={["A", "B", "C", "D", "A", "B", "C", "D", "H"]}
          activeStep={activeStep}
          nextStep={nextStep}
          gridSize={3}
          options={["A", "B", "C", "D", "H", "A", "B", "C", "D"]}
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
