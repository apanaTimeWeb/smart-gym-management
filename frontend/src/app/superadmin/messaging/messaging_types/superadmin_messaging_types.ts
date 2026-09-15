import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Tenant Messaging module.

export type MessageChannel = 'EMAIL' | 'SMS' | 'IN_APP';
export type MessageStatus = 'SENT' | 'DRAFT' | 'FAILED' | 'SCHEDULED';
export type NotificationType = 'INFO' | 'WARNING' | 'CRITICAL';

/** Minimal tenant shape used by the messaging module — self-contained, no cross-module import. */
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

/** Tab identifiers for the messaging page. */
export type MessagingTab = 'messages' | 'notifications';


export const TenantMessageSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  channel: z.enum(['EMAIL', 'SMS', 'IN_APP']),
  subject: z.string(),
  body: z.string(),
  status: z.enum(['SENT', 'DRAFT', 'FAILED', 'SCHEDULED']),
  sentAt: z.string().nullable(),
  scheduledAt: z.string().nullable(),
  createdAt: z.string()
});

export const SuperadminNotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  type: z.enum(['INFO', 'WARNING', 'CRITICAL']),
  read: z.boolean(),
  createdAt: z.string()
});

export const MessagingTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.string()
});
