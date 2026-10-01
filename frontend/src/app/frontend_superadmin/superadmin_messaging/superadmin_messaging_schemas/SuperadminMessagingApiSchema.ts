import { z } from 'zod';

import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { MessagingTenantSchema, SuperadminNotificationSchema, TenantMessageSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingTypesSchemas';

export const SuperadminMessagingMessagesResponseSchema = SuperadminLayoutApiResponseSchema(z.array(TenantMessageSchema));
export const SuperadminMessagingNotificationsResponseSchema = SuperadminLayoutApiResponseSchema(z.array(SuperadminNotificationSchema));
export const SuperadminMessagingTenantsResponseSchema = SuperadminLayoutApiResponseSchema(z.array(MessagingTenantSchema));
export const SuperadminMessagingNotificationResponseSchema = SuperadminLayoutApiResponseSchema(SuperadminNotificationSchema);
export const SuperadminMessagingMessageResponseSchema = SuperadminLayoutApiResponseSchema(TenantMessageSchema);
