const register = (state = {
  success: false,
  message: false
}, action) => {
  switch (action.type) {
  case "SEARCH_USER_FOUND":
    state = {
      ...state,
      success: true
    };
    return state;
  case "SEARCH_SHOW_ERROR":
    state = {
      ...state,
      success: false,
      message: true
    };
    return state;
  case "SEARCH_CLEAR_ERROR":
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