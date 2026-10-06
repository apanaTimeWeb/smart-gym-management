"use client";

// RESPONSIBILITY: Encapsulates all P&L state, sorting, filtering, and derived aggregates.

import { FINANCE_PNL_STATUS_FILTERS } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { ADMIN_FINANCE_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceQueryKeys';
// DATA FLOW: AdminFinanceConstants → useAdminFinancePnlLogic → AdminFinancePnl → child components

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminFinanceApi } from '@/app/frontend_admin/admin_finance/admin_finance_api/AdminFinanceApi';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import type {
  BranchPnlRecord,
  BranchPnlAggregates,
  PnlPeriod,
  PnlStatusFilter,
  PnlSortKey,
  PnlSortDirection,
} from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';
/**
 * @description useAdminFinancePnlLogic: Encapsulates all P&L state, sorting, filtering, and derived aggregates.
 * @dependencies Consumes AdminFinanceQueryKeys, AdminFinanceApi, useAdminLayoutUrlQuerySync, AdminFinanceTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminFinancePnlLogic() {
  const [period, setPeriod] = useState<PnlPeriod>('THIS_MONTH');
  const [statusFilter, setStatusFilter] = useState<PnlStatusFilter>('ALL');
  const [sortKey, setSortKey] = useState<PnlSortKey>('netProfit');
  const [sortDir, setSortDir] = useState<PnlSortDirection>('desc');
  const [expandedBranchId, setExpandedBranchId] = useState<string | null>(null);

  useAdminLayoutUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (value) => setPeriod(value as PnlPeriod) },
    { key: 'status', value: statusFilter, defaultValue: 'ALL', setValue: (value) => setStatusFilter(value as PnlStatusFilter) },
  ]);

  const filteredQuery = useQuery({
    queryKey: ADMIN_FINANCE_QUERY_KEYS.key('pnl', { period, status: statusFilter, sortKey, sortDir }),
    queryFn: () => AdminFinanceApi.fetchBranchPnl(period, { status: statusFilter, sortKey, sortDir }),
  });

  const aggregateQuery = useQuery({
    queryKey: ADMIN_FINANCE_QUERY_KEYS.key('pnl-summary', { period }),
    queryFn: () => AdminFinanceApi.fetchBranchPnl(period),
  });

  const sortedData: BranchPnlRecord[] = filteredQuery.data?.data ?? [];
  const rawData: BranchPnlRecord[] = aggregateQuery.data?.data ?? [];

  const aggregates: BranchPnlAggregates = {
    totalRevenue: rawData.reduce((sum, branch) => sum + branch.revenue, 0),
    totalExpenses: rawData.reduce((sum, branch) => sum + branch.expenses, 0),
    totalNetProfit: rawData.reduce((sum, branch) => sum + branch.netProfit, 0),
    overallMarginPct: rawData.reduce((sum, branch) => sum + branch.revenue, 0) > 0
      ? rawData.reduce((sum, branch) => sum + branch.netProfit, 0) / rawData.reduce((sum, branch) => sum + branch.revenue, 0) * 100
      : 0,
    profitableBranches: rawData.filter((branch) => branch.status === FINANCE_PNL_STATUS_FILTERS.PROFITABLE).length,
    lossMakingBranches: rawData.filter((branch) => branch.status === FINANCE_PNL_STATUS_FILTERS.LOSS).length,
  };

  const isPending = filteredQuery.isPending || aggregateQuery.isPending;
  const isError = filteredQuery.isError || aggregateQuery.isError;
  /** Toggle sort: same key flips direction; new key defaults to desc */
  function handleSort(key: PnlSortKey) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  /** Toggle row expansion; clicking the same row collapses it */
  function toggleExpand(branchId: string) {
    setExpandedBranchId((prev) => (prev === branchId ? null : branchId));
  }

  return {
    period,
    setPeriod,
    statusFilter,
    setStatusFilter,
    sortKey,
    sortDir,
    handleSort,
    expandedBranchId,
    toggleExpand,
    sortedData,
    aggregates,
    isEmpty: sortedData.length === 0,
    isPending,
    isError,
  };
}
