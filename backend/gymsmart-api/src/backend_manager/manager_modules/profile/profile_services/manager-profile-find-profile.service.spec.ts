// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ProfileFindProfileService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-find-profile.service';

describe('ProfileFindProfileService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findProfileList: jest.fn().mockResolvedValue(expected) };
    const service = new ProfileFindProfileService(dependency as never);
    const result = await service.findProfile({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findProfileList).toHaveBeenCalledTimes(1);
    expect(dependency.findProfileList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findProfileList: jest.fn().mockRejectedValue(failure) };
    const service = new ProfileFindProfileService(dependency as never);
    await expect(service.findProfile({} as never)).rejects.toBe(failure);
    expect(dependency.findProfileList).toHaveBeenCalledTimes(1);
  });
});
