import { describe, expect, it } from 'vitest';
import { useSuperadminPlansStore } from '@/app/superadmin/saas-billing/plans/plans_store/useSuperadminPlansStore.ts';

describe('useSuperadminPlansStore', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminPlansStore).toBe('function');
  });
});
