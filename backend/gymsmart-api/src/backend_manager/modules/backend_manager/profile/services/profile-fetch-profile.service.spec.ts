// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ProfileFetchProfileService } from '@/backend_manager/modules/backend_manager/profile/services/profile-fetch-profile.service';

describe('ProfileFetchProfileService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findProfileList: jest.fn().mockResolvedValue(expected) };
    const service = new ProfileFetchProfileService(dependency as never);
    const result = await service.fetchProfile({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findProfileList).toHaveBeenCalledTimes(1);
    expect(dependency.findProfileList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findProfileList: jest.fn().mockRejectedValue(failure) };
    const service = new ProfileFetchProfileService(dependency as never);
    await expect(service.fetchProfile({} as never)).rejects.toBe(failure);
    expect(dependency.findProfileList).toHaveBeenCalledTimes(1);
  });
});
