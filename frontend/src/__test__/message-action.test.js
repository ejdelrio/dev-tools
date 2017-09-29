import {messageCreate} from '../action/message-action.js';

describe('Message Actions', () => {
  test('messageCreate returns a MESSAGE_CREATE action', () => {
    let action = messageCreate({message: 'test message'});
    expect(action.type).toEqual('MESSAGE_CREATE');
    expect(action.payload.message).toBe('test message');
  });
});
