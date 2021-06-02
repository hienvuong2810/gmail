import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer.js';
import logger from 'redux-logger'
var middleware = [ thunk ];
middleware = [ ...middleware, logger ]

export default createStore(rootReducer, applyMiddleware(...middleware));
