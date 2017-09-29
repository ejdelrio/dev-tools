import {login, logout} from '../action/token.js';

describe('Token Actions', () => {
  test('login returns a LOGIN action', () => {
    let action = login({token: 'test token'});
    expect(action.type).toEqual('LOGIN');
    expect(action.payload.token).toBe('test token');
  });

  test('logout returns a LOGOUT action', () => {
    let action = logout();
    expect(action.type).toEqual('LOGOUT');
  });
});
