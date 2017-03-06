// This reducer handles the list of recipes stored in memory
// so it handles the recipe being currently viewed / edited and whatnot
// Name of action types are a bit confusing because I originally wanted to use a separate page

// Originally I used an array for this reducer but if
// the list gets huge, editing may become a bottleneck
// I need to keep track of performance on this and switch to an object if needed
// For now i'll keep it like this, storing the index in each recipe to avoid unnecessary operations
// When I add the feature to delete a recipe I may need to keep an empty array item in memory
// to avoid having to update all the indexes
import {
  updateStateField,
  addStateField,
  removeStateField,
  moveStateField
} from '../utils/fieldUpdates';
import getRecipeValidState from '../utils/commonSelectors';

const recipes = (state = [], action) => {
  const index = action.recipeIndex;
  switch (action.type) {
    case 'FETCH_RECIPES':
      return action.recipes;
    case 'ADD_RECIPE':
      return [
        ...state,
        Object.assign({}, action.recipe, { index: state.length })
      ];
    // This is quite a bit of code duplication here..
    // Try to refactor this later maybe a single action, passing in something
    // in addition to the type ?
    case 'UPDATE_EDITPAGE_INPUT':
      return [
        ...state.slice(0, index),
        updateStateField(state[index], action),
        ...state.slice(index + 1)
      ];
    case 'ADD_EDITPAGE_INPUT':
      return [
        ...state.slice(0, index),
        addStateField(state[index], action),
        ...state.slice(index + 1)
      ];
    case 'REMOVE_EDITPAGE_INPUT':
      return [
        ...state.slice(0, index),
        removeStateField(state[index], action),
        ...state.slice(index + 1)
      ];
    case 'MOVE_EDITPAGE_INPUT':
      return [
        ...state.slice(0, index),
        moveStateField(state[index], action),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

export default recipes;

export const getMatchingRecipe = (state, id) => state.find(
  recipe => recipe.id === id
);

export const getVisibleRecipes = (recipeList, filters, searchTerm) => {
  const term = searchTerm.toUpperCase();
  const filterRecipes = (recipe) => {
    if (recipe.season !== '0' &&
        filters.season !== '0' &&
        filters.season !== recipe.season) { return false; }
    if (recipe.type !== '0' &&
        filters.type !== '0' &&
        filters.type !== recipe.type) { return false; }

    let found = false;
    if (filters.name &&
        recipe.name.toUpperCase().indexOf(term) !== -1) { found = true; }
    if (filters.desc &&
        recipe.desc.toUpperCase().indexOf(term) !== -1) { found = true; }
    if (filters.ingredients &&
        recipe.ingredients
          .filter(ing => ing.toUpperCase().indexOf(term) !== -1).length > 0) {
      found = true;
    }
    if (!filters.name && !filters.desc && !filters.ingredients) { found = true; }
    return found;
  };
  return recipeList.filter(filterRecipes);
};

export const getCurRecipeValidState = state => getRecipeValidState(state);
