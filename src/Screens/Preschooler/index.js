import React from "react";
import { GameScreen } from "../../Components";
import {
  ObjectRotation,
  NameImage,
  DragDrop,
  DisplayTile,
} from "../../Components/Preschooler";
import { CompletePuzzle } from "../../Components/Learners";

const PreSchoolers = () => {
  return (
    <GameScreen>
      <DragDrop />
      {/* <NameImage /> */}
    </GameScreen>
  );
};

export default PreSchoolers;
