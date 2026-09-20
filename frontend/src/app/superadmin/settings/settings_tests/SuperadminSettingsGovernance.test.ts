import { resetSuperadminSettingsMockState } from '@/app/superadmin/settings/settings_mocks/handlers/SuperadminSettingsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminSettingsV1DataSchema } from '@/app/superadmin/settings/settings_types/SuperadminSettingsV1Types';
import { SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE } from '@/app/superadmin/settings/settings_mocks/fixtures/SuperadminSettingsV1MockFixtures';
beforeEach(() => {
  resetSuperadminSettingsMockState();
});

describe('Platform Governance contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminSettingsV1DataSchema.safeParse(SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
