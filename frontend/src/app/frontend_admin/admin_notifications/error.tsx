"use client";
// RESPONSIBILITY: Route-segment error boundary for the notifications feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminNotificationsErrorProps } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsErrorPropsTypes';

/**
 * AdminNotificationsError provides the route-level error boundary for the notifications feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminNotificationsError({ error, reset }: AdminNotificationsErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="notifications" />;
}
