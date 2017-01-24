import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import BrowserRouter from 'react-router/BrowserRouter';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './utils/localStorage';
import rootReducer from './reducers/root';
import App from './views/App';

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(thunk)
);

store.subscribe(throttle(() => {
  const { token } = store.getState();
  saveState({
    token
  });
}), 1000);

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('content')
);


/*
TODO :
- Get the landing page working fully (put season and latest in place of the current "featured")
- Convert the NavBar to be dynamic based off route
- add styling to navbar links (codrops)
- add menu with hihuz / typhon when clicking on "user"
- add "fake" loader as top bar (http://ricostacruz.com/nprogress/)
- add a generic loader component
- figure out the best firebase structure >> remove featured, add users, etc.
- Create a generic button component mdl style
- Get the add page working fully, without styling at first
- Get the "recipe" page working fully
- Try to see if I can cache the recipes for offline and only update the modified records, check localforage, redux persist..
- find some improvements to start downloading other common routes from the landing page after it is interactive
- RecipeCard component : add author ?
*/
