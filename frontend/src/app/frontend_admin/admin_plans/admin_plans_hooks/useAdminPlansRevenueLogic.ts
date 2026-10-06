"use client";
// RESPONSIBILITY: Query and control logic for the Admin Plan Revenue page.
import { ADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_admin/admin_plans/admin_plans_constants/AdminPlansQueryKeys';
import { PLANS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_plans/admin_plans_constants/AdminPlansConstants';
// DATA FLOW: URL/query controls → AdminPlansApi → module-owned MSW → Query cache → view.
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminPlansApi } from '@/app/frontend_admin/admin_plans/admin_plans_api/AdminPlansApi';
import { useAdminPlansDebounce } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansDebounce';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import type { PlanRevenueRecord, RevenueAggregates, RevenuePeriod, RevenueSortDirection, RevenueSortKey } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTypes';
/**
 * @description useAdminPlansRevenueLogic: Query and control logic for the Admin Plan Revenue page.
 * @dependencies Consumes AdminPlansQueryKeys, AdminPlansApi, useAdminLayoutDebounce, useAdminLayoutUrlQuerySync, AdminPlansRevenueTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminPlansRevenueLogic() {
  const [period, setPeriod] = useState<RevenuePeriod>('THIS_MONTH');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<RevenueSortKey>('totalRevenue');
  const [sortDir, setSortDir] = useState<RevenueSortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useAdminPlansDebounce(searchQuery, 300);

  useAdminLayoutUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (value) => setPeriod(value as RevenuePeriod) },
    { key: 'search', value: searchQuery, defaultValue: '', setValue: (val) => setSearchQuery(val as string) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const query = useQuery({
    queryKey: ADMIN_PLANS_QUERY_KEYS.key('revenue', { period, search: debouncedSearch, sortKey, sortDir, page: currentPage, limit: PLANS_ITEMS_PER_PAGE }),
    queryFn: () => AdminPlansApi.fetchPlanRevenue(period, { search: debouncedSearch, sortKey, sortDir, page: currentPage, limit: PLANS_ITEMS_PER_PAGE }),
  });
  const revenueData = query.data?.data ?? [];
  const handleSort = (key: RevenueSortKey) => { if (sortKey === key) setSortDir((prev) => prev === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('desc'); } setCurrentPage(1); };
  const aggregates = useMemo<RevenueAggregates>(() => {
    const source = query.data?.data ?? [];
    if (!source.length) return { totalRevenue: 0, totalSubscriptions: 0, avgRenewalRate: 0, topPerformingPlanName: '—' };
    return source.reduce((acc, row) => ({
      totalRevenue: acc.totalRevenue + row.totalRevenue,
      totalSubscriptions: acc.totalSubscriptions + row.activeSubscriptions,
      avgRenewalRate: acc.avgRenewalRate + row.renewalRate,
      topPerformingPlanName: row.totalRevenue > (source.find((item) => item.planName === acc.topPerformingPlanName)?.totalRevenue ?? -1) ? row.planName : acc.topPerformingPlanName,
    }), { totalRevenue: 0, totalSubscriptions: 0, avgRenewalRate: 0, topPerformingPlanName: source[0]!.planName });
  }, [query.data?.data]);
  const avgRenewalRate = revenueData.length ? aggregates.avgRenewalRate / revenueData.length : 0;
  return { period, setPeriod, searchQuery, setSearchQuery, sortKey, sortDir, handleSort, sortedData: revenueData as PlanRevenueRecord[], aggregates: { ...aggregates, avgRenewalRate }, isPending: query.isPending, isError: query.isError, currentPage, setCurrentPage, totalPages: query.data?.meta?.totalPages ?? 1, totalItems: query.data?.meta?.total ?? 0 };
}
