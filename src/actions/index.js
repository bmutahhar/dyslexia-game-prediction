export const signin = (token) => ({
  type: "SIGN_IN",
  payload: token,
});

export const signout = () => ({
    type: "SIGN_OUT",
})
