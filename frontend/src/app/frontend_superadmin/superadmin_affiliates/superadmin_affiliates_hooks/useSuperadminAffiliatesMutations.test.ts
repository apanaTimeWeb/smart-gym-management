// DATA FLOW: API / URL state / module client state → useSuperadminAffiliatesMutations → superadmin_affiliates view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminAffiliatesMutations } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesMutations';

describe('useSuperadminAffiliatesMutations', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminAffiliatesMutations).toBe('function');
  });
});
