// RESPONSIBILITY: Owns the typed HTTP contract for the Admin Branches list and branch-detail reads.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminBranchesUrlConfig } from '@/app/admin/branches/admin_branches_url_config';
import { branchSchema } from '@/app/admin/branches/branches_types/AdminBranchesSchemas';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';

export const branchesApi = {
  fetchBranches: async (params?: { range?: string; startDate?: string; endDate?: string }) => {
    const search = new URLSearchParams();
    if (params?.range) search.set('range', params.range);
    if (params?.startDate) search.set('startDate', params.startDate);
    if (params?.endDate) search.set('endDate', params.endDate);
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiFetch<ApiResponse<Branch[]>>(`${AdminBranchesUrlConfig.api.base}${suffix}`, { method: 'GET', dataSchema: branchSchema.array() });
  },
  fetchBranchDetail: async (branchId: string) =>
    apiFetch<ApiResponse<Branch>>(AdminBranchesUrlConfig.api.detail(branchId), { method: 'GET', dataSchema: branchSchema }),
};
