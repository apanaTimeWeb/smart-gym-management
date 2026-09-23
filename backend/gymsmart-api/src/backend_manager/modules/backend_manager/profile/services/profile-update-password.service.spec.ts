// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ProfileUpdatePasswordService } from '@/backend_manager/modules/backend_manager/profile/services/profile-update-password.service';

describe('ProfileUpdatePasswordService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateProfileById: jest.fn().mockResolvedValue(expected) };
    const service = new ProfileUpdatePasswordService(dependency as never);
    const result = await service.updatePassword({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateProfileById).toHaveBeenCalledTimes(1);
    expect(dependency.updateProfileById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateProfileById: jest.fn().mockRejectedValue(failure) };
    const service = new ProfileUpdatePasswordService(dependency as never);
    await expect(service.updatePassword({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateProfileById).toHaveBeenCalledTimes(1);
  });
});
