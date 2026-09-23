// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { SettingsFetchSettingsService } from '@/backend_manager/modules/backend_manager/settings/services/settings-fetch-settings.service';

describe('SettingsFetchSettingsService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findSettingsList: jest.fn().mockResolvedValue(expected) };
    const service = new SettingsFetchSettingsService(dependency as never);
    const result = await service.fetchSettings({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findSettingsList).toHaveBeenCalledTimes(1);
    expect(dependency.findSettingsList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findSettingsList: jest.fn().mockRejectedValue(failure) };
    const service = new SettingsFetchSettingsService(dependency as never);
    await expect(service.fetchSettings({} as never)).rejects.toBe(failure);
    expect(dependency.findSettingsList).toHaveBeenCalledTimes(1);
  });
});
