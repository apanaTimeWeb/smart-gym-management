// RESPONSIBILITY: API client for the Admin Branches module.
import { apiFetch } from '@/lib/api';

const BASE = '/admin/branches';

export const adminBranchesApi = {
  fetchBranches: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<import('@/lib/api').ApiResponse<unknown[]>>(`${BASE}${q}`);
  },
  fetchBranchById: (id: string) => apiFetch<import('@/lib/api').ApiResponse<unknown>>(`${BASE}/${id}`),
  createBranch: (body: Record<string, unknown>) =>
    apiFetch<import('@/lib/api').ApiResponse<unknown>>(BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateBranch: (id: string, body: Record<string, unknown>) =>
    apiFetch<import('@/lib/api').ApiResponse<unknown>>(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteBranch: (id: string) =>
    apiFetch<import('@/lib/api').ApiResponse<void>>(`${BASE}/${id}`, { method: 'DELETE' }),
};
