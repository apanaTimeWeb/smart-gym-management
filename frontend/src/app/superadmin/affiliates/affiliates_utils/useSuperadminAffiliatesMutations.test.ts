import { describe, expect, it } from 'vitest';
import { useSuperadminAffiliatesMutations } from '@/app/superadmin/affiliates/affiliates_utils/useSuperadminAffiliatesMutations.ts';

describe('useSuperadminAffiliatesMutations', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminAffiliatesMutations).toBe('function');
  });
});
