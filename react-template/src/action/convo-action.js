import superagent from 'superagent';

export const fetchConvo = convos => ({
  type: 'CONVERSATION_FETCH',
  payload: convos
})

export const createConvo = conversation => ({
  type: 'CONVERSATION_CREATE',
  payload: conversation
})

export const convoDelete = conversation => ({
  type: 'CONVERSATION_DELETE',
  payload: conversation
})

export const requestConvos = () => (dispatch, getState) => {
  let {token} = getState();

  return superagent.get(`${__API_URL__}/api/conversations`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    dispatch(fetchConvo(res.body));
    return res;
  })
  .catch(err => console.error(err));
}

export const newConvo = data => (dispatch, getState) => {
  let {socket} = getState();
  socket.emit('startConvo', data);
}
