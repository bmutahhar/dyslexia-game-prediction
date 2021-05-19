import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GameScreen, Loader, QuestionError } from "../../Components";
import {
  LetterRecognition,
  DragDrop,
  CVCwords,
  WordConfirm,
  NameImage,
} from "../../Components/Learners";
import {
  easyDifficulty,
  mediumDifficulty,
  hardDifficulty,
  resetConsecutiveScore,
} from "../../actions";
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
  const difficulty = useSelector((state) => state.difficulty);
  const [showInstructions, setShowInstructions] = useState(true);
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    error: "",
  });
  const [questionSet, setQuestionSet] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const audio = new Audio(yay);
  const url = process.env["REACT_APP_API_URL"];
  const totalLevels = useSelector((state) => state.questions.totalQuestions);
  const consecutiveScore = useSelector((state) => state.consecutiveScore);
  const dispatch = useDispatch();
  const [stop, setStop] = useState(false)

  const stopTime = () => {
    setStop(true);
  };

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

  const getRandomQuestion = (difficulty) => {
    console.log("Difficulty: " + difficulty);
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

  // Code to get first question only
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

  // Code to get random questions from question 2 and onwards
  useEffect(() => {
    if (status.success && !showInstructions) {
      const newDifficulty = monitorDifficulty();
      getRandomQuestion(newDifficulty);
      if (status.success && status.loading) {
        setStatus({ ...status, loading: false });
      }
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
            // Easy Letter Recognition
            return (
              <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
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
                  stopTime={stopTime}
                />
              </GameScreen>
            );
          } else {
            // Medium/Hard Letter Recognition
            console.log("Medium/Hard Letter Recognition");
            return (
              <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
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
                  stopTime={stopTime}
                />
              </GameScreen>
            );
          }
        } else if (currentQuestion.type === "cvc") {
          console.log("CVC");
          // CVC
          return (
            <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
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
                stopTime={stopTime}
              />
            </GameScreen>
          );
        } else if (currentQuestion.type === "ni") {
          if (difficulty === "easy") {
            // Easy name image
            return (
              <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
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
                  stopTime={stopTime}
                />
              </GameScreen>
            );
          } else {
            // medium/hard name image
            return (
              <GameScreen activeStep={activeStep} badges={badges} stop={stop}>
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
                  stopTime={stopTime}
                />
              </GameScreen>
            );
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
