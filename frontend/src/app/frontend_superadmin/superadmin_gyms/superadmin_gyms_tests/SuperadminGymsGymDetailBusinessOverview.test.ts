import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsGymDetailMockFixtures';
import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers';
import { SuperadminGymDetailDataSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsGymDetailContractSchemas';


beforeEach(() => {
  resetSuperadminGymsMockState();
});

describe('Gym 360 Overview contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGymDetailDataSchema.safeParse(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t1);
        expect(result.success).toBe(true);
    });
});
