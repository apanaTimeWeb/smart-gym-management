import { describe, expect, it } from 'vitest';
import { SuperadminGymDetailV1DataSchema } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailV1Types';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURE } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymDetailV1MockFixtures';
describe('Gym 360 Overview contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGymDetailV1DataSchema.safeParse(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
