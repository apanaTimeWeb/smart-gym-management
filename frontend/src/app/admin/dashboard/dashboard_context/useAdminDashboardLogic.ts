"use client";
// RESPONSIBILITY: Custom hook managing the asynchronous fetching of dashboard statistics.
// DATA FLOW: page.tsx (SSR) → AdminDashboardMain → useAdminDashboardLogic

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { dashboardApi } from '@/app/admin/dashboard/dashboard_api/AdminDashboardApi';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/AdminDashboardTypes';

export function useAdminDashboardLogic(initialData?: DashboardStats | null) {
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || 'this_month';

  const query = useQuery({
    queryKey: ['admin', 'dashboard', 'stats', range],
    queryFn: () => dashboardApi.fetchDashboardStats(range).then(r => r.data),
    initialData: initialData ?? undefined,
    staleTime: Infinity,
  });

  const status = query.status;
  const data = query.data;
  const isError = query.isError;
  const queryError = query.error;

  return {
    stats: data ?? null,
    status,
    error: isError ? (queryError as Error).message : '',
  };
}