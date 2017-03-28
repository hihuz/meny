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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('content')
);


/*
TODO :
// RecipePage.js :
- add animation / transition to the floating actions

- Refactor the components to be more reusable

- Add some tooltips to commonly used icons, most notably in RecipePage

- Add a modal component to add confirmation on important actions, mostly this will be
  for the "Delete recipe" action for now

- Add.js : add some sort of markdown / formatting for the textareas
  Right now not even the line breaks are showing :c

- Add.js : add transition + delay for error messages so that they don't appear instantly ?

- Add.js / RecipePage.js : fix InputListForm up / down buttons range

- addForm.js / actions : change "name" param to "field" ?

// Browse.js :
- add first to last / last to first settings for triage
- add triage by rating (later)
- add pagination of results ?

- Change avatar (also in menu items) to use image instead of background image maybe ?
- Add transition delay as inline style for user menu items
- Convert the NavBar to be dynamic based off route
- add "fake" loader as top bar (http://ricostacruz.com/nprogress/)
- Add a <form> html element to the Landing page header so that enter navigates to "browse"

- add actual auth using firebase
- use firebase rest api instead of sdk to save client bytes,
  and also extract all the firebase logic to a "service"

// Add.js :
- Fix the "e" key reseting the numeric field ?

// RecipePage.js :
- Maybe provide a way to undo changes ? this would most likely require redux undo-redo

- Maybe add an object level to the way "recipe" is passed as props in the views components
  so that I don't have to specify all the props around explicitely..
  This doesn't seem that easy right now or even that useful, see later

- for images check out cloudinary
- polish the ux, animations, transition between routes..
  look at reactcsstransitiongroup & react motion
- add html-webpack-plugin to generate the html file, check that the bundle output is working
  wherever it is uploaded
- add extract text plugin for the css, update my webpack config in that regard
- Service Worker : check offline-plugin for webpack (check reference from kent c. dodds)
- For production build, look at adding these plugins (and maybe others) :
    babel-plugin-transform-react-remove-prop-types
    babel-plugin-lodash
    lodash-webpack-plugin
- Check the thread on twitter with sean larkin helping reduce bundle size for others
- Try to see if I can cache the recipes for offline and only update the modified records,
  check localforage, redux persist..
  localforage looks good
- find some improvements to start downloading other common routes :
  this should be automatic with offline-plugin / service worker (otherwise try prefetch plugin)
  from the landing page after it is interactive
*/
