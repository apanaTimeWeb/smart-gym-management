import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminMembersLogic } from '@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersLogic';

const store = {
  search: 'riya', statusFilter: 'active', branchFilter: 'all', expiryFilter: 'all', genderFilter: 'all', planFilter: 'all', currentPage: 2, setCurrentPage: vi.fn(),
  getState: () => ({ setSearch: vi.fn(), setStatusFilter: vi.fn(), setBranchFilter: vi.fn(), setExpiryFilter: vi.fn() }),
};
const queries = [
  { data: { data: [{ id: 'm1', name: 'Riya' }], meta: { total: 25 } }, status: 'success' },
  { data: { data: { totalMembers: 25 } }, status: 'success' },
  { data: { data: { id: 'm7', name: 'Other' } }, status: 'success' },
];
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('branchId=b2&memberId=m7') }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn(), useQueryClient: () => ({ invalidateQueries: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_members/admin_members_store/useAdminMembersStore', () => ({ useAdminMembersStore: Object.assign(() => store, { getState: () => store.getState() }) }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync', () => ({ useAdminLayoutUrlQuerySync: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersDebounce', () => ({ useAdminMembersDebounce: (value: string) => value }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService', () => ({ adminToast: { success: vi.fn(), error: vi.fn() } }));

describe('useAdminMembersLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
    queries.forEach((q) => vi.mocked(useQuery).mockReturnValueOnce(q as never));
  });

  it('keeps branch/resource identity in list and detail queries and exposes paginated data', () => {
    const { result } = renderHook(() => useAdminMembersLogic());
    expect(result.current.members).toEqual([{ id: 'm1', name: 'Riya' }]);
    expect(result.current.allFilteredCount).toBe(25);
    expect(result.current.totalPages).toBeGreaterThan(1);
    expect(result.current.selectedMember).toEqual({ id: 'm7', name: 'Other' });
    const listQuery = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[] };
    expect(JSON.stringify(listQuery.queryKey)).toContain('b2');
  });
});
