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
  let {socket} = getState();
  if(!socket && profile) {
    let socket = SocketIOClient(__API_URL__);

    socket.on(`updateConvos-${userName}`, convo => {
      dispatch(convoActions.createConvo(convo));
    })
    socket.on(`newMessage-${userName}` , msg => {
      console.log('__NEW_MESSAGE__:', msg)
      dispatch(msgActions.messageCreate(msg));
    })

    dispatch(socketSet(socket));
  }

}
