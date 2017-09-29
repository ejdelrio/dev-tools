import {createProfile, updateProfile, deleteProfile} from '../action/profile-action.js';

describe('Profile Actions', () => {
  test('createProfile returns a PROFILE_CREATE action', () => {
    let action = createProfile({profile: 'test profile'});
    expect(action.type).toEqual('PROFILE_CREATE');
    expect(action.payload.profile).toBe('test profile');
  });

  test('updateProfile returns a PROFILE_UPDATE action', () => {
    let profile = {profile: 'test profile'};
    let action = updateProfile(profile);
    expect(action).toEqual({
      type: 'PROFILE_UPDATE',
      payload: profile
    });
  });

  test('deleteProfile returns a PROFILE_DELETE action', () => {
    let profile = {profile: 'test profile'};
    let action = deleteProfile(profile);
    expect(action).toEqual({
      type: 'PROFILE_DELETE',
    });
  });
});
