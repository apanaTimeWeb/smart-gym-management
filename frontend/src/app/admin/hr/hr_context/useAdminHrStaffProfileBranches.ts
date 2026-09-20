"use client";
// RESPONSIBILITY: Loads Admin branch reference data used by the HR staff profile assignment table.
// DATA FLOW: AdminBranchesApi → TanStack Query → HR profile view.
import { useQuery } from '@tanstack/react-query';
import type { AdminHrBranchReference } from '@/app/admin/hr/hr_types/AdminHrBranchReferenceTypes';
import { AdminHrBranchReferenceApi } from '@/app/admin/hr/hr_api/AdminHrBranchReferenceApi';
/** Coordinates HrStaffProfileBranches state, data flow, and feature behavior. */
export function useAdminHrStaffProfileBranches(enabled: boolean){
  return useQuery<AdminHrBranchReference[]>({
    queryKey: ['admin','hr','staff-profile','branches'],
    queryFn: () => AdminHrBranchReferenceApi.fetchHrBranchReferences().then((response)=>response.data??[]),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
