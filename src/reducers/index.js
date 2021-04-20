import loggedReducer from "./loggedReducer";
import questionsReducer from "./questionsReducer";
import scoreReducer from "./scoreReducer";
import genderReducer from "./genderReducer";
import levelReducer from "./levelReducer";
import consecutiveScoreReducer from "./consecutiveScoreReducer";
import difficultyReducer from "./difficultyReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: loggedReducer,
  questions: questionsReducer,
  scores: scoreReducer,
  gender: genderReducer,
  currentLevel: levelReducer,
  consecutiveScore: consecutiveScoreReducer,
  difficulty: difficultyReducer,
});

export default reducers;
