const totalLevels = 15;
let steps = [];
for (let i = 1; i <= totalLevels; i++) steps.push(i);
const levelReducer = (state = { totalLevels, steps }, action) => {
  return state;
};

export default levelReducer;
