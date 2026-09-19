// RESPONSIBILITY: Provides API access for the Superadmin WhatsApp bulk center; MSW owns demo responses.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import { SuperadminWhatsAppBulkCenterDataSchema, SuperadminWhatsAppCreateCampaignPayloadSchema, SuperadminWhatsAppCreateCampaignResponseSchema, type SuperadminWhatsAppBulkCenterData, type SuperadminWhatsAppCampaign, type SuperadminWhatsAppCreateCampaignPayload } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
export async function fetchWhatsAppBulkCenter(): Promise<ApiResponse<SuperadminWhatsAppBulkCenterData>> {
    return apiFetch<ApiResponse<SuperadminWhatsAppBulkCenterData>>(MessagingUrlConfig.BACKEND_API.WHATSAPP_BULK_CENTER, { dataSchema: SuperadminWhatsAppBulkCenterDataSchema });
}
export async function createWhatsAppCampaign(payload: SuperadminWhatsAppCreateCampaignPayload, idempotencyKey?: string): Promise<ApiResponse<SuperadminWhatsAppCampaign>> {
    const parsedPayload = SuperadminWhatsAppCreateCampaignPayloadSchema.parse(payload);
    return apiFetch<ApiResponse<SuperadminWhatsAppCampaign>>(MessagingUrlConfig.BACKEND_API.WHATSAPP_CAMPAIGNS, {
        method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        body: JSON.stringify(parsedPayload),
        dataSchema: SuperadminWhatsAppCreateCampaignResponseSchema.shape.data,
    });
}
