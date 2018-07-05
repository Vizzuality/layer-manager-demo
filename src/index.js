import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './page/index';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(thunk);
const store = createStore(
  reducers,
  composeEnhancers(middlewares)
);

const App = () => (
  <Provider store={store}>
    <Page />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();