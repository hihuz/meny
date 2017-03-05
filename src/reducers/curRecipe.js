
import {
  updateStateField,
  addStateField,
  removeStateField,
  moveStateField
} from '../utils/fieldUpdates';
import getRecipeValidState from '../utils/commonSelectors';

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
    case 'SWITCH_RECIPE':
      return action.recipe;
    case 'UPDATE_RECIPEPAGE_INPUT':
      return updateStateField(state, action);
    case 'ADD_RECIPEPAGE_INPUT':
      return addStateField(state, action);
    case 'REMOVE_RECIPEPAGE_INPUT':
      return removeStateField(state, action);
    case 'MOVE_RECIPEPAGE_INPUT':
      return moveStateField(state, action);
    default:
      return state;
  }
};

export default curRecipe;

export const getCurRecipeValidState = state => getRecipeValidState(state);
