"use client";
// RESPONSIBILITY: Route-segment error boundary for the payouts feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminPayoutsErrorProps } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsErrorPropsTypes';

/**
 * AdminPayoutsError provides the route-level error boundary for the payouts feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminPayoutsError({ error, reset }: AdminPayoutsErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="payouts" />;
}
