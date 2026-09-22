// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for SettingsFetchSettingsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> SettingsFetchSettingsService.fetchSettings -> observable return/delegation.
import { SettingsFetchSettingsService } from '@/backend_manager/modules/manager/settings/services/settings-fetch-settings.service';

describe('SettingsFetchSettingsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'settings' } as const;
    const dependency = { fetchSettings: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new SettingsFetchSettingsService(dependency as never);
    const result = await service.fetchSettings({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchSettings as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
