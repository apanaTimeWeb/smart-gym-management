"use client";
// RESPONSIBILITY: Owns the Admin Settings server-state query and exposes only query results to the Settings view layer.
import { ADMIN_SETTINGS_QUERY_KEYS } from '@/app/frontend_admin/admin_settings/admin_settings_constants/AdminSettingsQueryKeys';
// DATA FLOW: Settings URL tab → TanStack Query → AdminSettingsApi → typed validated settings response → AdminSettingsContent.

import { useQuery } from '@tanstack/react-query';
import { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/admin_settings_api/AdminSettingsApi';
/**
 * @description useAdminSettingsData: Owns the Admin Settings server-state query and exposes only query results to the Settings view layer.
 * @dependencies Consumes AdminSettingsQueryKeys, AdminSettingsApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminSettingsData() {
  return useQuery({
    queryKey: ADMIN_SETTINGS_QUERY_KEYS.key(),
    queryFn: AdminSettingsApi.fetchSettings,
    staleTime: 300_000,
  });
}
