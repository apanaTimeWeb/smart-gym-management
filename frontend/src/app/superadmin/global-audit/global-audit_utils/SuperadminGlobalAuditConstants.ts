// RESPONSIBILITY: Static filter options and pagination configuration for Global Audit.
import type { AuditActorFilter, AuditSeverityFilter } from '@/app/superadmin/global-audit/superadmin_global-audit_types/superadmin_global-audit_types';
export const SUPERADMIN_AUDIT_PAGE_SIZE = 20;
export const SUPERADMIN_AUDIT_SEVERITY_OPTIONS: Array<{ value: AuditSeverityFilter; label: string }> = [
  { value: 'ALL', label: 'All Severities' }, { value: 'INFO', label: 'Info' }, { value: 'WARNING', label: 'Warning' }, { value: 'CRITICAL', label: 'Critical' },
];
export const SUPERADMIN_AUDIT_ACTOR_OPTIONS: Array<{ value: AuditActorFilter; label: string }> = [
  { value: 'ALL', label: 'All Actors' }, { value: 'SUPERADMIN', label: 'Superadmin' }, { value: 'SYSTEM', label: 'System' }, { value: 'TENANT', label: 'Gym' },
];
