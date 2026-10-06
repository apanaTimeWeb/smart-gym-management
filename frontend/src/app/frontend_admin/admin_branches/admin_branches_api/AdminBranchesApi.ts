// RESPONSIBILITY: Owns the typed HTTP contract for the Admin Branches list and branch-detail reads.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_BRANCHES_API } from '@/app/frontend_admin/admin_branches/admin_branches_url_config';
import { branchSchema } from '@/app/frontend_admin/admin_branches/admin_branches_schemas/AdminBranchesSchemas';
import type { Branch } from '@/app/frontend_admin/admin_branches/admin_branches_types/AdminBranchesTypes';

export const AdminBranchesApi = {
  fetchBranches: async (params?: { range?: string; startDate?: string; endDate?: string }) => {
    const search = new URLSearchParams();
    if (params?.range) search.set('range', params.range);
    if (params?.startDate) search.set('startDate', params.startDate);
    if (params?.endDate) search.set('endDate', params.endDate);
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiFetch<ApiResponse<Branch[]>>(`${ADMIN_BRANCHES_API.base}${suffix}`, { method: 'GET', dataSchema: branchSchema.array() });
  },
  fetchBranchDetail: async (branchId: string) =>
    apiFetch<ApiResponse<Branch>>(ADMIN_BRANCHES_API.detail(branchId), { method: 'GET', dataSchema: branchSchema }),
};
