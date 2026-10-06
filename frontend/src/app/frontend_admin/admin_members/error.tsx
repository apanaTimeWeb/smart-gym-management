"use client";
// RESPONSIBILITY: Route-segment error boundary for the members feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminMembersErrorProps } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersErrorPropsTypes';

/**
 * AdminMembersError provides the route-level error boundary for the members feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminMembersError({ error, reset }: AdminMembersErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="members" />;
}
