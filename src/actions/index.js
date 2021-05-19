export const signin = (token) => ({
  type: "SIGN_IN",
  payload: token,
});

export const signout = () => ({
  type: "SIGN_OUT",
});

export const addScore = (payload) => ({
  type: "ADD_SCORE",
  payload: payload,
});

export const removeScore = (payload) => ({
  type: "REMOVE_SCORE",
  payload: payload,
});

export const setGender = (payload) => ({
  type: "SET_GENDER",
  payload: payload.trim(),
})

export const setLevel = (payload) => ({
  type: "SET_LEVEL",
  payload: payload.trim(),
})

export const incrementConsecutiveScore = () => ({
  type: "INCREMENT_SCORE",
})

export const decrementConsecutiveScore = () => ({
  type: "DECREMENT_SCORE",
})

export const resetConsecutiveScore = () => ({
  type: "RESET_SCORE",
})

export const easyDifficulty = () => ({
  type: "EASY",
})

export const mediumDifficulty = () => ({
  type: "MEDIUM",
})

export const hardDifficulty = () => ({
  type: "HARD",
})

export const recordTime = (payload) => ({
  type: "SET_TIME",
  payload: payload,
});