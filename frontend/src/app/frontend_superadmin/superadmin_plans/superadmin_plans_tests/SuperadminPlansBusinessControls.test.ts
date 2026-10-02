import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_mocks/superadmin_plans_mocks_fixtures/SuperadminPlansV1MockFixtures';
import { resetSuperadminPlansMockState } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_mocks/superadmin_plans_mocks_handlers/SuperadminPlansMockHandlers';
import { SuperadminPlansV1DataSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansV1ContractSchemas';


beforeEach(() => {
  resetSuperadminPlansMockState();
});

describe('Plan Comparison & Pricing Control contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminPlansV1DataSchema.safeParse(SUPERADMIN_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
