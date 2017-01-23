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
- Get the landing page working fully
- Convert the NavBar to be dynamic based off route
- Create a generic button component mdl style
- Create a generic link component w/ Link for the nav bar (see egghead)
- Get the add page working fully
- Get the "recipe" page working fully
- RecipeCard component : add author ?
*/
