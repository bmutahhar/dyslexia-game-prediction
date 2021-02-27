const genderReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_GENDER":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default genderReducer;