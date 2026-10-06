"use client";
// RESPONSIBILITY: Route-segment error boundary for the usage feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminUsageErrorProps } from '@/app/frontend_admin/admin_usage/admin_usage_types/AdminUsageErrorPropsTypes';

/**
 * AdminUsageError provides the route-level error boundary for the usage feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminUsageError({ error, reset }: AdminUsageErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="usage" />;
}
