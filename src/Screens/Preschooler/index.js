import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  // Active step state to monitor the current question number and stepper( The bar on top of the game screen with bullet points)
  const [activeStep, setActiveStep] = useState(0);
  // Boolean badge open state to check if badge is supposed to be displayed or not.
  const [badgeOpen, setBadgeOpen] = useState(false);
  // Boolean state to check if instructions are supposed to be displayed or the game screen.
  const [showInstructions, setShowInstructions] = useState(true);
  // Difficulty state fetched from redux store. Initial value: 'easy'
  const difficulty = useSelector((state) => state.difficulty);
  // Consecutive score state fetch from redux store. Initial value: ***
  const consecutiveScore = useSelector((state) => state.consecutiveScore);
  // Status object state for loading time
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    error: "",
  });
  // QuestionSet state to fetch and store all the questions
  const [questionSet, setQuestionSet] = useState({});
  // Current question state to store the randomly selected question.
  const [currentQuestion, setCurrentQuestion] = useState({});
  // Stop state to stop the timer for all questions.
  const [stop, setStop] = useState(false);
  const audio = new Audio(yay);
  const url = process.env["REACT_APP_API_URL"];
  // Dispatch object for dispatching actions according to redux rules.
  const dispatch = useDispatch();

  // Function to increment the step to display next question.
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const stopTime = () => {
    setStop(true);
  };

  // function to display the badge by setting the state to true and play the yay sound.
  const openBadge = () => {
    setBadgeOpen(true);
    audio.play();
    // Javascript's timeout function to automatically close the bagde and stop the sound.
    setTimeout(() => {
      audio.pause();
      setBadgeOpen(false);
    }, 5000);
  };
  const hideInstructions = () => {
    setShowInstructions(false);
  };

  // Function to get the index number of the badge to be displayed.
  const getBadgeIndex = () => {
    // These conditions basically do nothing in terms of displaying the badge. If we omit these condition then we get a -ve index which throws error.
    // so the first two conditions are just to neutralize the -ve index. The badges start displaying after the active step has reached index= 2
    // If active step 0, return 0
    if (activeStep === 0) return 0;
    // else if active step == 1, return 1
    else if (activeStep === 1) return 1;
    // This block starts executing from activeStep ==2, i.e. before displaying the 3rd question.
    // For active step == 2, floor(2/2) - 1 = 0, display the first badge
    // For active step == 3, floor(3/2) - 1 = 0, returns 0 but the badge is not displayed
    // For active step == 4, floor(4/2) -1 = 1, display the second badge at index 1.
    // so on ...
    else return Math.floor(activeStep / 2) - 1;
  };

  // function to randomly pick a question from the question set. The function takes difficulty as parameters.
  // This function's logic works from 2nd question.
  const getRandomQuestion = (difficulty) => {
    // Get a random index.
    const random = Math.floor(
      Math.random() * (questionSet[difficulty].length - 1)
    );
    // Get previous question in a local variable
    const prevQuestion = { ...currentQuestion };
    // Get the complete question set in a local variable.
    const questions = { ...questionSet };

    // Pick the question at the randomly generated index for the current difficulty level.
    const question = questions[difficulty][random];
    // If that random question hasn't been already displayed and is not of the same type as the previous question that was displayed, then display that question.
    if (!question.displayed && prevQuestion.type !== question.type) {
      questions[difficulty][random].displayed = true;
      setCurrentQuestion(question);
      setQuestionSet(questions);
    } else {
      // Else, iterate over the question set and get the first question from that random question which satisfies the same conditions as mentioned above.
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

  // fetch the questions from the database and set the question set
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
        // If no error, then shuffle the questions array and set the questionSet state.
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

  // Function to monitor and change the difficulty level from easy, medium, hard
  // This function uses dispatch to dispatch the actions and update the global states in redux store.
  const monitorDifficulty = () => {
    // If the user has three consecutive correct answers, then...
    if (consecutiveScore === "111") {
      // If the difficulty is easy, increase to medium difficulty and reset the consecutive score to ***.
      if (difficulty === "easy") {
        dispatch(mediumDifficulty());
        dispatch(resetConsecutiveScore());
        return "medium";
      }
      // If the difficulty is medium, increase to hard difficulty and reset the consecutive score to ***.
      else if (difficulty === "medium") {
        dispatch(hardDifficulty());
        dispatch(resetConsecutiveScore());
        return "hard";
      }
      // If the difficulty is hard, then do nothing and reset the consecutive score to monitor the next consecutive three questions.
      else {
        dispatch(resetConsecutiveScore());
        return "hard";
      }
    }
    // If the user has three consecutive incorrect answers, then...
    else if (consecutiveScore === "000") {
       // If the difficulty is hard, decrease to medium difficulty and reset the consecutive score to ***.
      if (difficulty === "hard") {
        dispatch(mediumDifficulty());
        dispatch(resetConsecutiveScore());
        return "medium";
      }
      // If the difficulty is medium, decrease to easy difficulty and reset the consecutive score to ***.
      else if (difficulty === "medium") {
        dispatch(easyDifficulty());
        dispatch(resetConsecutiveScore());
        return "easy";
      } 
      // If the difficulty is easy, then do nothing and reset the consecutive score to monitor the next consecutive three questions.
      else {
        dispatch(resetConsecutiveScore());
        return "easy";
      }
    } else {
      return difficulty;
    }
  };

  // Use Effect only executes when the HTML content has been rendered on the screen.
  useEffect(() => {
    // If show instructions is false, then fetch the questions from the database.
    if (!showInstructions) {
      try {
        fetchQuestions();
      } catch (e) {
        console.log(e);
        setStatus({ success: false, error: e, loading: false });
      }
    }
  }, [showInstructions]);

  // If questions have been fetched successfully and instructions have been displayed already then fetch a new random question each time activeStep number has changed.
  // This block of code executes from 2nd question and onwards.
  useEffect(() => {
    if (status.success && !showInstructions) {
      const newDifficulty = monitorDifficulty();
      getRandomQuestion(newDifficulty);
      if (status.success && status.loading) {
        setStatus({ ...status, loading: false });
      }
    }
  }, [activeStep]);

  // This block executes only for the first question and gets a random question using the same logic.
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

  // If show instructions state is true then displayed the instructions screen.
  if (showInstructions) {
    return <InstructionScreen onClick={hideInstructions} />;
  } else {
    // Else if it is loading, then display the loading screen.
    if (status.loading) {
      return <Loader open={status.loading} />;
    } else {
      // If the questions have been fetched successfully, start displaying the questions according to each type.
      if (status.success) {
        // get badge index using the function.
        const badgeIndex = getBadgeIndex();
        if (currentQuestion.type === "or") {
          // easy/medium/hard for object rotation
          return (
            // The stop state is used to stop the clock when the game ends, the timer component is displayed in ther game screen component and that is why the stop state goes as props to the game screen component.
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
                    // Stop time method is passed as props to each question component because we do not know which question will be displayed as the last question and hence will stop the timer by clicking the submit button.
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
