import superagent from 'superagent';
import SocketIOClient from 'socket.io-client';


export const socketSet = socket => ({
  type: 'SOCKET_SET',
  payload: socket
});

export const socketDelete = () => ({
  type: 'SOCKET_DELETE'
});

export const connectSocket = () => (dispatch, getState) => {
  let {socket, profile} = getState();
  
  if(!socket && profile) {
    let socket = SocketIOClient(__API_URL__);
    dispatch(socketSet(socket));
  }

}
