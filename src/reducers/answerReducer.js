const answerReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ANSWER":
      state.push(action.payload);
      return state;
    case "REMOVE_ANSWER":
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

export default answerReducer;
