import loggedReducer from "./loggedReducer";
import levelReducer from "./levelReducer";
import answerReducer from "./answerReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: loggedReducer,
  levels: levelReducer,
  answers: answerReducer,
});

export default reducers;
