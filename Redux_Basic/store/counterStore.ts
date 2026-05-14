import { createStore, applyMiddleware } from 'redux';
import countReducer from '../reducer/countReducer';
import logger from 'redux-logger';

const counterStore = createStore(countReducer,applyMiddleware(logger));

export default counterStore;