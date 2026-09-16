import { branchSchema } from '@/app/admin/branches/branches_types/AdminBranchesSchemas';
// RESPONSIBILITY: Provides strongly-typed API interactions for Admin Branches, following the verb contract.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminBranchesUrlConfig } from '@/app/admin/branches/admin_branches_url_config';
import { z } from "zod";

export const branchesApi = {
  fetchBranches: async () => {
            return apiFetch<ApiResponse<z.infer<typeof branchSchema>[]>>(`${AdminBranchesUrlConfig.api.base}/fetchBranches`, { method: 'GET', dataSchema: z.array(branchSchema) });
        },
};
