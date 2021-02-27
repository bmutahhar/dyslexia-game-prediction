const loggedIn = localStorage.getItem("userLoggedIn") !== null ? true : false;
const token =
  localStorage.getItem("token") !== null ? localStorage.getItem("token") : "";
const loggedReducer = (state = { loggedIn, token }, action) => {
  switch (action.type) {
    case "SIGN_IN":
      localStorage.setItem("userLoggedIn", true);
      localStorage.setItem("token", action.payload);
      return { loggedIn: !state.loggedIn, token: action.payload };
    case "SIGN_OUT":
      localStorage.clear();
      return { loggedIn: !state.loggedIn, token: "" };
    default:
      return state;
  }
};

export default loggedReducer;
