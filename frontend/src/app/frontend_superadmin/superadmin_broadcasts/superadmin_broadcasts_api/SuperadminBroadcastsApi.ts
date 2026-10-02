import { z } from 'zod';
import { SuperadminBroadcastsTenantSchema, BroadcastResponseSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsContractSchemas';
import { SuperadminBroadcastsRecipientCountResponseSchema, SuperadminBroadcastsEmptyResponseSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsApiSchemas';
import { SuperadminBroadcastDeliveryResultSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsBroadcastDeliveryContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBroadcastsApi owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_url_config, @/lib/api, @/lib/api, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes, zod, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastDeliveryTypes, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastDeliveryTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Broadcasts module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_url_config';

import type { SuperadminBroadcastDeliveryResult } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastDeliveryTypes';
import type { Broadcast, BroadcastFormData, SuperadminBroadcastsTenant } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';
import type { ApiResponse } from '@/lib/api';


export const broadcastsApi = {
    fetchBroadcasts: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<Broadcast[]>>(`${MODULE_URLS.BACKEND_API.BASE}${q}`, { dataSchema: z.array(BroadcastResponseSchema) });
    },
    createBroadcast: (body: BroadcastFormData, idempotencyKey: string) => apiFetch<ApiResponse<Broadcast>>(MODULE_URLS.BACKEND_API.BASE, { method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body),
        dataSchema: BroadcastResponseSchema
    }),
    deleteBroadcast: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}`, { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminBroadcastsEmptyResponseSchema
    }),
    updateBroadcast: (id: string, body: Partial<BroadcastFormData>, idempotencyKey: string) => apiFetch<ApiResponse<Broadcast>>(`${MODULE_URLS.BACKEND_API.BASE}/${id}`, { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body),
        dataSchema: BroadcastResponseSchema
    }),
    fetchTenants: () => apiFetch<ApiResponse<SuperadminBroadcastsTenant[]>>(MODULE_URLS.BACKEND_API.TENANTS, { dataSchema: z.array(SuperadminBroadcastsTenantSchema) }),
    fetchRecipientCount: () => apiFetch<ApiResponse<{
        count: number;
    }>>(`${MODULE_URLS.BACKEND_API.BASE}/recipient-count`, { dataSchema: SuperadminBroadcastsRecipientCountResponseSchema }),
};

export async function deliverBroadcastToRecipient(broadcastId: string, recipientId: string, idempotencyKey: string): Promise<ApiResponse<SuperadminBroadcastDeliveryResult>> {
    return apiFetch<ApiResponse<SuperadminBroadcastDeliveryResult>>(MODULE_URLS.BACKEND_API.DELIVER_TO_RECIPIENT(broadcastId, recipientId), {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify({ broadcastId, recipientId }),
        dataSchema: SuperadminBroadcastDeliveryResultSchema,
    });
}
