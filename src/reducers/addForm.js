const DEFAULT = {
  ingredients: [""],
  prep: 20,
  cooking: 20
};

const addForm = (state = DEFAULT, action) => {
  const ingredients = state.ingredients.slice(0);
  switch (action.type) {
    case 'ADD_INGREDIENT':
      ingredients.push('');
      return Object.assign({}, state, {
        ingredients
      });
    case 'REMOVE_INGREDIENT':
      return Object.assign({}, state, {
        ingredients: [
          ...ingredients.slice(0, action.index),
          ...ingredients.slice(action.index + 1)
        ]
      });
    case 'CHANGE_INGREDIENT':
      return Object.assign({}, state, {
        ingredients: [
          ...ingredients.slice(0, action.index),
          action.value,
          ...ingredients.slice(action.index + 1)
        ]
      });
    case 'UPDATE_PREP_TIME':
      return Object.assign({}, state, {
        prep: action.time
      });
    case 'UPDATE_COOKING_TIME':
      return Object.assign({}, state, {
        cooking: action.time
      });
    default:
      return state;
  }
};

export default addForm;

export const getIngButtonState = (state) => state.ingredients
  .filter((ing) => ing.length === 0)
  .length > 0;
