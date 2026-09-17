"use client";
// RESPONSIBILITY: Query and control logic for the Admin Plan Revenue page.
// DATA FLOW: URL/query controls → AdminPlansApi → module-owned MSW → Query cache → view.
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { plansApi } from '@/app/admin/plans/plans_api/AdminPlansApi';
import { useDebounce } from '@/app/admin/admin_utils/useAdminDebounce';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import type { PlanRevenueRecord, RevenueAggregates, RevenuePeriod, RevenueSortDirection, RevenueSortKey } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import { ADMIN_ITEMS_PER_PAGE } from '@/app/admin/admin_url_config';

export function useAdminPlansRevenueLogic() {
  const [period, setPeriod] = useState<RevenuePeriod>('THIS_MONTH');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<RevenueSortKey>('totalRevenue');
  const [sortDir, setSortDir] = useState<RevenueSortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useAdminUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (value) => setPeriod(value as RevenuePeriod) },
    { key: 'search', value: searchQuery, defaultValue: '', setValue: setSearchQuery },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const query = useQuery({
    queryKey: ['admin', 'plans', 'revenue', { period, search: debouncedSearch, sortKey, sortDir, page: currentPage, limit: ADMIN_ITEMS_PER_PAGE }],
    queryFn: () => plansApi.fetchPlanRevenue(period, { search: debouncedSearch, sortKey, sortDir, page: currentPage, limit: ADMIN_ITEMS_PER_PAGE }),
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
  return { period, setPeriod, searchQuery, setSearchQuery, sortKey, sortDir, handleSort, sortedData: revenueData as PlanRevenueRecord[], aggregates: { ...aggregates, avgRenewalRate }, isLoading: query.isLoading, isError: query.isError, currentPage, setCurrentPage, totalPages: query.data?.meta?.totalPages ?? 1, totalItems: query.data?.meta?.total ?? 0 };
}
