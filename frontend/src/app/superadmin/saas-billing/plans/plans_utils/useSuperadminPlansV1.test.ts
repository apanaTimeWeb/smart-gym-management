import { describe, expect, it } from 'vitest';
import { useSuperadminPlansV1 } from '@/app/superadmin/saas-billing/plans/plans_utils/useSuperadminPlansV1.ts';

describe('useSuperadminPlansV1', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminPlansV1).toBe('function');
  });
});
