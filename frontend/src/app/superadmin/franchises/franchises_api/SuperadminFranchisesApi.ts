import { SuperadminFranchiseSchema } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesTypes';
// RESPONSIBILITY: API client for the Superadmin Franchises module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesTypes';
import { FranchisesUrlConfig } from '@/app/superadmin/franchises/superadmin_franchises_url_config';
import { z } from "zod";
export const superadminFranchisesApi = {
    fetchFranchises: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SuperadminFranchise[]>>(`${FranchisesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SuperadminFranchiseSchema) });
    },
    fetchFranchiseById: (id: string) => apiFetch<ApiResponse<SuperadminFranchise>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: SuperadminFranchiseSchema }),
    suspendFranchise: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}/suspend`, { method: 'POST', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.object({}).passthrough()
    }),
    activateFranchise: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}/activate`, { method: 'POST', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.object({}).passthrough()
    }),
    updateFranchise: (id: string, body: Partial<SuperadminFranchise>, idempotencyKey?: string) => apiFetch<ApiResponse<SuperadminFranchise>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SuperadminFranchiseSchema
    }),
};
