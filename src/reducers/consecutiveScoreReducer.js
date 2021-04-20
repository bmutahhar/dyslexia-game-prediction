const consecutiveScoreReducer = (state = "**", action) => {
  switch (action.type) {
    case "INCREMENT_SCORE":
      state = state.slice(1,) + "1";
      return state;
    case "DECREMENT_SCORE":
      state = state.slice(1,) + "0";
      return state;
    case "RESET_SCORE":
      state = "**";
      return state;
    default:
      return state;
  }
};

export default consecutiveScoreReducer;
