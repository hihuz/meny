// this reducer stores the data associated to the recipe being currently viewed / edited
// the idea is to have this distinct from the global list of recipes in the store
// so that edits are not saved immediately in the store, user needs to cancel / save
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
    case 'CHANGE_CUR_RECIPE':
      return action.recipe;
    case 'UPDATE_EDITPAGE_INPUT':
      return updateStateField(state, action);
    case 'ADD_EDITPAGE_INPUT':
      return addStateField(state, action);
    case 'REMOVE_EDITPAGE_INPUT':
      return removeStateField(state, action);
    case 'MOVE_EDITPAGE_INPUT':
      return moveStateField(state, action);
    default:
      return state;
  }
};

export default curRecipe;

export const getCurRecipe = state => state;

export const getCurRecipeValidState = state => getRecipeValidState(state);
