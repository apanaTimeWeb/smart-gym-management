import * as moduleUnderTest from '@/app/frontend_manager/manager_settings/manager_settings_hooks/useManagerSettingsMutations';

describe('useManagerSettingsMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerSettingsMutations).toBe('function');
  });
});
