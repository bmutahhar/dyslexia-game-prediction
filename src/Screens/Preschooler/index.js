import React, { useState } from "react";
import { GameScreen } from "../../Components";
import {
  ObjectRotation,
  DisplayTile,
  TileLayout,
  SelectOption,
} from "../../Components/Preschooler";
import { DragDrop, NameImage } from "../../Components/Learners";

import b1 from "../../Images/badges/b10.svg";
import b2 from "../../Images/badges/b2.svg";
import b3 from "../../Images/badges/b3.svg";
import b4 from "../../Images/badges/b4.svg";
import b5 from "../../Images/badges/b5.svg";
import b6 from "../../Images/badges/b6.svg";
import b7 from "../../Images/badges/b7.svg";
import b8 from "../../Images/badges/b8.svg";

const badges = [
  { image: b1, name: "Teddy" },
  { image: b2, name: "Kitty" },
  { image: b3, name: "Foxy" },
  { image: b4, name: "Monkey" },
  { image: b5, name: "Donkey" },
  { image: b6, name: "Doggy" },
  { image: b7, name: "Monkey" },
  { image: b8, name: "Monkey" },
];

const PreSchoolers = () => {
  const angles = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
  const [activeStep, setActiveStep] = useState(0);
  const [badgeOpen, setBadgeOpen] = useState(false);
  const angle = angles[Math.floor(Math.random() * angles.length)];

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const openBadge = () => {
    console.log(badgeOpen);
    setBadgeOpen(true);
    setTimeout(() => {
      console.log(badgeOpen);
      setBadgeOpen(false);
    }, 5000);
    console.log(badgeOpen);
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
      <GameScreen activeStep={activeStep} badges={badges}>
        <SelectOption
          activeStep={activeStep}
          nextStep={nextStep}
          options={["A", "B", "C", "D"]}
          showBadge={badgeOpen}
          badge={badges[0].image}
          badgeName={badges[0].name}
          openBadge={openBadge}
        />
      </GameScreen>
    );
  } else if (activeStep === 1) {
    return (
      <GameScreen activeStep={activeStep} badges={badges}>
        <ObjectRotation
          angle={angle}
          activeStep={activeStep}
          nextStep={nextStep}
          showBadge={badgeOpen}
          badge={badges[1].image}
          badgeName={badges[1].name}
          openBadge={openBadge}
        />
      </GameScreen>
    );
  } else if (activeStep === 2) {
    return (
      <GameScreen activeStep={activeStep} badges={badges}>
        <NameImage
          activeStep={activeStep}
          nextStep={nextStep}
          word="TIGER"
          options={shuffleArray("TIGER".split(""))}
          showBadge={badgeOpen}
          badge={badges[Math.floor(activeStep/2)-1].image}
          badgeName={badges[Math.floor(activeStep/2)-1].name}
          openBadge={openBadge}
        />
      </GameScreen>
    );
  } else if (activeStep === 3) {
    return (
      <GameScreen activeStep={activeStep} badges={badges}>
        <DisplayTile
          name="displayTile"
          question="x"
          options={shuffleArray(["b", "c", "g", "x"])}
          activeStep={activeStep}
          nextStep={nextStep}
          showBadge={badgeOpen}
          badge={badges[Math.floor(activeStep/2)-1].image}
          badgeName={badges[Math.floor(activeStep/2)-1].name}
          openBadge={openBadge}
        />
      </GameScreen>
    );
  } else if (activeStep === 4) {
    return (
      <GameScreen activeStep={activeStep} badges={badges}>
        <DragDrop
          activeStep={activeStep}
          nextStep={nextStep}
          word="FOUR"
          options={shuffleArray("FOUR".split(""))}
          showBadge={badgeOpen}
          badge={badges[Math.floor(activeStep/2)-1].image}
          badgeName={badges[Math.floor(activeStep/2)-1].name}
          openBadge={openBadge}
        />
      </GameScreen>
    );
  } else if (activeStep === 5) {
    return (
      <GameScreen activeStep={activeStep} badges={badges}>
        <TileLayout
          question={["A", "B", "C", "D", "A", "B", "C", "D", "H"]}
          activeStep={activeStep}
          nextStep={nextStep}
          gridSize={3}
          options={["A", "B", "C", "D", "H", "A", "B", "C", "D"]}
          showBadge={badgeOpen}
          badge={badges[Math.floor(activeStep/2)-1].image}
          badgeName={badges[Math.floor(activeStep/2)-1].name}
          openBadge={openBadge}
        />
      </GameScreen>
    );
  } else {
    return (
      <GameScreen activeStep={activeStep} badges={badges}>
        <DisplayTile
          name="displayTile"
          question="x"
          options={shuffleArray(["b", "c", "g", "x"])}
          activeStep={activeStep}
          nextStep={nextStep}
          showBadge={badgeOpen}
          badge={badges[Math.floor(activeStep/2)-1].image}
          badgeName={badges[Math.floor(activeStep/2)-1].name}
          openBadge={openBadge}
        />
      </GameScreen>
    );
  }
};

export default PreSchoolers;
