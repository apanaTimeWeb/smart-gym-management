'use client';
// DATA FLOW: UI range state → Admin Branches API → module-owned MSW transport → TanStack Query.
// RESPONSIBILITY: Owns server-state queries for branch list and branch detail.
import { useQuery } from '@tanstack/react-query';
import { branchesApi } from '@/app/admin/branches/branches_api/AdminBranchesApi';
import type { AdminBranchesTimeRange } from '@/app/admin/branches/branches_types/AdminBranchesTimeRangeTypes';

/** Coordinates BranchesQueries state, data flow, and feature behavior. */
export const useAdminBranchesQueries = (params: { timeRange: AdminBranchesTimeRange; startDate: string; endDate: string }) => {
  const listQuery = useQuery({
    queryKey: ['admin', 'branches', 'list', params],
    queryFn: () => branchesApi.fetchBranches({ range: params.timeRange, startDate: params.startDate, endDate: params.endDate }),
    staleTime: 5 * 60 * 1000,
  });

  return listQuery;
};
