// RESPONSIBILITY: Provides the shared Superadmin-only status-to-token mapping for V1 business panels.
const SUPERADMIN_STATUS_BADGE_CLASSES: Record<string, string> = {
    ACTIVE: "bg-success-bg text-success",
    APPROVED: "bg-success-bg text-success",
    ENABLED: "bg-success-bg text-success",
    HEALTHY: "bg-success-bg text-success",
    RESOLVED: "bg-success-bg text-success",
    SUCCESS: "bg-success-bg text-success",
    CONNECTED: "bg-success-bg text-success",
    DELIVERED: "bg-success-bg text-success",
    VALID: "bg-success-bg text-success",
    READY: "bg-success-bg text-success",
    DISABLED: "bg-danger-bg text-danger",
    FAILED: "bg-danger-bg text-danger",
    HIGH: "bg-danger-bg text-danger",
    REVOKED: "bg-danger-bg text-danger",
    DEGRADED: "bg-warning-bg text-warning",
    PENDING: "bg-warning-bg text-warning",
    WAITING: "bg-warning-bg text-warning",
    WARNING: "bg-warning-bg text-warning",
    MEDIUM: "bg-warning-bg text-warning",
    EXPIRING: "bg-warning-bg text-warning",
    ATTENTION: "bg-warning-bg text-warning",
    EXPORT_READY: "bg-success-bg text-success",
    AWAITING_APPROVAL: "bg-warning-bg text-warning",
    PURGE_SCHEDULED: "bg-danger-bg text-danger",
};
/**
 * Returns the design-system status classes for a Superadmin business status.
 */
export function getSuperadminStatusBadgeClasses(status: string): string {
    return SUPERADMIN_STATUS_BADGE_CLASSES[status] ?? "bg-input text-secondary";
}
