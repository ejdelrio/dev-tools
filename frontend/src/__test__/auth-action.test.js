import {tokenSet, tokenDelete} from '../action/auth-action.js';

describe('Auth Actions', () => {
  test('tokenSet returns a TOKEN_SET action', () => {
    let action = tokenSet({token: 'test token'});
    expect(action.type).toEqual('TOKEN_SET');
    expect(action.payload.token).toBe('test token');
  });

  test('tokenDelete returns a TOKEN_DELETE action', () => {
    let action = tokenDelete();
    expect(action).toEqual({
      type: 'TOKEN_DELETE',
    });
  });
});
