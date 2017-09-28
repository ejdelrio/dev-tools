import {combineReducers} from 'redux';
import token from './auth.js';
import socket from './socket.js';
import profile from './profile.js';


module.exports = combineReducers({
  token,
  socket,
  profile,
});
