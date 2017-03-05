// This reducer handles the recipe being currently viewed / edited and whatnot
// I have created a separate reducer / state for this because the user can be currently editing
// a recipe and not saving / canceling
import {
  updateStateField,
  addStateField,
  removeStateField,
  moveStateField
} from '../utils/fieldUpdates';

const DEFAULT = {
  name: '',
  desc: '',
  ingredients: [''],
  steps: [''],
  prepTime: '20',
  cookingTime: '20',
  price: '1',
  type: '2',
  season: '0',
  servings: '2',
  note: '',
  img: false
};

const curRecipe = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'UPDATE_CURRECIPE_INPUT':
      return updateStateField(state, action);
    case 'ADD_CURRECIPE_INPUT':
      return addStateField(state, action);
    case 'REMOVE_CURRECIPE_INPUT':
      return removeStateField(state, action);
    case 'MOVE_CURRECIPE_INPUT':
      return moveStateField(state, action);
    default:
      return state;
  }
};

export default curRecipe;

export const getCurRecipeValidState = (state) => {
  const ingredients = state.ingredients
    .filter(ing => ing.length === 0)
    .length === 0;
  const steps = state.steps
    .filter(step => step.length === 0)
    .length === 0;
  const isNum = /^\d+$/;
  const validState = {
    name: state.name.length > 0,
    ingredients,
    steps,
    prepTime: isNum.test(state.prepTime),
    cookingTime: isNum.test(state.cookingTime),
    price: isNum.test(state.price),
    type: isNum.test(state.type),
    season: isNum.test(state.season),
    servings: isNum.test(state.servings)
  };
  const isValidState = Object.keys(validState)
    .map(key => validState[key])
    .filter(fieldState => !fieldState).length === 0;
  return Object.assign({}, validState, { isValidState });
};
