"use client";
// RESPONSIBILITY: Route-segment error boundary for the announcements feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminAnnouncementsErrorProps } from '@/app/frontend_admin/admin_announcements/admin_announcements_types/AdminAnnouncementsErrorPropsTypes';

/**
 * AdminAnnouncementsError provides the route-level error boundary for the announcements feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminAnnouncementsError({ error, reset }: AdminAnnouncementsErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="announcements" />;
}
