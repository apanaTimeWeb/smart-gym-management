import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminAttendanceLogic } from '@/app/frontend_admin/admin_attendance/admin_attendance_hooks/useAdminAttendanceLogic';

const setCurrentPage = vi.fn();
const store = { search: 'riya', statusFilter: 'all', branchFilter: 'all', dateRange: 'today', currentPage: 2, setCurrentPage, getState: () => ({ setSearch: vi.fn(), setStatusFilter: vi.fn(), setBranchFilter: vi.fn(), setDateRange: vi.fn() }) };
const queries = [
  { data: { data: [{ id: 'a1' }], meta: { total: 21 } }, status: 'success', error: null, refetch: vi.fn() },
  { data: { data: { present: 20 } }, status: 'success', error: null, refetch: vi.fn() },
  { data: { data: [{ date: '2026-10-05', count: 20 }] }, status: 'success', error: null, refetch: vi.fn() },
];
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('branchId=b2') }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_attendance/admin_attendance_store/useAdminAttendanceStore', () => ({ useAdminAttendanceStore: Object.assign(() => store, { getState: () => store.getState() }) }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync', () => ({ useAdminLayoutUrlQuerySync: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_attendance/admin_attendance_hooks/useAdminAttendanceDebounce', () => ({ useAdminAttendanceDebounce: (value: string) => value }));

describe('useAdminAttendanceLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
    queries.forEach((q) => vi.mocked(useQuery).mockReturnValueOnce(q as never));
  });

  it('maps attendance API state to the view and calculates server-side pagination', () => {
    const { result } = renderHook(() => useAdminAttendanceLogic());
    expect(result.current.records).toEqual([{ id: 'a1' }]);
    expect(result.current.allFilteredCount).toBe(21);
    expect(result.current.totalPages).toBeGreaterThan(1);
    expect(result.current.summary).toEqual({ present: 20 });
    expect(result.current.trend).toEqual([{ date: '2026-10-05', count: 20 }]);
  });
});
