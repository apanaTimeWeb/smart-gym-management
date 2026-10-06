"use client";
// RESPONSIBILITY: Route-segment error boundary for the gym health alerts feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminGymHealthAlertsErrorProps } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_types/AdminGymHealthAlertsErrorPropsTypes';

/**
 * AdminGymHealthAlertsError provides the route-level error boundary for the gym health alerts feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminGymHealthAlertsError({ error, reset }: AdminGymHealthAlertsErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="gym_health_alerts" />;
}
