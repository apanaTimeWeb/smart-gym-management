"use client";
// RESPONSIBILITY: Route-segment error boundary for the permissions feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminPermissionsErrorProps } from '@/app/frontend_admin/admin_permissions/admin_permissions_types/AdminPermissionsErrorPropsTypes';

/**
 * AdminPermissionsError provides the route-level error boundary for the permissions feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminPermissionsError({ error, reset }: AdminPermissionsErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="permissions" />;
}
