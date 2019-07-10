const login = (state = {
  isLogged: false
}, action) => {
  switch (action.type) {
  case "LOG_IN":
    state = {
      ...state,
      isLogged: true
    };
    return state;
  default:
    return state;
  }
};

export default login;