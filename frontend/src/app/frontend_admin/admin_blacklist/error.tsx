"use client";
// RESPONSIBILITY: Error boundary for Admin Blacklist page. Handles 403 permission-denied separately from generic errors.
import AdminLayoutErrorFallback from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback';
import type { AdminBlacklistErrorProps } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistErrorPropsTypes';

/**
 * BlacklistError is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function BlacklistError({ error, reset }: AdminBlacklistErrorProps) {
  return <AdminLayoutErrorFallback error={error} reset={reset} moduleName="Blacklist" />;
}
