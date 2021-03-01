import loggedReducer from "./loggedReducer";
import levelReducer from "./levelReducer";
import answerReducer from "./answerReducer";
import genderReducer from "./genderReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: loggedReducer,
  levels: levelReducer,
  answers: answerReducer,
  gender: genderReducer,
});

export default reducers;
