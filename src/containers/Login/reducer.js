const login = (state = {
  isLogged: false
}, action) => {
  switch (action.type) {
  case "LOGIN_LOG_IN":
    state = {
      ...state,
      isLogged: true
    };
    return state;
  case "LOGIN_LOG_OUT":
    state = {
      ...state,
      isLogged: false
    };
    return state;
  default:
    return state;
  }
};

export default login;