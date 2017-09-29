import {combineReducers} from 'redux';
import token from './auth.js';
import profile from './profile.js';



module.exports = combineReducers({
  token,
  profile
});
