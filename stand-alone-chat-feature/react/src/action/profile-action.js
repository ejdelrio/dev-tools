import superagent from 'superagent';
import * as socketActions from './socket-action.js';



export const createProfile = profile => ({
  type: 'PROFILE_CREATE',
  payload: profile
});

export const updateProfile = profile => ({
  type: 'PROFILE_UPDATE',
  payload: profile
})

export const deleteProfile = () => ({
  type: 'PROFILE_DELETE'
})

export const postProfile = profile => (dispatch, getState) => {
  let {token} = getState();

  superagent.post(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${token}`)
  .send(profile)
  .end((err, res) => {
    if(err) console.error(err);
    dispatch(createProfile(res.body));
    dispatch(socketActions.connectSocket());
    return res;
  })
}

export const getProfile = () => (dispatch, getState) => {
  let {token} = getState();

  superagent.get(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${token}`)
  .end((err, res) => {
    if (err) console.error(err);
    dispatch(createProfile(res.body));
    dispatch(socketActions.connectSocket());
    return res;
  })
}
