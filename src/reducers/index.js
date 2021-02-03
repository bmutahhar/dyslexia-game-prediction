import loggedReducer from "./loggedReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({ userLoggedIn: loggedReducer });

export default reducers;
