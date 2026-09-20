import { describe, expect, it } from 'vitest';
import { buildSuperadminAffiliatesQueryParams } from '@/app/superadmin/affiliates/affiliates_utils/SuperadminAffiliatesQueryUtils.ts';

describe('buildSuperadminAffiliatesQueryParams', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof buildSuperadminAffiliatesQueryParams).toBe('function');
  });
});
