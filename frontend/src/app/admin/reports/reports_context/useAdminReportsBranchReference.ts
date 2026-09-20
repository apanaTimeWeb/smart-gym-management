"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin reports UI without cross-module imports.
// DATA FLOW: AdminReportsBranchReferenceApi → TanStack Query → Admin reports component.
import { useQuery } from '@tanstack/react-query';
import { AdminReportsBranchReferenceApi } from '@/app/admin/reports/reports_api/AdminReportsBranchReferenceApi';
/** Coordinates ReportsBranchReference state, data flow, and feature behavior. */
export function useAdminReportsBranchReference() {
  return useQuery({ queryKey: ['admin','reports','branch-reference'], queryFn: async () => (await AdminReportsBranchReferenceApi.fetchReportBranchReferences()).data ?? [], staleTime: 300000 });
}
