import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAdminFinancePnlLogic } from '@/app/frontend_admin/admin_finance/admin_finance_hooks/useAdminFinancePnlLogic';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { useQuery } from '@tanstack/react-query';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync', () => ({ useAdminLayoutUrlQuerySync: vi.fn() }));

const rows: BranchPnlRecord[] = [
  { branchId: 'b1', branchName: 'Alpha', revenue: 200, expenses: 50, netProfit: 150, marginPct: 75, status: 'PROFITABLE' },
  { branchId: 'b2', branchName: 'Beta', revenue: 100, expenses: 70, netProfit: 30, marginPct: 30, status: 'LOSS' },
];

beforeEach(() => {
  vi.clearAllMocks();
  let i = 0;
  vi.mocked(useQuery).mockImplementation(() => ({ data: { data: rows }, isPending: false, isError: false } as never));
});

describe('useAdminFinancePnlLogic', () => {
  it('derives portfolio-level P&L aggregates from server rows', () => {
    const { result } = renderHook(() => useAdminFinancePnlLogic());

    expect(result.current.aggregates.totalRevenue).toBe(300);
    expect(result.current.aggregates.totalExpenses).toBe(120);
    expect(result.current.aggregates.totalNetProfit).toBe(180);
    expect(result.current.aggregates.overallMarginPct).toBe(60);
    expect(result.current.aggregates.profitableBranches).toBe(1);
    expect(result.current.aggregates.lossMakingBranches).toBe(1);
  });

  it('toggles row expansion and sort direction from user interactions', () => {
    const { result } = renderHook(() => useAdminFinancePnlLogic());
    act(() => result.current.toggleExpand('b1'));
    expect(result.current.expandedBranchId).toBe('b1');
    act(() => result.current.toggleExpand('b1'));
    expect(result.current.expandedBranchId).toBeNull();
    act(() => result.current.handleSort('netProfit'));
    expect(result.current.sortDir).toBe('asc');
  });
});
