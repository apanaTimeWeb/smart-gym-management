// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: page.tsx (SSR) → AdminDashboardMain → useAdminDashboardLogic
'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/app/admin/dashboard/dashboard_api/dashboard_api';
import type { FetchState, DashboardStats } from '@/app/admin/dashboard/dashboard_types/dashboard_types';
import { useAdminDashboardStore } from '@/app/admin/dashboard/dashboard_store/useAdminDashboardStore';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';

/**
 * Hook to manage dashboard data fetching and network state tracking.
 */
function sanitizeStats(raw: DashboardStats | null | undefined): DashboardStats | undefined {
  if (!raw) return undefined;
  return {
    ...raw,
    membersByPlan: Array.isArray(raw.membersByPlan) ? raw.membersByPlan : [],
    memberGrowth: Array.isArray(raw.memberGrowth) ? raw.memberGrowth : [],
    revenueTrend: Array.isArray(raw.revenueTrend) ? raw.revenueTrend : [],
    branchLeaderboard: Array.isArray(raw.branchLeaderboard) ? raw.branchLeaderboard : [],
    systemAlerts: Array.isArray(raw.systemAlerts) ? raw.systemAlerts : [],
  };
}

export function useAdminDashboardLogic(initialData?: DashboardStats | null) {
  const { timeRange, startDate, endDate } = useAdminDashboardStore();
  const { selectedBranchId } = useAdminGlobalStore();

  const { data, isLoading, isError, error: queryError } = useQuery({
    queryKey: ['adminDashboardStats', timeRange, startDate, endDate, selectedBranchId],
    queryFn: async () => {
      const res = await dashboardApi.fetchDashboardStats(selectedBranchId);
      return sanitizeStats(res.data) ?? res.data;
    },
    initialData: sanitizeStats(initialData),
  });

  const status: FetchState = isLoading ? 'loading' : isError ? 'error' : 'success';

  return {
    stats: data || null,
    status,
    error: isError ? (queryError as Error).message : '',
  };
}

