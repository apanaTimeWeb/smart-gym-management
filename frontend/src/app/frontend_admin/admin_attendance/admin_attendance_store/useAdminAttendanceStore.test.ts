import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminAttendanceStore } from '@/app/frontend_admin/admin_attendance/admin_attendance_store/useAdminAttendanceStore';

describe('useAdminAttendanceStore', () => {
  beforeEach(() => useAdminAttendanceStore.setState({ currentPage: 4, search: '', statusFilter: 'all', branchFilter: 'all', dateRange: 'today' }));

  it('resets pagination when the search changes', () => {
    useAdminAttendanceStore.getState().setSearch('Ravi');
    expect(useAdminAttendanceStore.getState()).toMatchObject({ search: 'Ravi', currentPage: 1 });
  });

  it('resets pagination when a status, branch, or date filter changes', () => {
    const store = useAdminAttendanceStore.getState();
    store.setStatusFilter('present');
    expect(useAdminAttendanceStore.getState().currentPage).toBe(1);
    useAdminAttendanceStore.setState({ currentPage: 3 });
    store.setBranchFilter('branch-2');
    expect(useAdminAttendanceStore.getState().currentPage).toBe(1);
    useAdminAttendanceStore.setState({ currentPage: 2 });
    store.setDateRange('this_week');
    expect(useAdminAttendanceStore.getState().currentPage).toBe(1);
  });

  it('stores visible column preferences without touching server state', () => {
    useAdminAttendanceStore.getState().setVisibleColumns(['Member', 'Status']);
    expect(useAdminAttendanceStore.getState().visibleColumns).toEqual(['Member', 'Status']);
  });
});
