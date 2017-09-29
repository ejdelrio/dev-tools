
export const messageCreate = message => ({
  type: 'MESSAGE_CREATE',
  payload: message
});

export const emitSocketMessage = message => (dispatch, getState) => {
  let {socket} = getState();

  socket.emit('addMessagetoConvo', message);
}
