const difficultyReducer = (state = "easy", action) => {
  switch (action.type) {
    case "EASY":
      state = "easy";
      return state;
    case "MEDIUM":
      state = "medium";
      return state;
    case "HARD":
      state = "hard";
      return state;
    default:
      return state;
  }
};

export default difficultyReducer;
