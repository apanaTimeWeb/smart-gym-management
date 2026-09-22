// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for SettingsUpdateSettingsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> SettingsUpdateSettingsService.updateSettings -> observable return/delegation.
import { SettingsUpdateSettingsService } from '@/backend_manager/modules/manager/settings/services/settings-update-settings.service';

describe('SettingsUpdateSettingsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'settings' } as const;
    const dependency = { updateSettings: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new SettingsUpdateSettingsService(dependency as never);
    const result = await service.updateSettings({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.updateSettings as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
