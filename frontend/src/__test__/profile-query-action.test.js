import {createProfileQuery} from '../action/profile-query-action.js';

describe('Profile Query Action', () => {
  test('createProfileQuery returns a PROFILE_QUERY_CREATE action', () => {
    let action = createProfileQuery({query: 'test query'});
    expect(action.type).toEqual('PROFILE_QUERY_CREATE');
    expect(action.payload.query).toBe('test query');
  });
});
