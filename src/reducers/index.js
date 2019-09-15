import { combineReducers } from "redux";
import login from "../containers/Login/reducer";
import register from "../containers/Register/reducer";

export default combineReducers({
  login,
  register
});