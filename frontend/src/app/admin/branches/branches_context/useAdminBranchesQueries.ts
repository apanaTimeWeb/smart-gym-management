"use client";
// DATA FLOW: feature API/schema → hook/context → useAdminBranchesQueries consumers.
// RESPONSIBILITY: React Query hook for fetching admin branches from the real API.
// Rule 3B: No static mock data — all data comes from the backend via apiFetch.

import { useQuery } from '@tanstack/react-query';
import { branchesApi } from '@/app/admin/branches/branches_api/branches_api';
import type { Branch } from '@/app/admin/branches/branches_types/branches_types';

export const useAdminBranchesQueries = () => {
  return useQuery({
    queryKey: ['admin', 'branches'],
    queryFn: async () => {
      const res = await branchesApi.fetchBranches();
      return (res.data ?? []) as Branch[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes — branches change infrequently
  });
};