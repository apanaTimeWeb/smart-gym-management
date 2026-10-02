import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsV1MockFixtures';
import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers';
import { resetSuperadminGymsMockState as resetV1MockState } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsV1MockHandlers';
import { SuperadminGymsV1DataSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsV1ContractSchemas';


beforeEach(() => {
  resetSuperadminGymsMockState();
});

beforeEach(() => {
  resetV1MockState();
});

describe('Tenant Growth & Bulk Controls contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGymsV1DataSchema.safeParse(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
