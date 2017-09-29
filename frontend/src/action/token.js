import superagent from 'superagent';
import * as util from '../lib/util.js';

export const login = (token) => ({
  type: 'LOGIN',
  payload: token
})

export const logout = () => ({
  type: 'LOGOUT'
})