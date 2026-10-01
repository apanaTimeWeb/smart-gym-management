import type { infer as ZodInfer } from 'zod';
import { TenantMessageSchema, SuperadminNotificationSchema, MessagingTenantSchema, TenantMessageCreatePayloadSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingTypesSchemas';
// RESPONSIBILITY: TypeScript and runtime contracts for the Superadmin tenant messaging module.
import { SUPERADMIN_MESSAGING_CHANNELS, SUPERADMIN_MESSAGING_STATUSES, SUPERADMIN_MESSAGING_NOTIFICATION_TYPES, SUPERADMIN_MESSAGING_TABS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';

export type MessageChannel = typeof SUPERADMIN_MESSAGING_CHANNELS[number];
export type MessageStatus = typeof SUPERADMIN_MESSAGING_STATUSES[number];
export type NotificationType = typeof SUPERADMIN_MESSAGING_NOTIFICATION_TYPES[number];

/** Tenant-level recipients only. Superadmin messaging never addresses gym members. */
export interface MessagingTenant {
  id: string;
  name: string;
  plan: string;
}

export interface TenantMessage {
  id: string;
  tenantId: string;
  tenantName: string;
  channel: MessageChannel;
  subject: string;
  body: string;
  status: MessageStatus;
  sentAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
}

export interface SuperadminNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export type MessagingTab = typeof SUPERADMIN_MESSAGING_TABS[number];
export type TenantMessageCreatePayload = ZodInfer<typeof TenantMessageCreatePayloadSchema>;
