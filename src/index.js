import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/root';
import App from './views/App/';

const store = createStore(
  rootReducer,
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
);

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
