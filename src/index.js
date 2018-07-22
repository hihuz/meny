import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import BrowserRouter from "react-router-dom/BrowserRouter";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./utils/localStorage";
import rootReducer from "./reducers";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, loadState(), composeEnhancers(applyMiddleware(thunk)));

store.subscribe(
  throttle(() => {
    const { addForm, curUser } = store.getState();
    saveState({
      addForm,
      curUser
    });
  }),
  2000
);

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("content")
);

/*
TODO :
- Fix the state of Add.js showing all errors after adding a recipe

- merge add & update recipe ? they are fairly similar

// RecipePage.js :
- Add some tooltips to commonly used icons, most notably in RecipePage

- Add a modal component to add confirmation on important actions, mostly this will be
  for the "Delete recipe" action for now

- Add.js : add transition + delay for error messages so that they don't appear instantly ?

// Browse.js :
- add first to last / last to first settings for triage
- add triage by rating (later)
- add pagination of results ?

- Change avatar (also in menu items) to use image instead of background image maybe ?
- Add transition delay as inline style for user menu items
- Convert the NavBar to be dynamic based off route
- add "fake" loader as top bar (http://ricostacruz.com/nprogress/)
- Add a <form> html element to the Landing page header so that enter navigates to "browse",
  or look for a more elegant way to do this

- add actual auth using firebase
- use firebase rest api instead of sdk to save client bytes,
  and also extract all the firebase logic to a "service"

// Add.js :
- Fix the "e" key reseting the numeric field ?

- Maybe add an object level to the way "recipe" is passed as props in the views components
  so that I don't have to specify all the props around explicitely..
  This doesn't seem that easy right now or even that useful, see later

- for images check out cloudinary
- Refactor the components to be more reusable
- polish the ux, animations, transition between routes..
  look at react motion and maybe other available options
  + add animation / transition to the floating actions

// prod / bundle improvements :
- Service Worker : use offline-plugin for webpack, check options for this use case
- For production build, look at adding these plugins (and maybe others) :
    babel-plugin-transform-react-remove-prop-types
    babel-plugin-lodash
    lodash-webpack-plugin
- Try to see if I can cache the recipes for offline and only update the modified records,
  check localforage, redux persist..
  localforage looks good
- find some improvements to start downloading other common routes right after the landing page load:
  look at prefetch plugin and other options
*/
