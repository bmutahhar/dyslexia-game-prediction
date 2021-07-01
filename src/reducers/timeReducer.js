const timeReducer = (state = 0, action) => {
    switch (action.type) {
      case "SET_TIME":
        state = action.payload;
        return state;
      default:
        return state;
    }
  };
  
  export default timeReducer;