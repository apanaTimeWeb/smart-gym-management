import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_fixtures/SuperadminSettingsV1MockFixtures';
import { resetSuperadminSettingsMockState } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_mocks/superadmin_settings_mocks_handlers/SuperadminSettingsMockHandlers';
import { SuperadminSettingsV1DataSchema } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_schemas/SuperadminSettingsV1ContractSchemas';


beforeEach(() => {
  resetSuperadminSettingsMockState();
});

describe('Platform Governance contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminSettingsV1DataSchema.safeParse(SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
