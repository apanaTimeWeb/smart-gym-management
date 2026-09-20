// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';
import { subscriptionPlanSchema } from '@/app/superadmin/saas-billing/plans/plans_utils/SuperadminPlansSchemas';


describe('subscriptionPlanSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(subscriptionPlanSchema.safeParse({}).success).toBe(false);
  });
});
