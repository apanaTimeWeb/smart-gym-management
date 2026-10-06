"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin reports UI without cross-module imports.
import { ADMIN_REPORTS_QUERY_KEYS } from '@/app/frontend_admin/admin_reports/admin_reports_constants/AdminReportsQueryKeys';
// DATA FLOW: AdminReportsBranchReferenceApi → TanStack Query → Admin reports component.
import { useQuery } from '@tanstack/react-query';
import { AdminReportsBranchReferenceApi } from '@/app/frontend_admin/admin_reports/admin_reports_api/AdminReportsBranchReferenceApi';
/**
 * @description useAdminReportsBranchReference: Provides minimal branch options to the Admin reports UI without cross-module imports.
 * @dependencies Consumes AdminReportsQueryKeys, AdminReportsBranchReferenceApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminReportsBranchReference() {
  return useQuery({ queryKey: ADMIN_REPORTS_QUERY_KEYS.key('branch-reference'), queryFn: async () => (await AdminReportsBranchReferenceApi.fetchReportBranchReferences()).data?.items ?? [], staleTime: 300000 });
}
