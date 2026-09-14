import { SuperadminBranchSchema } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';
import { BranchesUrlConfig } from '@/app/superadmin/branches/branches_url_config';
import { z } from "zod";

export const superadminBranchesApi = {
  fetchBranches: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SuperadminBranch[]>>(`${BranchesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SuperadminBranchSchema) });
  },
  fetchBranchById: (id: string) =>
    apiFetch<ApiResponse<SuperadminBranch>>(`${BranchesUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: SuperadminBranchSchema }),
  updateBranch: (id: string, body: Partial<SuperadminBranch>) =>
    apiFetch<ApiResponse<SuperadminBranch>>(`${BranchesUrlConfig.BACKEND_API.BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: SuperadminBranchSchema
    }),
  suspendBranch: (id: string) =>
    apiFetch<ApiResponse<void>>(`${BranchesUrlConfig.BACKEND_API.BASE}/${id}/suspend`, {
      method: 'POST',
        dataSchema: z.object({}).passthrough()
    }),
  activateBranch: (id: string) =>
    apiFetch<ApiResponse<void>>(`${BranchesUrlConfig.BACKEND_API.BASE}/${id}/activate`, {
      method: 'POST',
        dataSchema: z.object({}).passthrough()
    }),
};
