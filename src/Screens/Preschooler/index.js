import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GameScreen, Loader, QuestionError } from "../../Components";
import {
  ObjectRotation,
  SingleDrag,
  SingleMatch,
  TileLayout,
  SelectOption,
} from "../../Components/Preschooler";
import { InstructionScreen } from "../../Screens";
import {
  easyDifficulty,
  mediumDifficulty,
  hardDifficulty,
  resetConsecutiveScore,
} from "../../actions";
import { yay } from "../../Sounds";

import b1 from "../../Images/badges/Dear.svg";
import b2 from "../../Images/badges/Dog.svg";
import b3 from "../../Images/badges/Elephant.svg";
import b4 from "../../Images/badges/Foxy.svg";
import b5 from "../../Images/badges/Monkey.svg";
import b6 from "../../Images/badges/Panda.svg";
import b7 from "../../Images/badges/Teddy.svg";
import b8 from "../../Images/badges/Zebra.svg";

const PreSchoolers = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [badgeOpen, setBadgeOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const difficulty = useSelector((state) => state.difficulty);
  // const [difficulty, setDifficulty] = useState("medium")
  const consecutiveScore = useSelector((state) => state.consecutiveScore);
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    error: "",
  });
  const [questionSet, setQuestionSet] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [stop, setStop] = useState(false);
  const audio = new Audio(yay);
  const url = process.env["REACT_APP_API_URL"];
  const dispatch = useDispatch();

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const stopTime = () => {
    setStop(true);
  };

  const openBadge = () => {
    setBadgeOpen(true);
    audio.play();
    setTimeout(() => {
      audio.pause();
      setBadgeOpen(false);
    }, 5000);
  };
  const hideInstructions = () => {
    setShowInstructions(false);
  };

  const getBadgeIndex = () => {
    if (activeStep === 0) return 0;
    else if (activeStep === 1) return 1;
    else return Math.floor(activeStep / 2) - 1;
  };

  const getRandomQuestion = (difficulty) => {
    const random = Math.floor(
      Math.random() * (questionSet[difficulty].length - 1)
    );
    const prevQuestion = { ...currentQuestion };
    const questions = { ...questionSet };

    const question = questions[difficulty][random];
    if (!question.displayed && prevQuestion.type !== question.type) {
      questions[difficulty][random].displayed = true;
      setCurrentQuestion(question);
      setQuestionSet(questions);
    } else {
      let index = random + 1;
      for (let i = 0; i < questions[difficulty].length; i++) {
        if (
          !questions[difficulty][index % questions[difficulty].length]
            .displayed &&
          prevQuestion.type !==
            questions[difficulty][index % questions[difficulty].length].type
        ) {
          questions[difficulty][
            index % questions[difficulty].length
          ].displayed = true;
          setCurrentQuestion(
            questions[difficulty][index % questions[difficulty].length]
          );
          setQuestionSet(questions);
          break;
        }
        index++;
      }
    }
  };

  const fetchQuestions = () => {
    fetch(`${url}/api/v1/questions/preschooler`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((respJson) => {
        if (respJson.error === undefined) {
          const easy = shuffleArray(respJson.easy);
          const medium = shuffleArray(respJson.medium);
          const hard = shuffleArray(respJson.hard);
          setQuestionSet({
            easy,
            medium,
            hard,
          });
          setStatus({ success: true, error: "", loading: true });
        } else {
          setStatus({ success: false, error: respJson.error, loading: false });
        }
      })
      .catch((err) => {
        setStatus({ success: false, error: err, loading: false });
      });
  };

  const monitorDifficulty = () => {
    if (consecutiveScore === "111") {
      if (difficulty === "easy") {
        dispatch(mediumDifficulty());
        dispatch(resetConsecutiveScore());
        return "medium";
      } else if (difficulty === "medium") {
        dispatch(hardDifficulty());
        dispatch(resetConsecutiveScore());
        return "hard";
      } else {
        dispatch(resetConsecutiveScore());
        return "hard";
      }
    } else if (consecutiveScore === "000") {
      if (difficulty === "hard") {
        dispatch(mediumDifficulty());
        dispatch(resetConsecutiveScore());
        return "medium";
      } else if (difficulty === "medium") {
        dispatch(easyDifficulty());
        dispatch(resetConsecutiveScore());
        return "easy";
      } else {
        dispatch(resetConsecutiveScore());
        return "easy";
      }
    } else {
      return difficulty;
    }
  };

  useEffect(() => {
    if (!showInstructions) {
      try {
        fetchQuestions();
      } catch (e) {
        console.log(e);
        setStatus({ success: false, error: e, loading: false });
      }
    }
  }, [showInstructions]);

  useEffect(() => {
    if (status.success && !showInstructions) {
      const newDifficulty = monitorDifficulty();
      getRandomQuestion(newDifficulty);
      if (status.success && status.loading) {
        setStatus({ ...status, loading: false });
      }
    }
  }, [activeStep]);

  useEffect(() => {
    if (status.success && !showInstructions) {
      const random = Math.floor(
        Math.random() * (questionSet[difficulty].length - 1)
      );
      const questions = { ...questionSet };
      const question = questions[difficulty][random];
      questions[difficulty][random].displayed = true;
      setCurrentQuestion(question);
      setQuestionSet(questions);

      if (status.success && status.loading) {
        setStatus({ ...status, loading: false });
      }
    }
  }, [status.success, showInstructions]);

  if (showInstructions) {
    return <InstructionScreen onClick={hideInstructions} />;
  } else {
    if (status.loading) {
      return <Loader open={status.loading} />;
    } else {
      if (status.success) {
        const badgeIndex = getBadgeIndex();
        if (currentQuestion.type === "or") {
          // easy/medium/hard for object rotation
          return (
            <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
              <ObjectRotation
                question={currentQuestion.question}
                word={currentQuestion.word}
                angle={currentQuestion.answer}
                degree={currentQuestion.degree}
                activeStep={activeStep}
                nextStep={nextStep}
                showBadge={badgeOpen}
                badge={badges[badgeIndex].image}
                badgeName={badges[badgeIndex].name}
                openBadge={openBadge}
                stopTime={stopTime}
              />
            </GameScreen>
          );
        } else if (currentQuestion.type === "dnd") {
          // Main type DRAG AND DROP
          if (currentQuestion.subType === "text") {
            // Sub-type: text
            if (difficulty === "easy") {
              // Single Drag component for easy difficulty
              console.log("Single Drag");
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <SingleDrag
                    name="displayTile"
                    question={currentQuestion.question}
                    word={currentQuestion.word}
                    options={currentQuestion.options}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            } else if (difficulty === "medium") {
              // Tile layout component for medium difficulty
              console.log("Tile Layout Medium");
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <TileLayout
                    question={currentQuestion.question}
                    word={currentQuestion.word}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    gridSize={2}
                    options={currentQuestion.options}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            } else {
              // Tile layout for hard difficulty
              console.log("Tile Layout Hard");
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <TileLayout
                    question={currentQuestion.question}
                    word={currentQuestion.word}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    gridSize={3}
                    options={currentQuestion.options}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            }
          } else {
            //If type is dnd and subType is image
            if (difficulty === "easy") {
              // Single drag component for easy difficulty
              console.log("Single Drag");
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <SingleDrag
                    name="displayTile"
                    image
                    question={currentQuestion.question}
                    word={currentQuestion.word}
                    options={currentQuestion.options}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            } else if (difficulty === "medium") {
              // Tile layout component for medium difficulty
              console.log("Tile Layout Medium");
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <TileLayout
                    image
                    question={currentQuestion.question}
                    word={currentQuestion.word}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    gridSize={2}
                    options={currentQuestion.options}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            } else {
              // Tile layout component for hard difficulty
              console.log("Tile Layout Hard");
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <TileLayout
                    image
                    question={currentQuestion.question}
                    word={currentQuestion.word}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    gridSize={3}
                    options={currentQuestion.options}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            }
          }
        } else if (currentQuestion.type === "mt") {
          // Main type: Matching Tiles
          if (currentQuestion.subType === "text") {
            // Sub type: text
            if (difficulty === "easy") {
              console.log("Single Match");
              // Single Match component for easy difficulty
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <SingleMatch
                    name="displayTile"
                    question={currentQuestion.question}
                    word={currentQuestion.word}
                    options={currentQuestion.options}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            } else if (difficulty === "medium") {
              console.log("Select Option Medium");
              // Select option component for medium difficulty
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <SelectOption
                    gridSize={2}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    word={currentQuestion.word}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            } else {
              console.log("Select Option Hard");
              // Select option component for hard difficulty
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <SelectOption
                    gridSize={3}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    word={currentQuestion.word}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            }
          } else {
            // Subtype: Image
            if (difficulty === "easy") {
              // Single match component for easy difficulty
              console.log("Single Match");
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <SingleMatch
                    name="displayTile"
                    image={true}
                    question={currentQuestion.question}
                    word={currentQuestion.word}
                    options={currentQuestion.options}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            } else if (difficulty === "medium") {
              console.log("Select Option Medium");
              // Select option component for medium difficulty
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <SelectOption
                    image
                    gridSize={2}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    word={currentQuestion.word}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            } else {
              console.log("Select Option");
              // Select option component for hard difficulty
              return (
                <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
                  <SelectOption
                    image
                    gridSize={3}
                    activeStep={activeStep}
                    nextStep={nextStep}
                    word={currentQuestion.word}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    showBadge={badgeOpen}
                    badge={badges[badgeIndex].image}
                    badgeName={badges[badgeIndex].name}
                    openBadge={openBadge}
                    stopTime={stopTime}
                  />
                </GameScreen>
              );
            }
          }
        }
      } else {
        return (
          <QuestionError
            open={!status.sucess}
            message1="Oops! There Was A Trouble Loading The Game"
            message2="Please Refresh The Page And Try Again"
          />
        );
      }
    }
  }
};

export default PreSchoolers;

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

const badges = [
  { image: b1, name: "Dear" },
  { image: b2, name: "Doggy" },
  { image: b3, name: "Elephant" },
  { image: b4, name: "Foxy" },
  { image: b5, name: "Monkey" },
  { image: b6, name: "Panda" },
  { image: b7, name: "Teddy" },
  { image: b8, name: "Zebra" },
];
