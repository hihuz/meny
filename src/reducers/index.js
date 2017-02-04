import { combineReducers } from 'redux';
import recipes from './recipes';
import searchSettings from './searchSettings';
import searchTerm from './searchTerm';
import curSeason from './curSeason';
import curUser from './curUser';
import users from './users';
import addForm, * as fromAddForm from './addForm';

const rootReducer = combineReducers({
  recipes,
  searchSettings,
  searchTerm,
  curSeason,
  curUser,
  users,
  addForm
});

export default rootReducer;

export const getIngButtonState = (state) =>
  fromAddForm.getIngButtonState(state.addForm);

export const getStepsButtonState = (state) =>
  fromAddForm.getStepsButtonState(state.addForm);
