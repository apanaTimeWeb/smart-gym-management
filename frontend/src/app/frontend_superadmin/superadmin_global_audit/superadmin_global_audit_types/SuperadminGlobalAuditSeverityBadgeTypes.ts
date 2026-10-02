// RESPONSIBILITY: Prop blueprint for the Global Audit severity badge.
import type { AuditLog } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes';
export interface SuperadminGlobalAuditSeverityBadgeProps {
  severity: AuditLog['severity'];
}
