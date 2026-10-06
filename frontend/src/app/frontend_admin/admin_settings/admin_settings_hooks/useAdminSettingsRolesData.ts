"use client";
// RESPONSIBILITY: Fetches the live role-permission reference for the Settings Roles view without cross-module business imports.
import { ADMIN_SETTINGS_QUERY_KEYS } from '@/app/frontend_admin/admin_settings/admin_settings_constants/AdminSettingsQueryKeys';
// DATA FLOW: AdminSettingsRolesApi → TanStack Query → AdminSettingsRoles.
import { useQuery } from '@tanstack/react-query';
import { AdminSettingsRolesApi } from '@/app/frontend_admin/admin_settings/admin_settings_api/AdminSettingsRolesApi';
/**
 * @description useAdminSettingsRolesData: Fetches the live role-permission reference for the Settings Roles view without cross-module business imports.
 * @dependencies Consumes AdminSettingsQueryKeys, AdminSettingsRolesApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminSettingsRolesData() {
  const query = useQuery({ queryKey: ADMIN_SETTINGS_QUERY_KEYS.key('roles-permissions'), queryFn: AdminSettingsRolesApi.fetchRolePermissionReference, staleTime: 300000 });
  return { roles: query.data?.data?.roleDefaults ?? [], status: query.status };
}
