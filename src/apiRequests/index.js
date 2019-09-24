import axios from "axios";
import Cookies from "universal-cookie";

import CONSTANTS from "../helpers/constants";

const cookies = new Cookies();

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
      { headers: includeHeaders() }
    ).then(
      response => resolve(response.data)
    ).catch(reject);
  })
);

export const loadChatData = userId => {
  return new Promise((resolve, reject) => {
    axios.get(
      `${CONSTANTS.API}/rooms/${userId}`,
      { headers: includeHeaders() }
    ).then(
      response => resolve(response.data)
    ).catch(error => reject(error));
  })
};

export const loadRooms = () => {
  return new Promise((resolve, reject) => {
    axios.get(
      `${CONSTANTS.API}/rooms/all`,
      { headers: includeHeaders() }
    ).then(
      response => resolve(response.data)
    ).catch(error => reject(error));
  })
};

const includeHeaders = () => ({
  Authorization: `Bearer ${cookies.get(CONSTANTS.TOKEN)}`
});