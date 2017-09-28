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
