import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GameScreen, Loader, QuestionError } from "../../Components";
import {
  LetterRecognition,
  DragDrop,
  CVCwords,
  WordConfirm,
  NameImage,
} from "../../Components/Learners";
import { InstructionScreen } from "../../Screens";
import { yay } from "../../Sounds";

import b1 from "../../Images/badges/Dear.svg";
import b2 from "../../Images/badges/Dog.svg";
import b3 from "../../Images/badges/Elephant.svg";
import b4 from "../../Images/badges/Foxy.svg";
import b5 from "../../Images/badges/Monkey.svg";
import b6 from "../../Images/badges/Panda.svg";
import b7 from "../../Images/badges/Teddy.svg";
import b8 from "../../Images/badges/Zebra.svg";

const Learners = () => {
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
  const [difficulty, setDifficulty] = useState("easy");
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
      console.log("First question");
      questions[difficulty][random].displayed = true;
      setCurrentQuestion(question);
      setQuestionSet(questions);
    } else {
      console.log("NOOBS");
      let index = random + 1;
      for (let i = 0; i < questions[difficulty].length; i++) {
        if (
          !questions[difficulty][index % questions[difficulty].length]
            .displayed &&
          prevQuestion.type !==
            questions[difficulty][index % questions[difficulty].length].type
        ) {
          console.log("Index: ", index);
          questions[difficulty][
            index % questions[difficulty].length
          ].displayed = true;
          setCurrentQuestion(
            questions[difficulty][index % questions[difficulty].length]
          );
          setQuestionSet(questions);
          console.log("Setting question successfully!!!!!!!!");
          break;
        }
        console.log("Gandalf: ", index % questions[difficulty].length);
        index++;
      }
    }
  };

  const fetchQuestions = () => {
    fetch(`${url}/api/v1/questions/learner`, {
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
      console.log("Fetching....");
      setTimeout(fetchQuestions, 4000);
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

  useEffect(() => {
    if (activeStep === 5) {
      setDifficulty("medium");
    } else if (activeStep === 10) {
      setDifficulty("hard");
    }
  }, [activeStep]);

  if (showInstructions) {
    return <InstructionScreen onClick={hideInstructions} />;
  } else {
    if (status.loading) {
      return <Loader open={status.loading} />;
    } else {
      if (status.success) {
        const badgeIndex = getBadgeIndex();
        if (currentQuestion.type === "lr") {
          if (difficulty === "easy") {
            console.log("Easy Letter Recognition");
            return (
              <GameScreen activeStep={activeStep} badges={badges}>
                <LetterRecognition
                  question={currentQuestion.question}
                  word={currentQuestion.word}
                  activeStep={activeStep}
                  nextStep={nextStep}
                  options={currentQuestion.options}
                  showBadge={badgeOpen}
                  badge={badges[badgeIndex].image}
                  badgeName={badges[badgeIndex].name}
                  openBadge={openBadge}
                />
              </GameScreen>
            );
          } else {
            console.log("Medium/Hard Letter Recognition");
            return (
              <GameScreen activeStep={activeStep} badges={badges}>
                <DragDrop
                  question={currentQuestion.question}
                  word={currentQuestion.word}
                  activeStep={activeStep}
                  nextStep={nextStep}
                  options={currentQuestion.options}
                  showBadge={badgeOpen}
                  badge={badges[badgeIndex].image}
                  badgeName={badges[badgeIndex].name}
                  openBadge={openBadge}
                />
              </GameScreen>
            );
          }
        } else if (currentQuestion.type === "cvc") {
          console.log("CVC");
          return (
            <GameScreen activeStep={activeStep} badges={badges}>
              <CVCwords
                question={currentQuestion.question}
                word={currentQuestion.word}
                activeStep={activeStep}
                nextStep={nextStep}
                options={currentQuestion.options}
                showBadge={badgeOpen}
                badge={badges[badgeIndex].image}
                badgeName={badges[badgeIndex].name}
                openBadge={openBadge}
              />
            </GameScreen>
          );
        } else if (currentQuestion.type === "ni") {
          if (difficulty === "easy") {
            return (
              <GameScreen activeStep={activeStep} badges={badges}>
                <NameImage
                  word={currentQuestion.word}
                  easy={true}
                  question={currentQuestion.question}
                  activeStep={activeStep}
                  nextStep={nextStep}
                  showBadge={badgeOpen}
                  badge={badges[badgeIndex].image}
                  badgeName={badges[badgeIndex].name}
                  openBadge={openBadge}
                  options={currentQuestion.options}
                />
              </GameScreen>
            );
          } else {
            return (
              <GameScreen activeStep={activeStep} badges={badges}>
                <NameImage
                  word={currentQuestion.word}
                  question={currentQuestion.question}
                  activeStep={activeStep}
                  nextStep={nextStep}
                  showBadge={badgeOpen}
                  badge={badges[badgeIndex].image}
                  badgeName={badges[badgeIndex].name}
                  openBadge={openBadge}
                  options={currentQuestion.options}
                />
              </GameScreen>
            );
          }
        } else if (currentQuestion.type === "wc") {
          return (
            <GameScreen activeStep={activeStep} badges={badges}>
              <WordConfirm
                word={currentQuestion.word.toUpperCase()}
                question={currentQuestion.question}
                activeStep={activeStep}
                nextStep={nextStep}
                showBadge={badgeOpen}
                badge={badges[badgeIndex].image}
                badgeName={badges[badgeIndex].name}
                openBadge={openBadge}
              />
            </GameScreen>
          );
        }
      } else {
        return <QuestionError open={!status.sucess} />;
      }
    }
  }
};

export default Learners;

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
