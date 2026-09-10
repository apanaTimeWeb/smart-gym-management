// RESPONSIBILITY: React Query hook for fetching admin branches from the real API.
// Rule 3B: No static mock data — all data comes from the backend via apiFetch.
'use client';

import { useQuery } from '@tanstack/react-query';
import { adminBranchesApi } from '@/app/admin/admin_api/admin_branches_api';
import type { Branch } from '@/app/admin/admin_store/useAdminGlobalStore';

export const useAdminBranchesData = () => {
  return useQuery({
    queryKey: ['admin', 'branches'],
    queryFn: async () => {
      const res = await adminBranchesApi.fetchBranches();
      return (res.data ?? []) as Branch[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes — branches change infrequently
  });
};
