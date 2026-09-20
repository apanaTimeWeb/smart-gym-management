import { describe, expect, it } from 'vitest';
import { useSuperadminPlansList } from '@/app/superadmin/saas-billing/plans/plans_components/useSuperadminPlansList.ts';

describe('useSuperadminPlansList', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminPlansList).toBe('function');
  });
});
