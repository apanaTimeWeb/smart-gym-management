import { branchSchema } from '@/app/admin/branches/branches_types/branches_schemas';
// RESPONSIBILITY: Provides strongly-typed API interactions for Admin Branches, following the verb contract.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Branch } from '@/app/admin/branches/branches_types/branches_types';
import { z } from "zod";

export const branchesApi = {
  fetchBranches: async () => {
            return apiFetch<ApiResponse<z.infer<typeof branchSchema>[]>>('/api/admin/adminBranches/fetchBranches', { method: 'GET', dataSchema: z.array(branchSchema) });
        },
};
