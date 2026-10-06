"use client";
// RESPONSIBILITY: Route-segment error boundary for the reports feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminReportsErrorProps } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsErrorPropsTypes';

/**
 * AdminReportsError provides the route-level error boundary for the reports feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminReportsError({ error, reset }: AdminReportsErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="reports" />;
}
