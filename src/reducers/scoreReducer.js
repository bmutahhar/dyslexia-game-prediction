const scoreReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_SCORE":
      state.push(action.payload);
      return state;
    case "RESET_SCORE":
      state = []
      return state;
    default:
      return state;
  }
};

export default scoreReducer;
