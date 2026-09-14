// RESPONSIBILITY: API client for the Permissions module.
import { AdminPermissionsUrlConfig } from '@/app/admin/permissions/admin_permissions_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { PermissionsData, RoleType } from '@/app/admin/permissions/permissions_types/permissions_types';
import { MOCK_PERMISSIONS_DATA } from '@/app/admin/permissions/permissions_utils/AdminPermissionsSharedConstants';
import { z } from "zod";
export const permissionsApi = {
  fetchPermissions: async () => {
            return apiFetch<ApiResponse<any>>(`${AdminPermissionsUrlConfig.api.base}/fetchPermissions`, { method: 'GET', dataSchema: z.any() });
        },
  updateRolePermissions: async (role: RoleType, permissions: Record<string, boolean>) => {
            return apiFetch<ApiResponse<any>>(`${AdminPermissionsUrlConfig.api.base}/updateRolePermissions`, { method: 'POST', body: JSON.stringify(role), dataSchema: z.any() });
        },
  updateGymOverride: async (gymId: string, role: RoleType, overrides: Record<string, boolean>) => {
          return apiFetch<ApiResponse<any>>(`${AdminPermissionsUrlConfig.api.base}/updateGymOverride`, { method: 'POST', body: JSON.stringify(gymId), dataSchema: z.any() });
      },
};
