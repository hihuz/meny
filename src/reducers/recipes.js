import sample from '../../sample.json';

const DEFAULT_STATE = sample;

const recipes = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'TEMP':
      return Object.assign({}, action.recipes);
    default:
      return state;
  }
};

export default recipes;
