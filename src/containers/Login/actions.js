import axios from "axios";

import CONSTANTS from "../../helpers/constants";

export const logIn = data => dispatch => axios.post(
  `${CONSTANTS.API}/users/login`,
  data
).then(response => dispatch({
  type: "LOGIN_LOG_IN",
  payload: response.data
})).catch(() => dispatch({
  type: "LOGIN_SHOW_ERROR"
}));

export const logInFromCookie = () => ({
  type: "LOGIN_FROM_COOKIE"
});

export const logOut = () => ({
  type: "LOGIN_LOG_OUT"
});

export const clearError = () => ({
  type: "LOGIN_CLEAR_ERROR"
});