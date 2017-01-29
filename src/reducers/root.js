import { combineReducers } from 'redux';
import recipes from './recipes';
import searchSettings from './searchSettings';
import searchTerm from './searchTerm';
import curSeason from './curSeason';
import curUser from './curUser';
import users from './users';

const rootReducer = combineReducers({
  recipes,
  searchSettings,
  searchTerm,
  curSeason,
  curUser,
  users
});

export default rootReducer;
