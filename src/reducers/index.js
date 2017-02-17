import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import recipes, * as fromRecipes from './recipes';
import addForm, * as fromAddForm from './addForm';
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
  searchSettings,
  recipesOrdering,
  searchTerm,
  curSeason,
  curUser,
  users,
  addForm,
  transition,
  notification
});

export default rootReducer;

export const getAddFormValidState = state =>
  fromAddForm.getAddFormValidState(state.addForm);


const getRecipes = state => state.recipes;
const getSortMethod = state => state.recipesOrdering;
const getSearchFilters = state => state.searchSettings;
const getSearchTerm = state => state.searchTerm;

const sortByName = (a, b) => {
  if (a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
  return 1;
};
const sortByDate = (a, b) => a.updated < b.updated;

export const getOrderedRecipes = createSelector(
  getRecipes,
  getSortMethod,
  (list, sortObj) => {
    const sortMethod = sortObj.orderBy;
    const sortDir = sortObj.orderType;
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
