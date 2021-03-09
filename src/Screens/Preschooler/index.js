import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GameScreen, Loader, QuestionError } from "../../Components";
import {
  ObjectRotation,
  SingleDrag,
  SingleMatch,
  TileLayout,
  SelectOption,
} from "../../Components/Preschooler";
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

const PreSchoolers = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [badgeOpen, setBadgeOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    error: "",
  });
  const [questionSet, setQuestionSet] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [difficulty, setDifficulty] = useState("hard");
  const audio = new Audio(yay);
  const url = process.env["REACT_APP_API_URL"];
  const totalLevels = useSelector((state) => state.questions.totalQuestions);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
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

  const getRandomQuestion = () => {
    const random = Math.floor(
      Math.random() * (questionSet[difficulty].length - 1)
    );
    console.log("Random Number: ", random);
    const prevQuestion = { ...currentQuestion };
    const questions = { ...questionSet };

    const question = questions[difficulty][random];
    console.log("Random Question Currently Picked: ", question);
    console.log("Prev Question", prevQuestion);
    if (!question.displayed && prevQuestion.type !== question.type) {
      console.log("First question")
      questions[difficulty][random].displayed = true;
      setCurrentQuestion(question);
      setQuestionSet(questions);
    } else {
      console.log("NOOBS")
      let index = random + 1;
      for (let i = 0; i < questions[difficulty].length; i++) {
        if (
          !questions[difficulty][index % (questions[difficulty].length)].displayed &&
          prevQuestion.type !==
          questions[difficulty][index % (questions[difficulty].length)].type
        ) {
          console.log("Index: ", index);
          questions[difficulty][
            index % (questions[difficulty].length)
          ].displayed = true;
          setCurrentQuestion(
            questions[difficulty][index % (questions[difficulty].length)]
          );
          setQuestionSet(questions);
          console.log("Setting question successfully!!!!!!!!");
          break;
        }
        console.log("Gandalf: ", index % (questions[difficulty].length))
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
          console.log("Fetching 2.... ");
          console.log(respJson);
          const easy = shuffleArray(respJson.easy);
          const medium = shuffleArray(respJson.medium);
          const hard = shuffleArray(respJson.hard);
          setQuestionSet({
            easy,
            medium,
            hard,
          });
          console.log("Fetched");
          setStatus({ success: true, error: "", loading: true });
        } else {
          console.log("No wayyy");
          setStatus({ success: false, error: respJson.error, loading: false });
        }
      })
      .catch((err) => {
        setStatus({ success: false, error: err, loading: false });
      });
  };

  useEffect(() => {
    if (!showInstructions) {
      try {
        console.log("Fetching....");
        setTimeout(fetchQuestions, 4000);
      } catch (e) {
        console.log(e);
        setStatus({ success: false, error: e, loading: false });
      }
    }
  }, [showInstructions]);

  useEffect(() => {
    if (status.success && !showInstructions) {
      console.log("Getting random question bruh!!!");
      getRandomQuestion();
      if (status.success && status.loading) {
        setStatus({ ...status, loading: false });
        console.log("Setting loading to false");
      }
    }
  }, [activeStep, status.success, difficulty, showInstructions]);

  useEffect(() => {
    console.log("Current Question: ", currentQuestion);
  }, [currentQuestion]);

  if (showInstructions) {
    return <InstructionScreen onClick={hideInstructions} />;
  } else {
    if (status.loading) {
      return <Loader open={status.loading} />;
    } else {
      if (status.success) {
        const badgeIndex = getBadgeIndex();
        if (currentQuestion.type === "or") {
          console.log("Object Rotation");
          return (
            <GameScreen activeStep={activeStep} badges={badges}>
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
              />
            </GameScreen>
          );
        } else if (currentQuestion.type === "dnd") {
          if (currentQuestion.subType === "text") {
            if (difficulty === "easy") {
              console.log("Single Drag");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            } else if (difficulty === "medium") {
              console.log("Tile Layout Medium");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            } else {
              console.log("Tile Layout Hard");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            }
          } else {
            //If type is dnd and subType is image
            if (difficulty === "easy") {
              console.log("Single Drag");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            } else if (difficulty === "medium") {
              console.log("Tile Layout Medium");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            } else {
              console.log("Tile Layout Hard");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            }
          }
        } else if (currentQuestion.type === "mt") {
          if (currentQuestion.subType === "text") {
            if (difficulty === "easy") {
              console.log("Single Match");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            } else if (difficulty === "medium") {
              console.log("Select Option Medium");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            } else {
              console.log("Select Option Hard");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            }
          } else {
            if (difficulty === "easy") {
              console.log("Single Match");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            } else if (difficulty === "medium") {
              console.log("Select Option Medium");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            } else {
              console.log("Select Option");
              return (
                <GameScreen activeStep={activeStep} badges={badges}>
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
                  />
                </GameScreen>
              );
            }
          }
        }
      } else {
        return <QuestionError open={!status.sucess} />;
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
  { image: b1, name: "Teddy" },
  { image: b2, name: "Kitty" },
  { image: b3, name: "Foxy" },
  { image: b4, name: "Monkey" },
  { image: b5, name: "Donkey" },
  { image: b6, name: "Doggy" },
  { image: b7, name: "Monkey" },
  { image: b8, name: "Monkey" },
];
