// RESPONSIBILITY: API client for the Permissions module.
import { AdminPermissionsUrlConfig } from '@/app/admin/permissions/admin_permissions_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { PermissionsData, RoleType } from '@/app/admin/permissions/permissions_types/AdminPermissionsTypes';
import { permissionsDataSchema } from '@/app/admin/permissions/permissions_types/AdminPermissionsSchemas';
export const permissionsApi = {
  fetchPermissions: async () => {
            return apiFetch<ApiResponse<PermissionsData>>(`${AdminPermissionsUrlConfig.api.base}/fetchPermissions`, { method: 'GET', dataSchema: permissionsDataSchema });
        },
  updateRolePermissions: async (role: RoleType, permissions: Record<string, boolean>, idempotencyKey?: string) => {
            return apiFetch<ApiResponse<PermissionsData>>(`${AdminPermissionsUrlConfig.api.base}/updateRolePermissions`, { method: 'POST', body: JSON.stringify({ role, permissions }), dataSchema: permissionsDataSchema,
                headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
            });
        },
  updateGymOverride: async (gymId: string, role: RoleType, overrides: Record<string, boolean>, idempotencyKey?: string) => {
          return apiFetch<ApiResponse<PermissionsData>>(`${AdminPermissionsUrlConfig.api.base}/updateGymOverride`, { method: 'POST', body: JSON.stringify({ gymId, role, overrides }), dataSchema: permissionsDataSchema,
              headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
        });
      },
};
