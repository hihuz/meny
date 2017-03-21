import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { sortByName, sortByDate } from '../utils/sortMethods';
import recipes, * as fromRecipes from './recipes';
import addForm, * as fromAddForm from './addForm';
import curRecipe, * as fromCurRecipe from './curRecipe';
import hasRecipesData from './hasRecipesData';
import searchSettings from './searchSettings';
import recipesOrdering from './recipesOrdering';
import searchTerm from './searchTerm';
import curSeason from './curSeason';
import curUser from './curUser';
import users from './users';
import transition from './transition';
import notification from './notification';

const rootReducer = combineReducers({
  recipes,
  hasRecipesData,
  searchSettings,
  recipesOrdering,
  searchTerm,
  curSeason,
  curUser,
  users,
  addForm,
  curRecipe,
  transition,
  notification
});

export default rootReducer;

export const getAddFormValidState = state =>
  fromAddForm.getAddFormValidState(state.addForm);

export const getMatchingRecipe = (state, id) => fromRecipes.getMatchingRecipe(state.recipes, id);

export const getCurRecipe = state => fromCurRecipe.getCurRecipe(state.curRecipe);

const getRecipes = state => state.recipes;
const getSortMethod = state => state.recipesOrdering;
const getSearchFilters = state => state.searchSettings;
const getSearchTerm = state => state.searchTerm;
const getCurUserId = state => state.curUser.id;

export const getCurRecipeValidState = state =>
  fromCurRecipe.getCurRecipeValidState(state.curRecipe);

export const getOrderedRecipes = createSelector(
  getRecipes,
  getSortMethod,
  (list, sortObj) => {
    const sortMethod = sortObj.orderBy || 'name';
    const sortDir = sortObj.orderType || 'ftl';
    const listCopy = [...list];
    return listCopy.sort((a, b) => {
      if (sortMethod === 'name') {
        if (sortDir === 'ftl') { return sortByName(a, b); }
        return sortByName(b, a);
      } else if (sortMethod === 'date') {
        if (sortDir === 'ftl') { return sortByDate(a, b); }
        return sortByDate(b, a);
      }
      return a - b;
    });
  }
);

export const getVisibleRecipes = createSelector(
  getOrderedRecipes,
  getSearchFilters,
  getSearchTerm,
  (recipeList, filters, term) => fromRecipes.getVisibleRecipes(recipeList, filters, term)
);

export const getEditableStatus = createSelector(
  getCurUserId,
  getMatchingRecipe,
  (userId, recipe) => (recipe ? userId === recipe.authorId : false)
);
