// RESPONSIBILITY: API client for the Superadmin Franchises module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';

const BASE = '/superadmin/franchises';

export const superadminFranchisesApi = {
  fetchFranchises: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SuperadminFranchise[]>>(`${BASE}${q}`);
  },
  fetchFranchiseById: (id: string) =>
    apiFetch<ApiResponse<SuperadminFranchise>>(`${BASE}/${id}`),
  suspendFranchise: (id: string) =>
    apiFetch<ApiResponse<void>>(`${BASE}/${id}/suspend`, { method: 'PATCH' }),
  activateFranchise: (id: string) =>
    apiFetch<ApiResponse<void>>(`${BASE}/${id}/activate`, { method: 'PATCH' }),
};
