import loggedReducer from "./loggedReducer";
import levelReducer from "./levelReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: loggedReducer,
  levels: levelReducer,
});

export default reducers;
