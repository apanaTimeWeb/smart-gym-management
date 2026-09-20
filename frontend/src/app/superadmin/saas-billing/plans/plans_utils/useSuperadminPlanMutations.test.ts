import { describe, expect, it } from 'vitest';
import { useSuperadminPlanMutations } from '@/app/superadmin/saas-billing/plans/plans_utils/useSuperadminPlanMutations.ts';

describe('useSuperadminPlanMutations', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminPlanMutations).toBe('function');
  });
});
