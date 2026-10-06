"use client";
// RESPONSIBILITY: Business logic hook for the Payouts module.
import { ADMIN_PAYOUTS_QUERY_KEYS } from '@/app/frontend_admin/admin_payouts/admin_payouts_constants/AdminPayoutsQueryKeys';
// DATA FLOW: feature API/schema → hook/context → useAdminPayoutsLogic consumers.

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AdminPayoutsApi } from '@/app/frontend_admin/admin_payouts/admin_payouts_api/AdminPayoutsApi';
import { useAdminPayoutsStore } from '@/app/frontend_admin/admin_payouts/admin_payouts_store/useAdminPayoutsStore';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { PAYOUTS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_payouts/admin_payouts_constants/AdminPayoutsConstants';
import type { PayoutSortDirection, PayoutSortKey, PnlSortDirection, PnlSortKey } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';
/**
 * @description useAdminPayoutsLogic: Business logic hook for the Payouts module.
 * @dependencies Consumes AdminPayoutsQueryKeys, AdminPayoutsApi, useAdminPayoutsStore, useAdminLayoutUrlQuerySync, AdminPayoutsConstants, AdminPayoutsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminPayoutsLogic() {
  const { activeTab, setActiveTab, monthFilter, setMonthFilter, gymFilter, setGymFilter, statusFilter, setStatusFilter, currentPage, setCurrentPage } = useAdminPayoutsStore();
  const [payoutSortKey, setPayoutSortKey] = useState<PayoutSortKey>('month');
  const [payoutSortDir, setPayoutSortDir] = useState<PayoutSortDirection>('desc');
  const [pnlSortKey, setPnlSortKey] = useState<PnlSortKey>('netProfit');
  const [pnlSortDir, setPnlSortDir] = useState<PnlSortDirection>('desc');
  useAdminLayoutUrlQuerySync([
    { key: 'month', value: monthFilter, defaultValue: '', setValue: useAdminPayoutsStore.getState().setMonthFilter },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: useAdminPayoutsStore.getState().setGymFilter },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: useAdminPayoutsStore.getState().setStatusFilter },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const payoutsQuery = useQuery({
    queryKey: ADMIN_PAYOUTS_QUERY_KEYS.key('list', { month: monthFilter, gymId: gymFilter, status: statusFilter, page: currentPage, limit: PAYOUTS_ITEMS_PER_PAGE, sortKey: payoutSortKey, sortDir: payoutSortDir }),
    queryFn: () => AdminPayoutsApi.fetchPayouts({ month: monthFilter, gymId: gymFilter, status: statusFilter, page: currentPage, limit: PAYOUTS_ITEMS_PER_PAGE, sortKey: payoutSortKey, sortDir: payoutSortDir }),
    staleTime: 1000 * 60 * 5,
  });

  const { data: pnlData = [], isPending: pendingPnl } = useQuery({
    queryKey: ADMIN_PAYOUTS_QUERY_KEYS.key('pnl', { month: monthFilter, gymId: gymFilter, sortKey: pnlSortKey, sortDir: pnlSortDir }),
    queryFn: () => AdminPayoutsApi.fetchPnL({ month: monthFilter, gymId: gymFilter, sortKey: pnlSortKey, sortDir: pnlSortDir }).then((r) => r.data || []),
    staleTime: 1000 * 60 * 5,
  });

  const { data: kpis } = useQuery({
    queryKey: ADMIN_PAYOUTS_QUERY_KEYS.key('kpis', { month: monthFilter, gymId: gymFilter }),
    queryFn: () => AdminPayoutsApi.fetchKPIs({ month: monthFilter, gymId: gymFilter }).then((r) => r.data || null),
    staleTime: 1000 * 60 * 5,
  });

  const payoutsResponse = payoutsQuery.data;
  const status = payoutsQuery.status;

  const filteredPayouts = payoutsResponse?.data ?? [];
  const filteredPnL = pnlData;

  const totalPages = payoutsResponse?.meta?.totalPages ?? Math.max(1, Math.ceil(filteredPayouts.length / PAYOUTS_ITEMS_PER_PAGE));
  const paginatedPayouts = filteredPayouts;


  return {
    activeTab, setActiveTab,
    monthFilter, setMonthFilter,
    gymFilter, setGymFilter,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    status,
    payouts: paginatedPayouts,
    allPayouts: filteredPayouts,
    pnlData: filteredPnL,
    kpis,
    totalPages,
    totalItems: payoutsResponse?.meta?.total ?? filteredPayouts.length,
    pendingPnl,
    payoutSortKey, payoutSortDir,
    onPayoutSort: (key: PayoutSortKey) => { if (payoutSortKey === key) setPayoutSortDir((current: PayoutSortDirection) => current === 'asc' ? 'desc' : 'asc'); else { setPayoutSortKey(key); setPayoutSortDir('desc'); } setCurrentPage(1); },
    pnlSortKey, pnlSortDir,
    onPnlSort: (key: PnlSortKey) => { if (pnlSortKey === key) setPnlSortDir((current: PnlSortDirection) => current === 'asc' ? 'desc' : 'asc'); else { setPnlSortKey(key); setPnlSortDir('desc'); } },
  };
}
