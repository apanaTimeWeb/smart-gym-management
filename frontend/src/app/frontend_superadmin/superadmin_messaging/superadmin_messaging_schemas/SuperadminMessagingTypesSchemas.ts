import { z } from 'zod';

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
