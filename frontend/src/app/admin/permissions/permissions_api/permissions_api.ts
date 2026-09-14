// RESPONSIBILITY: API client for the Permissions module.
import { AdminPermissionsUrlConfig } from '@/app/admin/permissions/admin_permissions_url_config';
import type { ApiResponse, apiFetch } from '@/lib/api';
import type { PermissionsData, RoleType } from '@/app/admin/permissions/permissions_types/permissions_types';
import { MOCK_PERMISSIONS_DATA } from '@/app/admin/permissions/permissions_utils/AdminPermissionsSharedConstants';
import { z } from "zod";
export const permissionsApi = {
  fetchPermissions: async () => {
            return apiFetch(`${AdminPermissionsUrlConfig.BACKEND_API.BASE}/fetchPermissions`, { method: 'GET', dataSchema: z.any() });
        },
  updateRolePermissions: async (role: RoleType, permissions: Record<string, boolean>) => {
            return apiFetch(`${AdminPermissionsUrlConfig.BACKEND_API.BASE}/updateRolePermissions`, { method: 'POST', body: JSON.stringify(role), dataSchema: z.any() });
        },
  updateGymOverride: async (gymId: string, role: RoleType, overrides: Record<string, boolean>) => {
          return apiFetch(`${AdminPermissionsUrlConfig.BACKEND_API.BASE}/updateGymOverride`, { method: 'POST', body: JSON.stringify(gymId), dataSchema: z.any() });
      },
};
