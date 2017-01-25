import { combineReducers } from 'redux';
import recipes from './recipes';
import searchSettings from './searchSettings';
import curSeason from './curSeason';

const rootReducer = combineReducers({
  recipes,
  searchSettings,
  curSeason
});

export default rootReducer;
