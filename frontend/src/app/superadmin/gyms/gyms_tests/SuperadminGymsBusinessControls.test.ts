import { resetSuperadminGymsMockState } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { resetSuperadminGymsMockState } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsV1MockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminGymsV1DataSchema } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';
import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymsV1MockFixtures';
beforeEach(() => {
  resetSuperadminGymsMockState();
});

beforeEach(() => {
  resetSuperadminGymsMockState();
});

describe('Tenant Growth & Bulk Controls contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGymsV1DataSchema.safeParse(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
