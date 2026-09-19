// RESPONSIBILITY: Encapsulates functionality for superadmin_branches_api.ts
import { SuperadminBranchSchema } from '@/app/superadmin/branches/branches_types/SuperadminBranchesTypes';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/SuperadminBranchesTypes';
import { BranchesUrlConfig } from '@/app/superadmin/branches/superadmin_branches_url_config';
import { z } from "zod";
export const superadminBranchesApi = {
    fetchBranches: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<SuperadminBranch[]>>(`${BranchesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SuperadminBranchSchema) });
    },
    fetchBranchById: (id: string) => apiFetch<ApiResponse<SuperadminBranch>>(`${BranchesUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: SuperadminBranchSchema }),
    updateBranch: (id: string, body: Partial<SuperadminBranch>, idempotencyKey?: string) => apiFetch<ApiResponse<SuperadminBranch>>(`${BranchesUrlConfig.BACKEND_API.BASE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SuperadminBranchSchema
    }),
    suspendBranch: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${BranchesUrlConfig.BACKEND_API.BASE}/${id}/suspend`, {
        method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.object({}).passthrough()
    }),
    activateBranch: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${BranchesUrlConfig.BACKEND_API.BASE}/${id}/activate`, {
        method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.object({}).passthrough()
    }),
};
