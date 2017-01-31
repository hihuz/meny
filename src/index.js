import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import BrowserRouter from 'react-router/BrowserRouter';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './utils/localStorage';
import rootReducer from './reducers/root';
import App from './views/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, loadState(), composeEnhancers(
  applyMiddleware(thunk)
));

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
- use firebase rest api instead of sdk to shave client bytes
- Get the add page working fully, without styling at first and then with styling
- Browse page : add first to last / last to first settings for triage
- FIX react router keeping the scrolling intact on route change!!!!
- Change avatar (also in menu items) to use image instead of background image maybe ?
- Add transition delay as inline style for user menu items
- Convert the NavBar to be dynamic based of off route
- add "fake" loader as top bar (http://ricostacruz.com/nprogress/)
- add a generic loader component (the same one as my twitch project)
- Add a <form> html element to the Landing page header so that enter navigates to "browse"
- extract the logic from mapstatetoprops and put it in selectors (in reducer files)
- Create a generic button component mdl style
- Get the "recipe" page working fully
- Try to see if I can cache the recipes for offline and only update the modified records,
  check localforage, redux persist..
- localforage looks good
- find some improvements to start downloading other common routes
  from the landing page after it is interactive
- Add English VS French version maybe ? :-( that would be cool
*/
