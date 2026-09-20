import { describe, expect, it } from 'vitest';
import { useSuperadminAffiliatesMutation } from '@/app/superadmin/affiliates/affiliates_utils/useSuperadminAffiliatesMutation.ts';

describe('useSuperadminAffiliatesMutation', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminAffiliatesMutation).toBe('function');
  });
});
