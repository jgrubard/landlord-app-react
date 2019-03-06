import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import tenant_applications from './tenant_applications';

const reducer = combineReducers({ tenant_applications });

const middleware = applyMiddleware(thunk/* , logger */);
const store = createStore(reducer, middleware);

export default store;

export * from './tenant_applications';