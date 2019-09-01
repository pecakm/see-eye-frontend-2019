import axios from "axios";

export const registerUser = data => dispatch => axios.post(
  "http://localhost:3100/users/signup",
  data
).then(response => dispatch({
  type: "REGISTER_REGISTER",
  payload: response.data
})).catch((error) => dispatch({
  type: "REGISTER_SHOW_ERROR"
}));

export const clearError = () => ({
  type: "REGISTER_CLEAR_ERROR"
});