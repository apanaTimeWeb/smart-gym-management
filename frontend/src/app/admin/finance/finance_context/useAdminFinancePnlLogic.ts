// RESPONSIBILITY: Encapsulates all P&L state, sorting, filtering, and derived aggregates.
// DATA FLOW: AdminFinancePnlConstants → useAdminFinancePnlLogic → AdminFinancePnlMain → child components
'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/app/admin/finance/finance_api/finance_api';
import type {
  BranchPnlRecord,
  BranchPnlAggregates,
  PnlPeriod,
  PnlStatusFilter,
  PnlSortKey,
  PnlSortDirection,
} from '@/app/admin/finance/finance_types/finance_types';

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

  const { data: rawDataResponse, isLoading, isError } = useQuery({
    queryKey: ['admin', 'finance', 'pnl', period],
    queryFn: () => financeApi.fetchBranchPnl(period),
  });

  // Raw data for selected period
  const rawData: BranchPnlRecord[] = useMemo(() => {
    return rawDataResponse?.data || [];
  }, [rawDataResponse]);

  // Apply status filter
  const filteredData = useMemo<BranchPnlRecord[]>(() => {
    if (statusFilter === 'ALL') return rawData;
    return rawData.filter((b) => b.status === statusFilter);
  }, [rawData, statusFilter]);

  // Apply sort
  const sortedData = useMemo<BranchPnlRecord[]>(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredData, sortKey, sortDir]);

  // Derived aggregates over the FULL (unfiltered) raw data for KPI cards
  const aggregates = useMemo<BranchPnlAggregates>(() => {
    const totalRevenue  = rawData.reduce((s, b) => s + b.revenue, 0);
    const totalExpenses = rawData.reduce((s, b) => s + b.expenses, 0);
    const totalNetProfit = rawData.reduce((s, b) => s + b.netProfit, 0);
    const overallMarginPct = totalRevenue > 0 ? (totalNetProfit / totalRevenue) * 100 : 0;
    const profitableBranches  = rawData.filter((b) => b.status === 'PROFITABLE').length;
    const lossMakingBranches  = rawData.filter((b) => b.status === 'LOSS').length;
    return { totalRevenue, totalExpenses, totalNetProfit, overallMarginPct, profitableBranches, lossMakingBranches };
  }, [rawData]);

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
