import React, { useState, useEffect } from "react";
import { GameScreen, Loader, QuestionError } from "../../Components";
import {
  DragDrop,
  WordConfirm,
  NameImage,
  CVCwords,
} from "../../Components/Learners";
import { SelectOption, TileLayout } from "../../Components/Preschooler";
import { InstructionScreen } from "../../Screens";
import { yay } from "../../Sounds";

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

const Learners = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [badgeOpen, setBadgeOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [loading, setLoading] = useState(true);
  const audio = new Audio(yay);

  const openBadge = () => {
    console.log("Inside badge open");
    setBadgeOpen(true);
    audio.play();
    console.log(audio.src);
    setTimeout(() => {
      audio.pause();
      setBadgeOpen(false);
    }, 5000);
  };

  const hideInstructions = () => {
    setShowInstructions(false);
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

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  if (showInstructions) {
    return <InstructionScreen onClick={hideInstructions} />;
  } else {
    if (loading) {
      return <QuestionError open={loading} onClick={() => setLoading(false)} />;
    } else {
      if (activeStep === 0) {
        return (
          <GameScreen activeStep={activeStep} badges={badges}>
            {/* <WordConfirm
              word="TIGER"
              activeStep={activeStep}
              nextStep={nextStep}
              showBadge={badgeOpen}
              badge={badges[0].image}
              badgeName={badges[0].name}
              openBadge={openBadge}
            /> */}
            <TileLayout
              word="B"
              question="Drag the matching shape into the given bucket"
              activeStep={activeStep}
              nextStep={nextStep}
              gridSize={3}
              options={["A", "B", "C", "D", "H", "A", "B", "C", "D"]}
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
            <DragDrop
              activeStep={activeStep}
              nextStep={nextStep}
              word="four"
              options={["a", "b", "c", "d"]}
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
              showBadge={badgeOpen}
              badge={badges[Math.floor(activeStep / 2) - 1].image}
              badgeName={badges[Math.floor(activeStep / 2) - 1].name}
              openBadge={openBadge}
              options={["A", "B", "C", "D"]}
            />
          </GameScreen>
        );
      } else {
        return (
          <GameScreen activeStep={activeStep} badges={badges}>
            <CVCwords></CVCwords>
          </GameScreen>
        );
      }
    }
  }
};

export default Learners;
