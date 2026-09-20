import { resetSuperadminSettingsMockState } from '@/app/superadmin/settings/settings_mocks/handlers/SuperadminSettingsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE } from '@/app/superadmin/settings/settings_mocks/fixtures/SuperadminSettingsV1MockFixtures';

beforeEach(() => {
  resetSuperadminSettingsMockState();
});

describe('Superadmin Settings module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE).toBeDefined();
    const serialized = JSON.stringify(SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
