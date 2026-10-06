import { z } from 'zod';
import { auditSeveritySchema as severitySchema } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_schemas/AdminAuditLogsSchemaPrimitives';

export const auditLogSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  action: z.string(),
  actor: z.string(),
  entityType: z.string(),
  entityId: z.string().optional(),
  branchId: z.string(),
  details: z.string(),
  severity: severitySchema,
});

export const auditLogDetailSchema = auditLogSchema.extend({
  metadata: z.record(z.unknown()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  before: z.record(z.unknown()).optional(),
  after: z.record(z.unknown()).optional(),
});

export const auditKpiDataSchema = z.object({
  totalLogs: z.number(),
  actionsToday: z.number(),
  uniqueActors: z.number(),
  criticalEvents: z.number(),
});

export const auditActorsSchema = z.object({ actors: z.array(z.string()) });
