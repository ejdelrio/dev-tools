import {fetchConvo, createConvo, convoDelete} from '../action/convo-action.js';

describe('Convo Actions', () => {
  test('createConvo returns a CONVERSATION_CREATE action', () => {
    let action = createConvo({conversation: 'test conversation'});
    expect(action.type).toEqual('CONVERSATION_CREATE');
    expect(action.payload.conversation).toBe('test conversation');
  });

  test('fetchConvo returns a CONVERSATION_FETCH action', () => {
    let convos = {convos: 'test convos'};
    let action = fetchConvo(convos);
    expect(action).toEqual({
      type: 'CONVERSATION_FETCH',
      payload: convos
    });
  });

  test('convoDelete returns a CONVERSATION_DELETE action', () => {
    let conversation = {conversation: 'test conversation'};
    let action = convoDelete(conversation);
    expect(action).toEqual({
      type: 'CONVERSATION_DELETE',
      payload: conversation
    });
  });
});
