// RESPONSIBILITY: API client for the Permissions module.
import type { ApiResponse, apiFetch } from '@/lib/api';
import type { PermissionsData, RoleType } from '@/app/admin/permissions/permissions_types/permissions_types';
import { MOCK_PERMISSIONS_DATA } from '@/app/admin/permissions/permissions_utils/AdminPermissionsSharedConstants';
import { z } from "zod";
export const permissionsApi = {
  fetchPermissions: async () => {
            return apiFetch('/api/admin/permissions/fetchPermissions', { method: 'GET', dataSchema: z.unknown() });
        },
  updateRolePermissions: async (role: RoleType, permissions: Record<string, boolean>) => {
            return apiFetch('/api/admin/permissions/updateRolePermissions', { method: 'POST', body: JSON.stringify(role), dataSchema: z.unknown() });
        },
  updateGymOverride: async (gymId: string, role: RoleType, overrides: Record<string, boolean>) => {
          return apiFetch('/api/admin/permissions/updateGymOverride', { method: 'POST', body: JSON.stringify(gymId), dataSchema: z.unknown() });
      },
};
