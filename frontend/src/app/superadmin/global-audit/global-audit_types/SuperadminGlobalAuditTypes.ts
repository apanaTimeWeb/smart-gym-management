// RESPONSIBILITY: Defines canonical API and UI types for the Superadmin Global Audit module.
import { z } from 'zod';

export const AUDIT_ACTOR_ROLES = ['SUPERADMIN', 'ADMIN', 'STAFF', 'MEMBER'] as const;
export type AuditActorRole = typeof AUDIT_ACTOR_ROLES[number];
export const AUDIT_ACTOR_TYPES = ['SUPERADMIN', 'SYSTEM', 'TENANT'] as const;
export type AuditActorType = typeof AUDIT_ACTOR_TYPES[number];
export const AUDIT_SEVERITIES = ['INFO', 'WARNING', 'CRITICAL'] as const;
export type AuditSeverity = typeof AUDIT_SEVERITIES[number];
export interface AuditLog {
    id: string;
    timestamp: string;
    actor: string;
    actorRole?: AuditActorRole;
    tenantId?: string;
    tenantName?: string;
    actorType?: AuditActorType;
    action: string;
    resource: string;
    resourceId?: string;
    details: string;
    ipAddress: string;
    sessionId?: string;
    severity: AuditSeverity;
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
    actorRole: z.enum(AUDIT_ACTOR_ROLES).optional(),
    tenantId: z.string().optional(),
    tenantName: z.string().optional(),
    actorType: z.enum(AUDIT_ACTOR_TYPES).optional(),
    action: z.string(),
    resource: z.string(),
    resourceId: z.string().optional(),
    details: z.string(),
    ipAddress: z.string(),
    sessionId: z.string().optional(),
    severity: z.enum(AUDIT_SEVERITIES),
});
export const GlobalAuditLogSchema = AuditLogSchema;
export type GlobalAuditLog = z.infer<typeof GlobalAuditLogSchema>;
