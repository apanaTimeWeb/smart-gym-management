// RESPONSIBILITY: React Query hook for managing the server state of admin branches.
'use client';

import { useQuery } from '@tanstack/react-query';
import { adminBranchesApi } from '@/app/admin/admin_api/admin_branches_api';

export const useAdminBranchesData = () => {
  return useQuery({
    queryKey: ['admin', 'branches'],
    queryFn: async () => {
      const res = await adminBranchesApi.fetchBranches();
      return res.data; // Because fetchBranches returns ApiResponse<Branch[]>
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
