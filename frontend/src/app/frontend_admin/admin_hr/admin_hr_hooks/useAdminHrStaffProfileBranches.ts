// RESPONSIBILITY: Loads Admin branch reference data used by the HR staff profile assignment table.
"use client";
import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrQueryKeys';
// DATA FLOW: AdminBranchesApi → TanStack Query → HR profile view.
import { useQuery } from '@tanstack/react-query';
import type { AdminHrBranchReference } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrBranchReferenceTypes';
import { AdminHrBranchReferenceApi } from '@/app/frontend_admin/admin_hr/admin_hr_api/AdminHrBranchReferenceApi';
/**
 * @description useAdminHrStaffProfileBranches: Loads Admin branch reference data used by the HR staff profile assignment table.
 * @dependencies Consumes AdminHrQueryKeys, AdminHrBranchReferenceTypes, AdminHrBranchReferenceApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminHrStaffProfileBranches(enabled: boolean){
  return useQuery<AdminHrBranchReference[]>({
    queryKey: ADMIN_HR_QUERY_KEYS.key('staff-profile', 'branches'),
    queryFn: () => AdminHrBranchReferenceApi.fetchHrBranchReferences().then((response)=>response.data?.items??[]),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
