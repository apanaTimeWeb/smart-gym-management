import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_payouts/admin_payouts_hooks/useAdminPayoutsLogic';

const store = { activeTab: 'payouts', setActiveTab: vi.fn(), monthFilter: '2026-10', setMonthFilter: vi.fn(), gymFilter: 'all', setGymFilter: vi.fn(), statusFilter: 'all', setStatusFilter: vi.fn(), currentPage: 1, setCurrentPage: vi.fn(), getState: () => store };
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_payouts/admin_payouts_store/useAdminPayoutsStore', () => ({ useAdminPayoutsStore: Object.assign(() => store, { getState: () => store }) }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync', () => ({ useAdminLayoutUrlQuerySync: vi.fn() }));

describe('useAdminPayoutsLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset()
      .mockReturnValueOnce({ data: { data: [{ id: 'p1' }], meta: { total: 12, totalPages: 2 } }, status: 'success' } as never)
      .mockReturnValueOnce({ data: [{ id: 'pnl1' }], isPending: false } as never)
      .mockReturnValueOnce({ data: { revenue: 500 } } as never);
  });

  it('maps payout/P&L/KPI server data and resets pagination when payout sorting changes', () => {
    const { result } = renderHook(() => useAdminPayoutsLogic());
    expect(result.current.payouts).toEqual([{ id: 'p1' }]);
    expect(result.current.pnlData).toEqual([{ id: 'pnl1' }]);
    expect(result.current.kpis).toEqual({ revenue: 500 });
    act(() => result.current.onPayoutSort('month'));
    expect(result.current.payoutSortDir).toBe('asc');
    expect(store.setCurrentPage).toHaveBeenCalledWith(1);
  });
});
