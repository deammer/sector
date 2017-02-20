import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as createLogger from 'redux-logger';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import mainReducer from './reducers';

const initialState: {} = {};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger({ collapsed: true });

// Route definitions
const routes: {} = [{
  childRoutes: [
    // require('./routes/AdZonesCreate'),
    // require('./routes/AdZonesListing'),
    // require('./routes/AdZonesEdit'),
    // require('./routes/InventoryCreate'),
    // require('./routes/InventoryListing'),
    // require('./routes/InventoryEdit'),
    // require('./routes/Login'),
  ],
  component: require('./container/gameContainer').default,
  path: '/',
}];

const store = createStore(mainReducer, initialState, composeEnhancers(
  applyMiddleware(thunk, logger)
));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('application')
);
