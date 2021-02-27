export const signin = (token) => ({
  type: "SIGN_IN",
  payload: token,
});

export const signout = () => ({
  type: "SIGN_OUT",
});

export const addAnswer = (payload) => ({
  type: "ADD_ANSWER",
  payload: payload.trim(),
});

export const removeAnswer = (payload) => ({
  type: "REMOVE_ANSWER",
  payload: payload.trim(),
});
