// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { SettingsUpdateSettingsService } from '@/backend_manager/modules/backend_manager/settings/services/settings-update-settings.service';

describe('SettingsUpdateSettingsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateSettingsById: jest.fn().mockResolvedValue(expected) };
    const service = new SettingsUpdateSettingsService(dependency as never);
    const result = await service.updateSettings({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateSettingsById).toHaveBeenCalledTimes(1);
    expect(dependency.updateSettingsById).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateSettingsById: jest.fn().mockRejectedValue(failure) };
    const service = new SettingsUpdateSettingsService(dependency as never);
    await expect(service.updateSettings({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateSettingsById).toHaveBeenCalledTimes(1);
  });
});
