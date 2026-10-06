"use client";
// RESPONSIBILITY: Route-segment error boundary for the data export feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminDataExportErrorProps } from '@/app/frontend_admin/admin_data_export/admin_data_export_types/AdminDataExportErrorPropsTypes';

/**
 * AdminDataExportError provides the route-level error boundary for the data export feature.
 * @dependencies Uses the approved shared AdminLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminDataExportError({ error, reset }: AdminDataExportErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="data_export" />;
}
