// RESPONSIBILITY: API client for the Superadmin Branches module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';

const BASE = '/superadmin/branches';

export const superadminBranchesApi = {
  fetchBranches: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SuperadminBranch[]>>(`${BASE}${q}`);
  },
  fetchBranchById: (id: string) =>
    apiFetch<ApiResponse<SuperadminBranch>>(`${BASE}/${id}`),
  updateBranch: (id: string, body: Partial<SuperadminBranch>) =>
    apiFetch<ApiResponse<SuperadminBranch>>(`${BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  suspendBranch: (id: string) =>
    apiFetch<ApiResponse<void>>(`${BASE}/${id}/suspend`, { method: 'PATCH' }),
  activateBranch: (id: string) =>
    apiFetch<ApiResponse<void>>(`${BASE}/${id}/activate`, { method: 'PATCH' }),
};
