import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';

import store from './store';

const Root = () => (
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
console.log('X1', store)
ReactDOM.render(<Root />, document.getElementById('app'));
