const loggedIn = localStorage.getItem("userLoggedIn") !== null ? true : false;
const loggedReducer = (state = loggedIn, action) => {
  switch (action.type) {
    case "SIGN_IN":
      localStorage.setItem("userLoggedIn", true);
      return !state;
    case "SIGN_OUT":
      localStorage.removeItem("userLoggedIn");
      return !state;
    default:
      return state;
  }
};

export default loggedReducer;
