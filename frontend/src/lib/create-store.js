import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from './thunk.js';
import reporter from './reporter.js';

const createAppStore = () => {
  return createStore(reducer, applyMiddleware(reporter, thunk));
};

module.exports = createAppStore;
