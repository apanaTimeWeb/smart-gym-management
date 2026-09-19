import { resetSuperadminGymsMockState } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminGymDetailDataSchema } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailTypes';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymDetailMockFixtures';
beforeEach(() => {
  resetSuperadminGymsMockState();
});

describe('Gym 360 Overview contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGymDetailDataSchema.safeParse(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t1);
        expect(result.success).toBe(true);
    });
});
