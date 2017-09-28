import superagent from 'superagent';
import SocketIOClient from 'socket.io-client';
import * as msgActions from './message-action.js';
import * as convoActions from './convo-action.js';

export const socketSet = socket => ({
  type: 'SOCKET_SET',
  payload: socket
});

export const socketDelete = () => ({
  type: 'SOCKET_DELETE'
});

export const connectSocket = profile => (dispatch, getState) => {
  let userName = profile.userName;
  let {socket, profile} = getState();
  if(!socket && profile) {
    let socket = SocketIOClient(__API_URL__);

    dispatch(socketSet(socket));
  }

}
