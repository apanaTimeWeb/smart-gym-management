// RESPONSIBILITY: API client for the Superadmin Franchises module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';
import { FranchisesUrlConfig } from '@/app/superadmin/franchises/franchises_url_config';
import { z } from "zod";

export const superadminFranchisesApi = {
  fetchFranchises: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<SuperadminFranchise[]>>(`${FranchisesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.unknown() });
  },
  fetchFranchiseById: (id: string) =>
    apiFetch<ApiResponse<SuperadminFranchise>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: z.unknown() }),
  suspendFranchise: (id: string) =>
    apiFetch<ApiResponse<void>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}/suspend`, { method: 'POST',
        dataSchema: z.unknown()
    }),
  activateFranchise: (id: string) =>
    apiFetch<ApiResponse<void>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}/activate`, { method: 'POST',
        dataSchema: z.unknown()
    }),
  updateFranchise: (id: string, body: Partial<SuperadminFranchise>) =>
    apiFetch<ApiResponse<SuperadminFranchise>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: z.unknown()
    }),
};
