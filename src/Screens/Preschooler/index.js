import React from "react";
import { GameScreen } from "../../Components";
import {
  ObjectRotation,
  NameImage,
  DragDrop,
  DisplayTile,
} from "../../Components/PreSchooler";
import { CompletePuzzle } from "../../Components/Learners";

const PreSchoolers = () => {
  return (
    <GameScreen>
      <DragDrop />
      {/* <DisplayTile /> */}
    </GameScreen>
  );
};

export default PreSchoolers;
