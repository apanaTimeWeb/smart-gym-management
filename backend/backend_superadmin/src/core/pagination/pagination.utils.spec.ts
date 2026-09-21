// RESPONSIBILITY: Verifies canonical pagination metadata behavior for real input cases.
// FLOW: test -> buildPaginationMeta -> exact pagination semantics.
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
describe('buildPaginationMeta', () => {
  it('calculates page boundaries for a filtered result set', () => {
    expect(buildPaginationMeta(2, 25, 51)).toEqual({ page: 2, limit: 25, total: 51, totalPages: 3, hasNext: true, hasPrevious: true });
  });
  it('returns zero total pages for an empty result', () => {
    expect(buildPaginationMeta(1, 25, 0).totalPages).toBe(0);
  });
});
