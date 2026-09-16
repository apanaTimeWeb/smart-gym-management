// RESPONSIBILITY: Defines canonical API and UI types for the Superadmin Global Audit module.
import { z } from 'zod';

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole?: 'SUPERADMIN' | 'ADMIN' | 'STAFF' | 'MEMBER';
  tenantId?: string;
  tenantName?: string;
  actorType?: 'SUPERADMIN' | 'SYSTEM' | 'TENANT';
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  sessionId?: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export type AuditSeverityFilter = 'ALL' | 'INFO' | 'WARNING' | 'CRITICAL';
export type AuditActorFilter = 'ALL' | 'SUPERADMIN' | 'SYSTEM' | 'TENANT';

export interface GlobalAuditListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const AuditLogSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  actor: z.string(),
  actorRole: z.enum(['SUPERADMIN', 'ADMIN', 'STAFF', 'MEMBER']).optional(),
  tenantId: z.string().optional(),
  tenantName: z.string().optional(),
  actorType: z.enum(['SUPERADMIN', 'SYSTEM', 'TENANT']).optional(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().optional(),
  details: z.string(),
  ipAddress: z.string(),
  sessionId: z.string().optional(),
  severity: z.enum(['INFO', 'WARNING', 'CRITICAL']),
});

export const GlobalAuditLogSchema = AuditLogSchema;
export type GlobalAuditLog = z.infer<typeof GlobalAuditLogSchema>;
