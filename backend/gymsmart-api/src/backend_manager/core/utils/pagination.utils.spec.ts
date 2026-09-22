// RESPONSIBILITY: Proves canonical pagination metadata semantics.
// FLOW: Test input -> buildPaginationMeta -> exact PaginationMeta contract.
import { buildPaginationMeta } from '@/core/utils/pagination.utils';

describe('buildPaginationMeta', () => {
  it('calculates 1-indexed metadata from the full filtered count', () => {
    expect(buildPaginationMeta(243, 2, 20)).toEqual({ total: 243, page: 2, limit: 20, totalPages: 13, hasNextPage: true, hasPrevPage: true });
  });
});
