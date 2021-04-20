const scoreReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_SCORE":
      state.push(action.payload);
      return state;
    case "REMOVE_SCORE":
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

export default scoreReducer;
