"use client";
// RESPONSIBILITY: Route-segment error boundary for the attendance feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminAttendanceErrorProps } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceErrorPropsTypes';

/**
 * AdminAttendanceError provides the route-level error boundary for the attendance feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminAttendanceError({ error, reset }: AdminAttendanceErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="attendance" />;
}
