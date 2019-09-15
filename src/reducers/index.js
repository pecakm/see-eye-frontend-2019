import { combineReducers } from "redux";
import login from "../containers/Login/reducer";
import register from "../containers/Register/reducer";
import search from "../containers/Search/reducer";

export default combineReducers({
  login,
  register,
  search
});