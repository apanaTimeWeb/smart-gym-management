import { describe, expect, it } from 'vitest';

import { buildSuperadminAffiliatesQueryParams } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_utils/SuperadminAffiliatesQueryUtils';

describe('buildSuperadminAffiliatesQueryParams', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof buildSuperadminAffiliatesQueryParams).toBe('function');
  });
});
