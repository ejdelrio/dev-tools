import {combineReducers} from 'redux';
import token from './auth.js';
import socket from './socket.js';
import conversation from './conversation.js';
import profile from './profile.js';
import messages from './message.js';
import profileQuery from './profile-query.js';
import booking from './booking.js';

module.exports = combineReducers({
  token,
  socket,
  profile,
  conversation,
  messages,
  profileQuery,
  booking
});
