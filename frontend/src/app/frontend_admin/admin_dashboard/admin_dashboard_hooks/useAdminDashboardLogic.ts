"use client";

// RESPONSIBILITY: Owns the Admin Dashboard server-state query and keeps date/branch identity in the query key and request.

import { ADMIN_DASHBOARD_QUERY_KEYS } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_constants/AdminDashboardQueryKeys';
// DATA FLOW: URL range/date state + Admin branch selector -> Dashboard API -> TanStack Query -> dashboard views.

import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { AdminDashboardApi } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_api/AdminDashboardApi';
/**
 * @description useAdminDashboardLogic: Owns the Admin Dashboard server-state query and keeps date/branch identity in the query key and request.
 * @dependencies Consumes AdminDashboardQueryKeys, AdminLayoutBackendMessage, AdminDashboardApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminDashboardLogic() {
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const range = searchParams.get('range') || 'this_month';
  const startDate = searchParams.get('startDate') || undefined;
  const endDate = searchParams.get('endDate') || undefined;

  const query = useQuery({
    queryKey: ADMIN_DASHBOARD_QUERY_KEYS.key('stats', { range, startDate, endDate, branchId: selectedBranchId }),
    queryFn: () => AdminDashboardApi.fetchDashboardStats({ range, startDate, endDate, branchId: selectedBranchId === 'all' ? undefined : selectedBranchId }).then((response) => response.data),
    staleTime: 60 * 1000,
  });

  return {
    stats: query.data ?? null,
    status: query.status,
    error: getAdminBackendMessage(query.error) ?? '',
  };
}
