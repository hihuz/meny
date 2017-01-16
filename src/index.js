import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './utils/localStorage';
import rootReducer from './reducers/root';
import App from './views/App';

const store = createStore(
  rootReducer,
  loadState(),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
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
  document.getElementById('app')
);
