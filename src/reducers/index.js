import { combineReducers } from 'redux';
import recipes, * as fromRecipes from './recipes';
import addForm, * as fromAddForm from './addForm';
import searchSettings from './searchSettings';
import searchTerm from './searchTerm';
import curSeason from './curSeason';
import curUser from './curUser';
import users from './users';
import transition from './transition';
import notification from './notification';

const rootReducer = combineReducers({
  recipes,
  searchSettings,
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

export const getVisibleRecipes = state =>
  fromRecipes.getVisibleRecipes(state.recipes, state.searchSettings, state.searchTerm);
