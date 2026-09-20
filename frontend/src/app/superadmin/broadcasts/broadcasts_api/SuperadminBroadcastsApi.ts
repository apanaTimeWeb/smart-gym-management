import { BroadcastResponseSchema, SuperadminBroadcastsTenantSchema } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
// RESPONSIBILITY: Modularized API client for the Broadcasts module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { BroadcastsUrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Broadcast, BroadcastFormData, SuperadminBroadcastsTenant } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
import { z } from "zod";

import { SuperadminBroadcastDeliveryResultSchema } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastDeliveryTypes';
import type { SuperadminBroadcastDeliveryResult } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastDeliveryTypes';
export const broadcastsApi = {
    fetchBroadcasts: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<Broadcast[]>>(`${BroadcastsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(BroadcastResponseSchema) });
    },
    createBroadcast: (body: BroadcastFormData, idempotencyKey?: string) => apiFetch<ApiResponse<Broadcast>>(BroadcastsUrlConfig.BACKEND_API.BASE, { method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, body: JSON.stringify(body),
        dataSchema: BroadcastResponseSchema
    }),
    deleteBroadcast: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${BroadcastsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.object({}).passthrough()
    }),
    updateBroadcast: (id: string, body: Partial<BroadcastFormData>, idempotencyKey?: string) => apiFetch<ApiResponse<Broadcast>>(`${BroadcastsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, body: JSON.stringify(body),
        dataSchema: BroadcastResponseSchema
    }),
    fetchTenants: () => apiFetch<ApiResponse<SuperadminBroadcastsTenant[]>>(BroadcastsUrlConfig.BACKEND_API.TENANTS, { dataSchema: z.array(SuperadminBroadcastsTenantSchema) }),
    fetchRecipientCount: () => apiFetch<ApiResponse<{
        count: number;
    }>>(`${BroadcastsUrlConfig.BACKEND_API.BASE}/recipient-count`, { dataSchema: z.object({ count: z.number().nonnegative() }) }),
};

export async function deliverBroadcastToRecipient(broadcastId: string, recipientId: string, idempotencyKey?: string): Promise<ApiResponse<SuperadminBroadcastDeliveryResult>> {
    return apiFetch<ApiResponse<SuperadminBroadcastDeliveryResult>>(BroadcastsUrlConfig.BACKEND_API.DELIVER_TO_RECIPIENT(broadcastId, recipientId), {
        method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        body: JSON.stringify({ broadcastId, recipientId }),
        dataSchema: SuperadminBroadcastDeliveryResultSchema,
    });
}
