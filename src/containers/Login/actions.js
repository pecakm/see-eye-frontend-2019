import axios from "axios";

export const logIn = data => dispatch => axios.post(
  "http://localhost:3100/users/login",
  data
).then(response => dispatch({
  type: "LOGIN_LOG_IN",
  payload: response.data
})).catch(() => dispatch({
  type: "LOGIN_LOG_OUT"
}));

export const logInFromCookie = () => ({
  type: "LOGIN_FROM_COOKIE"
});

export const logOut = () => ({
  type: "LOGIN_LOG_OUT"
});