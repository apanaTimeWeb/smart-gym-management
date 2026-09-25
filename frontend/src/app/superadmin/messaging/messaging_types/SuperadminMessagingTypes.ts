import { z } from 'zod';
// RESPONSIBILITY: TypeScript and runtime contracts for the Superadmin tenant messaging module.
export type MessageChannel = 'EMAIL' | 'SMS' | 'WHATSAPP' | 'IN_APP';
export type MessageStatus = 'SENT' | 'DRAFT' | 'FAILED' | 'SCHEDULED' | 'QUEUED';
export type NotificationType = 'INFO' | 'WARNING' | 'CRITICAL';

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

export type MessagingTab = 'messages' | 'notifications';

export const TenantMessageSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'IN_APP']),
  subject: z.string(),
  body: z.string(),
  status: z.enum(['SENT', 'DRAFT', 'FAILED', 'SCHEDULED', 'QUEUED']),
  sentAt: z.string().nullable(),
  scheduledAt: z.string().nullable(),
  createdAt: z.string(),
});

export const SuperadminNotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  type: z.enum(['INFO', 'WARNING', 'CRITICAL']),
  read: z.boolean(),
  createdAt: z.string(),
});

export const MessagingTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.string(),
});

export const TenantMessageCreatePayloadSchema = z.object({
  tenantId: z.string().min(1),
  tenantName: z.string().min(1),
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'IN_APP']),
  subject: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(5000),
});

export type TenantMessageCreatePayload = z.infer<typeof TenantMessageCreatePayloadSchema>;
