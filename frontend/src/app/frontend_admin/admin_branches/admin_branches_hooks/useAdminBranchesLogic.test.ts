import { BRANCH_STATUS } from '@/app/frontend_admin/admin_branches/admin_branches_constants/AdminBranchesConstants';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminBranchesLogic } from '@/app/frontend_admin/admin_branches/admin_branches_hooks/useAdminBranchesLogic';

const store = {
  timeRange: 'this_month', startDate: '2026-10-01', endDate: '2026-10-05', search: 'alpha', statusFilter: 'all', selectedBranchId: null, detailView: null,
  setSearch: vi.fn(), setStatusFilter: vi.fn(), setTimeRange: vi.fn(), setStartDate: vi.fn(), setEndDate: vi.fn(), setSelectedBranchId: vi.fn(), setDetailView: vi.fn(),
};
const listQuery = { data: { data: [{ id: 'b1', name: 'Alpha Gym', location: 'Noida', branchCode: 'A1', status: BRANCH_STATUS.ACTIVE }, { id: 'b2', name: 'Beta Gym', location: 'Delhi', branchCode: 'B1', status: BRANCH_STATUS.INACTIVE }] }, isPending: false, isError: false, refetch: vi.fn(), status: 'success' };
const detailQuery = { data: undefined, isPending: false, isError: false, refetch: vi.fn(), status: 'idle', error: null };

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_branches/admin_branches_store/useAdminBranchesStore', () => ({ useAdminBranchesStore: () => store }));
vi.mock('@/app/frontend_admin/admin_branches/admin_branches_hooks/useAdminBranchesQueries', () => ({ useAdminBranchesQueries: () => listQuery }));

describe('useAdminBranchesLogic', () => {
  beforeEach(() => {
    Object.values(store).forEach((value) => { if (typeof value === 'function') (value as ReturnType<typeof vi.fn>).mockReset(); });
    vi.mocked(useQuery).mockReturnValue(detailQuery as never);
  });

  it('filters branch rows from the module store and opens/closes the selected detail', () => {
    const { result } = renderHook(() => useAdminBranchesLogic());
    expect(result.current.branches.map((branch) => branch.id)).toEqual(['b1']);
    act(() => result.current.openDetail(listQuery.data.data[0], 'overview' as never));
    expect(store.setSelectedBranchId).toHaveBeenCalledWith('b1');
    expect(store.setDetailView).toHaveBeenCalledWith('overview');
    act(() => result.current.closeDetail());
    expect(store.setSelectedBranchId).toHaveBeenCalledWith(null);
    expect(store.setDetailView).toHaveBeenCalledWith(null);
  });
});
