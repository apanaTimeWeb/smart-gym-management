import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminHrLogic } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrLogic';

const searchParams = new URLSearchParams('branchId=b2');
const showToast = vi.fn();
const staffMutations = { isPending: false, saveStaff: vi.fn(), deleteStaff: vi.fn(), toggleStaffStatus: vi.fn() };
const payrollMutations = { isPending: false, savePayroll: vi.fn(), markPayrollPaid: vi.fn(), giveAdvance: vi.fn(), payDue: vi.fn() };
const queries = [
  { data: { data: { staff: [{ id: 's1' }], total: 1 } }, status: 'success', error: null, refetch: vi.fn() },
  { data: { data: { payrolls: [{ id: 'p1' }], total: 1 } }, status: 'success', error: null, refetch: vi.fn() },
  { data: { data: { totalStaff: 1 } }, status: 'success', error: null, refetch: vi.fn() },
];

vi.mock('next/navigation', () => ({ useSearchParams: () => searchParams }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUrlState', () => ({ useAdminHrUrlState: () => ({ search: '', roleFilter: 'All', branchFilter: 'All', currentPage: 1, payrollMonth: '2026-10', debouncedSearch: '', staffSortKey: 'name', staffSortDir: 'asc', payrollSortKey: 'month', payrollSortDir: 'desc' }) }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore', () => ({ useAdminLayoutToastStore: () => ({ showToast }) }));
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrStaffMutations', () => ({ useAdminHrStaffMutations: () => staffMutations }));
vi.mock('@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrPayrollMutations', () => ({ useAdminHrPayrollMutations: () => payrollMutations }));

describe('useAdminHrLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
    queries.forEach((q) => vi.mocked(useQuery).mockReturnValueOnce(q as never));
  });

  it('keeps branch scope in HR query parameters and exposes server-state mutations', () => {
    const uiInputs = { editId: null, setShowModal: vi.fn(), setShowPayrollModal: vi.fn() } as never;
    const { result } = renderHook(() => useAdminHrLogic(uiInputs));
    expect(result.current.staff).toEqual([{ id: 's1' }]);
    expect(result.current.payrolls).toEqual([{ id: 'p1' }]);
    const staffOptions = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[] };
    expect(JSON.stringify(staffOptions.queryKey)).toContain('b2');
    expect(result.current.saveStaff).toBe(staffMutations.saveStaff);
    expect(result.current.savePayroll).toBe(payrollMutations.savePayroll);
  });
});
