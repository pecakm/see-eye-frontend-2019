import { register } from "../../apiRequests";

export const registerUser = data => dispatch => register(data).then(
  () => dispatch({
    type: "REGISTER_REGISTER"
  })
).catch(() => dispatch({
  type: "REGISTER_SHOW_ERROR"
}));

export const clearError = () => ({
  type: "REGISTER_CLEAR_ERROR"
});