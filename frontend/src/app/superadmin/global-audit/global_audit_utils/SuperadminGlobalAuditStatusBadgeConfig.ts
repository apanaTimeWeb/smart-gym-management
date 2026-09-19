// RESPONSIBILITY: Owns status-to-semantic-token mapping for the global-audit feature only; no cross-feature business registry.
const STATUS_BADGE_CLASSES: Record<string, string> = {
  ACTIVE: 'bg-success text-success',
  APPROVED: 'bg-success text-success',
  ENABLED: 'bg-success text-success',
  HEALTHY: 'bg-success text-success',
  RESOLVED: 'bg-success text-success',
  SUCCESS: 'bg-success text-success',
  CONNECTED: 'bg-success text-success',
  DELIVERED: 'bg-success text-success',
  VALID: 'bg-success text-success',
  DISABLED: 'bg-danger text-danger',
  FAILED: 'bg-danger text-danger',
  HIGH: 'bg-danger text-danger',
  REVOKED: 'bg-danger text-danger',
  DEGRADED: 'bg-warning text-warning',
  PENDING: 'bg-warning text-warning',
  WAITING: 'bg-warning text-warning',
  WARNING: 'bg-warning text-warning',
  MEDIUM: 'bg-warning text-warning',
  EXPIRING: 'bg-warning text-warning',
  ATTENTION: 'bg-warning text-warning',
  EXPORT_READY: 'bg-success text-success',
  AWAITING_APPROVAL: 'bg-warning text-warning',
  PURGE_SCHEDULED: 'bg-danger text-danger',
};
/** Resolves this feature's business status to the global semantic badge tokens. */
export function getSuperadminGlobalAuditStatusBadgeClasses(status: string): string {
  return STATUS_BADGE_CLASSES[status] ?? 'bg-input text-secondary';
}
