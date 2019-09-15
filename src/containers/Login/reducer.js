import Cookies from "universal-cookie";

import CONSTANTS from "../../helpers/constants";

const login = (state = {
  isLogged: false,
  message: false
}, action) => {
  const cookies = new Cookies();

  switch (action.type) {
  case "LOGIN_LOG_IN":
    cookies.set(CONSTANTS.TOKEN, action.payload);
    state = {
      ...state,
      isLogged: true
    };
    return state;
  case "LOGIN_FROM_COOKIE":
    state = {
      ...state,
      isLogged: true
    };
    return state;
  case "LOGIN_LOG_OUT":
    cookies.remove(CONSTANTS.TOKEN);
    state = {
      ...state,
      isLogged: false
    };
    return state;
  case "LOGIN_SHOW_ERROR":
    state = {
      ...state,
      isLogged: false,
      message: true
    };
    return state;
  case "LOGIN_CLEAR_ERROR":
    state = {
      ...state,
      message: false
    };
    return state;
  default:
    return state;
  }
};

export default login;