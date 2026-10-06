import { describe, expect, it } from 'vitest';

import { buildSuperadminAffiliatesQueryParams } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_utils/SuperadminAffiliatesQueryUtils';



describe('buildSuperadminAffiliatesQueryParams', () => {
  it('includes pagination and active filters explicitly', () => {
    expect(buildSuperadminAffiliatesQueryParams({ searchQuery: 'fit', statusFilter: 'ACTIVE' as never, startDate: '2026-10-01', endDate: '2026-10-02', currentPage: 2, pageLimit: 25 })).toEqual({ page: '2', limit: '25', search: 'fit', status: 'ACTIVE', startDate: '2026-10-01', endDate: '2026-10-02' });
  });

  it('omits the canonical ALL status filter', () => {
    expect(buildSuperadminAffiliatesQueryParams({ searchQuery: '', statusFilter: 'ALL' as never, startDate: '', endDate: '', currentPage: 1, pageLimit: 20 })).toEqual({ page: '1', limit: '20' });
  });
});
