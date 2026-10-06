"use client";
// RESPONSIBILITY: Route-segment error boundary for the coupons feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminCouponsErrorProps } from '@/app/frontend_admin/admin_coupons/admin_coupons_types/AdminCouponsErrorPropsTypes';

/**
 * AdminCouponsError provides the route-level error boundary for the coupons feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminCouponsError({ error, reset }: AdminCouponsErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="coupons" />;
}
