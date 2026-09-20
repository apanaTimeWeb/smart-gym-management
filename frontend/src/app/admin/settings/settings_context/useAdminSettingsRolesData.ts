"use client";
// RESPONSIBILITY: Fetches the live role-permission reference for the Settings Roles view without cross-module business imports.
// DATA FLOW: AdminSettingsRolesApi → TanStack Query → AdminSettingsRoles.
import { useQuery } from '@tanstack/react-query';
import { AdminSettingsRolesApi } from '@/app/admin/settings/settings_api/AdminSettingsRolesApi';
/** Coordinates SettingsRolesData state, data flow, and feature behavior. */
export function useAdminSettingsRolesData() {
  const query = useQuery({ queryKey: ['admin','settings','roles-permissions'], queryFn: AdminSettingsRolesApi.fetchRolePermissionReference, staleTime: 300000 });
  return { roles: query.data?.data?.roleDefaults ?? [], status: query.status };
}
