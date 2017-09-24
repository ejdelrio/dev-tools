import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';

const createAppStore = () => {
  return createAppStore(reducer, applyMiddleware());
}

module.exports = createAppStore;
