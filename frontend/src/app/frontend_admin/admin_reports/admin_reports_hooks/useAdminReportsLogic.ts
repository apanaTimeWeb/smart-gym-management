"use client";

// RESPONSIBILITY: Owns Reports server queries and export mutations while the page components remain view-only.

import { ADMIN_REPORTS_QUERY_KEYS } from '@/app/frontend_admin/admin_reports/admin_reports_constants/AdminReportsQueryKeys';
// DATA FLOW: URL/store filters → TanStack Query → report API → typed data; export action → mutation → feedback/file.

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { AdminReportsApi } from '@/app/frontend_admin/admin_reports/admin_reports_api/AdminReportsApi';
import { useAdminReportsMutations } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsMutations';
import { useAdminReportsStore } from '@/app/frontend_admin/admin_reports/admin_reports_store/useAdminReportsStore';
import type { AdminReportsExportFormat, ReportDateRange } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';
/**
 * @description useAdminReportsLogic: Owns Reports server queries and export mutations while the page components remain view-only.
 * @dependencies Consumes AdminReportsQueryKeys, AdminReportsApi, useAdminReportsMutations, useAdminReportsStore, AdminReportsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminReportsLogic() {
  const searchParams = useSearchParams();
  const dateRange = (searchParams.get('range') as ReportDateRange) || 'this_month';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const { activeTab, selectedGymId } = useAdminReportsStore();

  const reportQuery = useQuery({
    queryKey: ADMIN_REPORTS_QUERY_KEYS.key('list', dateRange, startDate, endDate, selectedGymId),
    queryFn: () => AdminReportsApi.fetchReportData({ from: startDate, to: endDate, branchId: selectedGymId }).then(r => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const { exportMutation, exportReport } = useAdminReportsMutations();

  const handleExport = async (format: AdminReportsExportFormat) => {
    if (!startDate || !endDate) return;
    await exportReport({ type: activeTab, format, from: startDate, to: endDate, branchId: selectedGymId });
  };

  return { reportData: reportQuery.data ?? null, status: reportQuery.status, exportStatus: exportMutation.status, handleExport };
}
