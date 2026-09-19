// RESPONSIBILITY: Owns URL/filter value unions for the Global Audit Logs feature.
export const SUPERADMIN_GLOBAL_AUDIT_SEVERITY_FILTERS = ['ALL', 'INFO', 'WARNING', 'CRITICAL'] as const;
export type AuditSeverityFilter = (typeof SUPERADMIN_GLOBAL_AUDIT_SEVERITY_FILTERS)[number];
export const SUPERADMIN_GLOBAL_AUDIT_ACTOR_FILTERS = ['ALL', 'SUPERADMIN', 'SYSTEM', 'TENANT'] as const;
export type AuditActorFilter = (typeof SUPERADMIN_GLOBAL_AUDIT_ACTOR_FILTERS)[number];
