const register = (state = {
  success: false,
  message: false
}, action) => {
  switch (action.type) {
  case "REGISTER_REGISTER":
    state = {
      ...state,
      success: true
    };
    return state;
  case "REGISTER_SHOW_ERROR":
    state = {
      ...state,
      success: false,
      message: true
    };
    return state;
  case "REGISTER_CLEAR_ERROR":
    state = {
      ...state,
      message: false
    };
    return state;
  default:
    return state;
  }
};

export default register;