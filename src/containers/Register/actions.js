import axios from "axios";

import CONSTANTS from "../../helpers/constants";

export const registerUser = data => dispatch => axios.post(
  `${CONSTANTS.API}/users/signup`,
  data
).then(response => dispatch({
  type: "REGISTER_REGISTER"
})).catch(() => dispatch({
  type: "REGISTER_SHOW_ERROR"
}));

export const clearError = () => ({
  type: "REGISTER_CLEAR_ERROR"
});