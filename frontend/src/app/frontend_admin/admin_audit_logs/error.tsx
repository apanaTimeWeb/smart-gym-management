"use client";
// RESPONSIBILITY: Route-segment error boundary for the audit logs feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminAuditLogsErrorProps } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_types/AdminAuditLogsErrorPropsTypes';

/**
 * AdminAuditLogsError provides the route-level error boundary for the audit logs feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminAuditLogsError({ error, reset }: AdminAuditLogsErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="audit_logs" />;
}
