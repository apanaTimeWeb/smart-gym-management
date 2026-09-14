import { z } from 'zod';
export const GlobalAuditLogSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  targetResource: z.string(),
  actorName: z.string(),
  actorRole: z.string(),
  actorType: z.enum(['SUPERADMIN', 'SYSTEM', 'TENANT']).optional(),
  action: z.string(),
  ipAddress: z.string().optional(),
});
export type GlobalAuditLog = z.infer<typeof GlobalAuditLogSchema>;

export const AuditLogSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  actorEmail: z.string(),
  actorRole: z.string(),
  action: z.string(),
  targetEntity: z.string(),
  targetId: z.string(),
  timestamp: z.string(),
  details: z.string(),
});
export type AuditLog = z.infer<typeof AuditLogSchema>;
