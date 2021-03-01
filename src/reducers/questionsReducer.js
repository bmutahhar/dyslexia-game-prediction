const totalQuestions = 15;
let steps = [];
for (let i = 1; i <= totalQuestions; i++) steps.push(i);
const questionsReducer = (state = { totalQuestions, steps }, action) => {
  return state;
};

export default questionsReducer;
