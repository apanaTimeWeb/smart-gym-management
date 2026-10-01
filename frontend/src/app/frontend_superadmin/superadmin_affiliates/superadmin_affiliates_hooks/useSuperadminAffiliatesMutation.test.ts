// DATA FLOW: API / URL state / module client state → useSuperadminAffiliatesMutation → superadmin_affiliates view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminAffiliatesMutation } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesMutation';

describe('useSuperadminAffiliatesMutation', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminAffiliatesMutation).toBe('function');
  });
});
