import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './utils/localStorage';
import rootReducer from './reducers';
import App from './views/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, loadState(), composeEnhancers(
  applyMiddleware(thunk)
));

store.subscribe(throttle(() => {
  const { addForm, curUser } = store.getState();
  saveState({
    addForm,
    curUser
  });
}), 2000);

render(
  <Provider store={store}>
<<<<<<< HEAD
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
    <App />
>>>>>>> e25695f9a4b5cff0ec890bf3563c4ea677feb679
  </Provider>,
  document.getElementById('content')
);


/*
TODO :
<<<<<<< HEAD
=======
// fix the router :(:(

>>>>>>> e25695f9a4b5cff0ec890bf3563c4ea677feb679
//Get the RecipePage.js working fully :
  Also the logic for updating firebase is not done but that should be easy
  after that implement button in InputListForm to save / undo changes
  then change all the other infos to be editable

- Add.js : add transition + delay for error messages so that they don't appear instantly ?

- Add.js / RecipePage.js : fix InputListForm up / down buttons range

- addForm.js / actions : change "name" param to "field" ?

- App.js / RecipePage.js : currently if we press F5 on the page of a recipe
  We get a blank page right now because details are fetched in other page
  This will be fixed when I add storage for the recipes so I can make a quick fix
  For example adding the recipe fetching to App.js since it is importing firebase anyway

// Browse.js :
- add first to last / last to first settings for triage
- add triage by rating (later)
- add pagination of results ?

- FIX react router keeping the scrolling intact on route change!
- Change avatar (also in menu items) to use image instead of background image maybe ?
- Add transition delay as inline style for user menu items
- Convert the NavBar to be dynamic based off route
- add "fake" loader as top bar (http://ricostacruz.com/nprogress/)
- add a generic loader component (the same one as my twitch project ?)
- Add a <form> html element to the Landing page header so that enter navigates to "browse"

- use firebase rest api instead of sdk to shave client bytes

// Add.js :
- Fix the "e" key reseting the numeric field ?
- Fix minor issue when the "delete" button on a input list is being clicked,
  it triggers the error message (onBlur)
- Add a recap of errors near the submit button ? (not necessary)
- Fix the ingredients form getting rendered twice on load

// RecipePage.js :
- Check if it is best to not save changes right off the bat and
  maybe provide a way to undo changes
- See if the edit errors should be based off focus or if I can keep them the way they are now

- polish the ux, animations, transition between routes..
  look at reactcsstransitiongroup & react motion
- add extract text plugin for the css, update my webpack config in that regard
- Service Worker : check offline-plugin for webpack (check reference from kent c. dodds)
- Try to see if I can cache the recipes for offline and only update the modified records,
  check localforage, redux persist..
- localforage looks good
- find some improvements to start downloading other common routes :
  this should be automatic with offline-plugin / service worker (otherwise try prefetch plugin)
  from the landing page after it is interactive
*/
