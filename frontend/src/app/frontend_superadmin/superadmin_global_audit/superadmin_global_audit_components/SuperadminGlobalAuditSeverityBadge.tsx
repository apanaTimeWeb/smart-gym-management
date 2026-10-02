/**
 * RESPONSIBILITY: React component SuperadminGlobalAuditSeverityBadge owned by the superadmin_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditSeverityBadgeTypes, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditConstants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders one Global Audit severity badge using the feature-owned semantic token map.
import { ShieldAlert, AlertTriangle, Info } from 'lucide-react';

import { SUPERADMIN_AUDIT_SEVERITY_BADGE_CLASSES } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditConstants';

import type { SuperadminGlobalAuditSeverityBadgeProps } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditSeverityBadgeTypes';
import type { AuditLog } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes';



/**
 * Responsibility: Renders the SuperadminGlobalAuditSeverityBadge UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminGlobalAuditSeverityBadge({ severity }: SuperadminGlobalAuditSeverityBadgeProps) {
  const Icon = severity === 'CRITICAL' ? ShieldAlert : severity === 'WARNING' ? AlertTriangle : Info;
  return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold tracking-wider ${SUPERADMIN_AUDIT_SEVERITY_BADGE_CLASSES[severity]}`} data-testid="superadmin_global_audit-superadmin-global-audit-severity-badge-audit-severity-badge-status"><Icon size={18} strokeWidth={2} aria-hidden="true" />{severity}</span>;
}
