"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin hr UI without cross-module imports.
import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrQueryKeys';
// DATA FLOW: AdminHrBranchReferenceApi → TanStack Query → Admin hr component.
import { useQuery } from '@tanstack/react-query';
import { AdminHrBranchReferenceApi } from '@/app/frontend_admin/admin_hr/admin_hr_api/AdminHrBranchReferenceApi';
/**
 * @description useAdminHrBranchReference: Provides minimal branch options to the Admin hr UI without cross-module imports.
 * @dependencies Consumes AdminHrQueryKeys, AdminHrBranchReferenceApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminHrBranchReference() {
  return useQuery({ queryKey: ADMIN_HR_QUERY_KEYS.key('branch-reference'), queryFn: async () => (await AdminHrBranchReferenceApi.fetchHrBranchReferences()).data?.items ?? [], staleTime: 300000 });
}
