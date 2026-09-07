// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: page.tsx (SSR) → AdminDashboardMain → useAdminDashboardLogic
'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/app/admin/dashboard/dashboard_api/dashboard_api';
import type { FetchState, DashboardStats } from '@/app/admin/dashboard/dashboard_types/dashboard_types';
import { useAdminDashboardStore } from '@/app/admin/dashboard/dashboard_store/useAdminDashboardStore';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';

export function useAdminDashboardLogic(initialData?: DashboardStats | null) {
  const { timeRange, startDate, endDate } = useAdminDashboardStore();
  const { selectedBranchId } = useAdminGlobalStore();

  const { data, isLoading, isError, error: queryError } = useQuery({
    queryKey: ['adminDashboardStats', timeRange, startDate, endDate, selectedBranchId],
    queryFn: () => dashboardApi.fetchDashboardStats(selectedBranchId).then(r => r.data),
    initialData: initialData ?? undefined,
  });

  const status: FetchState = isLoading ? 'loading' : isError ? 'error' : 'success';

  return {
    stats: data ?? null,
    status,
    error: isError ? (queryError as Error).message : '',
  };
}

