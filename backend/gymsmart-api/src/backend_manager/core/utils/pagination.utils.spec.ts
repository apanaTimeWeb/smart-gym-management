// RESPONSIBILITY: Owns backend core co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

describe('buildPaginationMeta', () => {
  it('calculates 1-indexed metadata from the full filtered count', () => {
    expect(buildPaginationMeta(243, 2, 20)).toEqual({ total: 243, page: 2, limit: 20, totalPages: 13, hasNextPage: true, hasPrevPage: true });
  });
});
