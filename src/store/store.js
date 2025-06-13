import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import { loadState, saveState } from "../utils/localStorage";
import throttle from "lodash.throttle";

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(
  throttle(() => {
    const { addForm, curUser } = store.getState();
    saveState({
      addForm,
      curUser
    });
  }, 2000)
);

export default store;