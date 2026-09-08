// RESPONSIBILITY: Logic layer for the Plan Revenue dashboard. Handles fetching, filtering, and aggregation.
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { plansApi } from '@/app/admin/plans/plans_api/plans_api';
import type { 
  PlanRevenueRecord, 
  RevenuePeriod, 
  RevenueSortKey, 
  RevenueSortDirection,
  RevenueAggregates
} from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

export function useAdminPlansRevenueLogic() {
  const [period, setPeriod] = useState<RevenuePeriod>('THIS_MONTH');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<RevenueSortKey>('totalRevenue');
  const [sortDir, setSortDir] = useState<RevenueSortDirection>('desc');

  const { data: rawResponse, isLoading, isError } = useQuery({
    queryKey: ['admin_plans_revenue', period],
    queryFn: () => plansApi.fetchPlanRevenue(period),
  });

  const revenueData = rawResponse?.data || [];

  const handleSort = (key: RevenueSortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc'); // Default new sort to desc
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return revenueData;
    const lowerQ = searchQuery.toLowerCase();
    return revenueData.filter(r => 
      r.planName.toLowerCase().includes(lowerQ) || 
      r.tier.toLowerCase().includes(lowerQ)
    );
  }, [revenueData, searchQuery]);

  const sortedData = useMemo(() => {
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

  const aggregates = useMemo<RevenueAggregates>(() => {
    if (revenueData.length === 0) {
      return {
        totalRevenue: 0,
        totalSubscriptions: 0,
        avgRenewalRate: 0,
        topPerformingPlanName: 'N/A',
      };
    }

    let revenue = 0;
    let subscriptions = 0;
    let rateSum = 0;
    let topPlan = revenueData[0]!;

    for (const r of revenueData) {
      revenue += r.totalRevenue;
      subscriptions += r.activeSubscriptions;
      rateSum += r.renewalRate;
      if (r.totalRevenue > topPlan.totalRevenue) {
        topPlan = r;
      }
    }

    return {
      totalRevenue: revenue,
      totalSubscriptions: subscriptions,
      avgRenewalRate: rateSum / revenueData.length,
      topPerformingPlanName: topPlan.planName,
    };
  }, [revenueData]);

  return {
    period,
    setPeriod,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDir,
    handleSort,
    sortedData,
    aggregates,
    isLoading,
    isError,
  };
}
