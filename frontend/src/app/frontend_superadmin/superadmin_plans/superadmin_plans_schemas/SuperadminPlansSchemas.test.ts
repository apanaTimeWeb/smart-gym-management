// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { subscriptionPlanSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansSchemas';



describe('subscriptionPlanSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(subscriptionPlanSchema.safeParse({}).success).toBe(false);
  });
});
