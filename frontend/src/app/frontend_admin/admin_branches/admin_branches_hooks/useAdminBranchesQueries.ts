"use client";
// RESPONSIBILITY: Owns server-state queries for branch list and branch detail.
import { ADMIN_BRANCHES_QUERY_KEYS } from '@/app/frontend_admin/admin_branches/admin_branches_constants/AdminBranchesQueryKeys';
// DATA FLOW: UI range state → Admin Branches API → module-owned MSW transport → TanStack Query.
import { useQuery } from '@tanstack/react-query';
import { AdminBranchesApi } from '@/app/frontend_admin/admin_branches/admin_branches_api/AdminBranchesApi';
import type { AdminBranchesTimeRange } from '@/app/frontend_admin/admin_branches/admin_branches_types/AdminBranchesTimeRangeTypes';
/**
 * @description useAdminBranchesQueries: Owns server-state queries for branch list and branch detail.
 * @dependencies Consumes AdminBranchesQueryKeys, AdminBranchesApi, AdminBranchesTimeRangeTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminBranchesQueries = (params: { timeRange: AdminBranchesTimeRange; startDate: string; endDate: string }) => {
  const listQuery = useQuery({
    queryKey: ADMIN_BRANCHES_QUERY_KEYS.key('list', params),
    queryFn: () => AdminBranchesApi.fetchBranches({ range: params.timeRange, startDate: params.startDate, endDate: params.endDate }),
    staleTime: 5 * 60 * 1000,
  });

  return listQuery;
};
