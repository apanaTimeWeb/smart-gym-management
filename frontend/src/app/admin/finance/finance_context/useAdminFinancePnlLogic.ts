"use client";
// RESPONSIBILITY: Encapsulates all P&L state, sorting, filtering, and derived aggregates.
// DATA FLOW: AdminFinancePnlConstants → useAdminFinancePnlLogic → AdminFinancePnlMain → child components

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/app/admin/finance/finance_api/AdminFinanceApi';
import { useAdminUrlQuerySync } from '@/app/admin/admin_layout/admin_utils/useAdminUrlQuerySync';
import type {
  BranchPnlRecord,
  BranchPnlAggregates,
  PnlPeriod,
  PnlStatusFilter,
  PnlSortKey,
  PnlSortDirection,
} from '@/app/admin/finance/finance_types/AdminFinanceTypes';

/**
 * Custom hook for the Branch P&L Comparison page.
 * Handles period selection, status filtering, column sorting, row expansion,
 * and derives aggregate KPI values from the filtered dataset.
 */
export function useAdminFinancePnlLogic() {
  const [period, setPeriod] = useState<PnlPeriod>('THIS_MONTH');
  const [statusFilter, setStatusFilter] = useState<PnlStatusFilter>('ALL');
  const [sortKey, setSortKey] = useState<PnlSortKey>('netProfit');
  const [sortDir, setSortDir] = useState<PnlSortDirection>('desc');
  const [expandedBranchId, setExpandedBranchId] = useState<string | null>(null);

  useAdminUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (value) => setPeriod(value as PnlPeriod) },
    { key: 'status', value: statusFilter, defaultValue: 'ALL', setValue: (value) => setStatusFilter(value as PnlStatusFilter) },
  ]);

  const filteredQuery = useQuery({
    queryKey: ['admin', 'finance', 'pnl', { period, status: statusFilter, sortKey, sortDir }],
    queryFn: () => financeApi.fetchBranchPnl(period, { status: statusFilter, sortKey, sortDir }),
  });

  const aggregateQuery = useQuery({
    queryKey: ['admin', 'finance', 'pnl-summary', { period }],
    queryFn: () => financeApi.fetchBranchPnl(period),
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
    profitableBranches: rawData.filter((branch) => branch.status === 'PROFITABLE').length,
    lossMakingBranches: rawData.filter((branch) => branch.status === 'LOSS').length,
  };

  const isLoading = filteredQuery.isLoading || aggregateQuery.isLoading;
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
    isLoading,
    isError,
  };
}