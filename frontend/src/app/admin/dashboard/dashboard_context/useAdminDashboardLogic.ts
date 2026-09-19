"use client";
// RESPONSIBILITY: Owns the Admin Dashboard server-state query and keeps date/branch identity in the query key and request.
// DATA FLOW: URL range/date state + Admin branch selector -> Dashboard API -> TanStack Query -> dashboard views.

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { dashboardApi } from '@/app/admin/dashboard/dashboard_api/AdminDashboardApi';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/AdminDashboardTypes';

export function useAdminDashboardLogic(initialData?: DashboardStats | null) {
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const range = searchParams.get('range') || 'this_month';
  const startDate = searchParams.get('startDate') || undefined;
  const endDate = searchParams.get('endDate') || undefined;

  const query = useQuery({
    queryKey: ['admin', 'dashboard', 'stats', { range, startDate, endDate, branchId: selectedBranchId }],
    queryFn: () => dashboardApi.fetchDashboardStats({ range, startDate, endDate, branchId: selectedBranchId === 'all' ? undefined : selectedBranchId }).then((response) => response.data),
    initialData: initialData ?? undefined,
    staleTime: 60 * 1000,
  });

  return {
    stats: query.data ?? null,
    status: query.status,
    error: query.error instanceof Error ? query.error.message : '',
  };
}
