const DEFAULT = {
  ingredients: [""],
  steps: [""],
  prep: 20,
  cooking: 20,
  price: null
};

// try to refactor ingredient / steps reducers to remove duplication
const addForm = (state = DEFAULT, action) => {
  const ingredients = state.ingredients.slice(0);
  const steps = state.steps.slice(0);
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
    case 'UPDATE_INGREDIENT':
      return Object.assign({}, state, {
        ingredients: [
          ...ingredients.slice(0, action.index),
          action.value,
          ...ingredients.slice(action.index + 1)
        ]
      });
    case 'ADD_STEP':
      steps.push('');
      return Object.assign({}, state, {
        steps
      });
    case 'REMOVE_STEP':
      return Object.assign({}, state, {
        steps: [
          ...steps.slice(0, action.index),
          ...steps.slice(action.index + 1)
        ]
      });
    case 'UPDATE_STEP':
      return Object.assign({}, state, {
        steps: [
          ...steps.slice(0, action.index),
          action.value,
          ...steps.slice(action.index + 1)
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
    case 'UPDATE_PRICE':
      return Object.assign({}, state, {
        price: action.price
      });
    default:
      return state;
  }
};

export default addForm;

export const getIngButtonState = (state) => state.ingredients
  .filter((ing) => ing.length === 0)
  .length > 0;

export const getStepsButtonState = (state) => state.steps
  .filter((step) => step.length === 0)
  .length > 0;
