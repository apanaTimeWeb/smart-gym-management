import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { AdminBranchesApi } from '@/app/frontend_admin/admin_branches/admin_branches_api/AdminBranchesApi';
import { useAdminBranchesQueries } from '@/app/frontend_admin/admin_branches/admin_branches_hooks/useAdminBranchesQueries';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_branches/admin_branches_api/AdminBranchesApi', () => ({ AdminBranchesApi: { fetchBranches: vi.fn() } }));

describe('useAdminBranchesQueries', () => {
  it('builds the branch-list query from the supplied time window', () => {
    const queryResult = { data: { data: [{ id: 'b1' }] }, isPending: false, isError: false, refetch: vi.fn() };
    vi.mocked(useQuery).mockReturnValue(queryResult as never);

    const params = { timeRange: 'THIS_MONTH' as never, startDate: '2026-10-01', endDate: '2026-10-05' };
    const { result } = renderHook(() => useAdminBranchesQueries(params));

    expect(result.current).toBe(queryResult);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: expect.any(Array),
      staleTime: 5 * 60 * 1000,
      queryFn: expect.any(Function),
    }));
  });
});
