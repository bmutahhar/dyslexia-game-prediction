const levelReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_LEVEL":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default levelReducer;
