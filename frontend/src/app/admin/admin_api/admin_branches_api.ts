// RESPONSIBILITY: Provides strongly-typed API interactions for Admin Branches, following the verb contract.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Branch } from '@/app/admin/admin_store/useAdminGlobalStore';
import { z } from "zod";

export const adminBranchesApi = {
  fetchBranches: async () => {
            return apiFetch('/api/admin/adminBranches/fetchBranches', { method: 'GET', dataSchema: z.unknown() });
        },
};
