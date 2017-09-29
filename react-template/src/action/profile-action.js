import superagent from 'superagent';
import * as socketActions from './socket-action.js';
import * as bookingActions from './booking-action.js';


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

export const getProfile = () => (dispatch, getState) => {
  let {token} = getState();

  return superagent.get(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    if(res.body) {
      dispatch(createProfile(res.body));
      dispatch(socketActions.connectSocket(res.body));
      dispatch(bookingActions.requestFetchBookings());
      return res;
    }
    return null;
  })
}

export const putProfile = profile => (dispatch, getState) => {
  let {token} = getState();

  return superagent.put(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${token}`)
  .send(profile)
  .then(res => {
    dispatch(updateProfile(res.body));
    return res;
  });
}

export const postProfile = profile => (dispatch, getState) => {
  let {token} = getState();
  return superagent.post(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${token}`)
  .send(profile)
  .then(res => {
    if(res.body) {
      dispatch(createProfile(res.body));
      dispatch(socketActions.connectSocket(res.body));
      return res;
    }
  })
  .catch(err => err);
}

export const updateLocation = () => (dispatch, getState) => {
  let {token} = getState();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(position => {
      let {coords} = position;
      resolve([coords.longitude, coords.latitude]);
    })
  })
  .then(location => {
    return superagent.put(`${__API_URL__}/api/profile`)
    .set('Authorization', `Bearer ${token}`)
    .send({location})
  })
  .then(res => {
    dispatch(updateProfile(res.body));
    return res;
  });
}

export const userQuery = (max, genre, limit=10) => (dispatch, getState) => {
  let {token} = getState();
  return superagent.get(`${__API_URL__}/api/userQuery/${max}/${limit}`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    console.log(res.body);
  });
}

export const updateAvatar = file => (dispatch, getState) => {
  let {token} = getState();
  console.log(file)
  return superagent.post(`${__API_URL__}/api/avatar`)
  .set('Authorization', `Bearer ${token}`)
  .attach('image', file)
  .end((error, res) => {
    if(error) return console.error(error);
    dispatch(updateProfile(res.body));
  })
}
