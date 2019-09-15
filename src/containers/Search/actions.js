import axios from "axios";
import Cookies from "universal-cookie";

import CONSTANTS from "../../helpers/constants";

export const searchUser = data => dispatch => {
  const cookies = new Cookies();
  const headers = { Authorization: `Bearer ${cookies.get(CONSTANTS.TOKEN)}` };

  axios.post(
    `${CONSTANTS.API}/users/find`,
    data,
    { headers }
  ).then(() => dispatch({
    type: "SEARCH_USER_FOUND"
  })).catch(() => dispatch({
    type: "SEARCH_SHOW_ERROR"
  }));
};

export const clearError = () => ({
  type: "SEARCH_CLEAR_ERROR"
});