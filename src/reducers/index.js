import loggedReducer from "./loggedReducer";
import questionsReducer from "./questionsReducer";
import answerReducer from "./answerReducer";
import genderReducer from "./genderReducer";
import levelReducer from "./levelReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: loggedReducer,
  questions: questionsReducer,
  answers: answerReducer,
  gender: genderReducer,
  currentLevel: levelReducer,
});

export default reducers;
