import type { infer as ZodInfer } from 'zod';
import { SuperadminWhatsAppRecipientSchema, SuperadminWhatsAppTemplateSchema, SuperadminWhatsAppAudienceSchema, SuperadminWhatsAppCampaignSchema, SuperadminWhatsAppBulkCenterDataSchema, SuperadminWhatsAppCreateCampaignPayloadSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1WhatsAppSchema';
export type SuperadminWhatsAppRecipient = ZodInfer<typeof SuperadminWhatsAppRecipientSchema>;
export type SuperadminWhatsAppTemplate = ZodInfer<typeof SuperadminWhatsAppTemplateSchema>;
export type SuperadminWhatsAppAudience = ZodInfer<typeof SuperadminWhatsAppAudienceSchema>;
export type SuperadminWhatsAppCampaign = ZodInfer<typeof SuperadminWhatsAppCampaignSchema>;
export type SuperadminWhatsAppBulkCenterData = ZodInfer<typeof SuperadminWhatsAppBulkCenterDataSchema>;
export type SuperadminWhatsAppCreateCampaignPayload = ZodInfer<typeof SuperadminWhatsAppCreateCampaignPayloadSchema>;
import { SUPERADMIN_WHATSAPP_QUEUE_STATUSES } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';

export type SuperadminWhatsAppQueueStatus = typeof SUPERADMIN_WHATSAPP_QUEUE_STATUSES[number];
export interface SuperadminWhatsAppQueueRecipient {
    recipient: SuperadminWhatsAppRecipient;
    status: SuperadminWhatsAppQueueStatus;
    message: string;
}
export interface SuperadminMessagingV1WhatsAppBulkCenterProps {
    data: SuperadminWhatsAppBulkCenterData;
}
