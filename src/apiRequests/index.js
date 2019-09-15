import axios from "axios";
import Cookies from "universal-cookie";

import CONSTANTS from "../helpers/constants";

const cookies = new Cookies();
const headers = { Authorization: `Bearer ${cookies.get(CONSTANTS.TOKEN)}` };

export const login = data => (
  new Promise((resolve, reject) => {
    axios.post(
      `${CONSTANTS.API}/users/login`,
      data
    ).then(
      response => resolve(response.data)
    ).catch(reject);
  })
);

export const register = data => (
  new Promise((resolve, reject) => {
    axios.post(
      `${CONSTANTS.API}/users/signup`,
      data
    ).then(resolve).catch(reject);
  })
);

export const searchUser = data => (
  new Promise((resolve, reject) => {
    axios.post(
      `${CONSTANTS.API}/users/find`,
      data,
      { headers }
    ).then(
      response => resolve(response.data)
    ).catch(reject);
  })
);

export const loadChatData = id => (
  new Promise((resolve, reject) => {
    axios.get(
      `${CONSTANTS.API}/users/data/${id}`,
      { headers }
    ).then(response => resolve(response.data));
  })
);