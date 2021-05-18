const loggedIn = sessionStorage.getItem("userLoggedIn") !== null ? true : false;
const token =
  sessionStorage.getItem("token") !== null ? sessionStorage.getItem("token") : "";
const loggedReducer = (state = { loggedIn, token }, action) => {
  switch (action.type) {
    case "SIGN_IN":
      sessionStorage.setItem("userLoggedIn", true);
      sessionStorage.setItem("token", action.payload);
      return { loggedIn: !state.loggedIn, token: action.payload };
    case "SIGN_OUT":
      sessionStorage.clear();
      return { loggedIn: !state.loggedIn, token: "" };
    default:
      return state;
  }
};

export default loggedReducer;
