import loggedReducer from "./loggedReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({ user: loggedReducer });

export default reducers;
