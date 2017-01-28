import { combineReducers } from 'redux';
import recipes from './recipes';
import searchSettings from './searchSettings';
import searchTerm from './searchTerm';
import curSeason from './curSeason';

const rootReducer = combineReducers({
  recipes,
  searchSettings,
  searchTerm,
  curSeason
});

export default rootReducer;
