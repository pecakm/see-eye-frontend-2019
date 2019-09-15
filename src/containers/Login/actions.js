import { login } from "../../apiRequests";

export const logIn = data => dispatch => login(data).then(
  token => dispatch({
    type: "LOGIN_LOG_IN",
    payload: token
  })
).catch(() => dispatch({
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