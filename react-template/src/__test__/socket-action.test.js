import {socketSet, socketDelete} from '../action/socket-action.js';

describe('Socket Actions', () => {
  test('socketSet returns a SOCKET_SET action', () => {
    let action = socketSet({socket: 'test socket'});
    expect(action.type).toEqual('SOCKET_SET');
    expect(action.payload.socket).toBe('test socket');
  });

  test('socketDelete returns a SOCKET_DELETE action', () => {
    let action = socketDelete();
    expect(action).toEqual({
      type: 'SOCKET_DELETE'
    });
  });
});
