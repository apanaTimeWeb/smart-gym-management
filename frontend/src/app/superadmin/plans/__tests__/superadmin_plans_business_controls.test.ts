import { describe, expect, it } from 'vitest';
import { SuperadminPlansV1DataSchema } from '@/app/superadmin/plans/plans_types/SuperadminPlansV1Types';
import { SUPERADMIN_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/superadmin/plans/plans_mocks/fixtures/SuperadminPlansV1MockFixtures';
describe('Plan Comparison & Pricing Control contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminPlansV1DataSchema.safeParse(SUPERADMIN_PLANS_BUSINESS_CONTROLS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
