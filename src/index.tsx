///<reference path="refs.d.ts" />

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import app from './reducers';

let appRoot = document.getElementById('react-root');
let store = createStore(app);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  appRoot
);
