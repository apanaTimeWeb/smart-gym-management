// RESPONSIBILITY: Provides API access for the Superadmin WhatsApp bulk center; MSW owns demo responses.
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminWhatsAppBulkCenterDataSchema, SuperadminWhatsAppCreateCampaignPayloadSchema, SuperadminWhatsAppCampaignSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1WhatsAppSchema';
import { SuperadminMessagingUrlConfig } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';

import type { SuperadminWhatsAppBulkCenterData, SuperadminWhatsAppCampaign, SuperadminWhatsAppCreateCampaignPayload } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import type { ApiResponse } from '@/lib/api';

export async function fetchWhatsAppBulkCenter(): Promise<ApiResponse<SuperadminWhatsAppBulkCenterData>> {
    return apiFetch<ApiResponse<SuperadminWhatsAppBulkCenterData>>(SuperadminMessagingUrlConfig.BACKEND_API.WHATSAPP_BULK_CENTER, { dataSchema: SuperadminWhatsAppBulkCenterDataSchema });
}
/**
 * Creates a WhatsApp campaign through the module-owned API contract.
 * @description Sends a validated campaign creation request from the WhatsApp feature surface.
 * @dependencies Uses the module-owned API transport and request/response schemas.
 * @edge-case Preserves server validation and transport errors for the owning mutation flow to handle safely.
 */
export async function createWhatsAppCampaign(payload: SuperadminWhatsAppCreateCampaignPayload, idempotencyKey: string): Promise<ApiResponse<SuperadminWhatsAppCampaign>> {
    const parsedPayload = SuperadminWhatsAppCreateCampaignPayloadSchema.parse(payload);
    return apiFetch<ApiResponse<SuperadminWhatsAppCampaign>>(SuperadminMessagingUrlConfig.BACKEND_API.WHATSAPP_CAMPAIGNS, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify(parsedPayload),
        dataSchema: SuperadminWhatsAppCampaignSchema,
    });
}
