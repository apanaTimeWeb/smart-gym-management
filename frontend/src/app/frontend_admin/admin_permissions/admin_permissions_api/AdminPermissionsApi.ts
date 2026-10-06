// RESPONSIBILITY: Owns the Admin Permissions HTTP contract. It exposes only the documented role-default and per-staff override endpoints.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_PERMISSIONS_API } from '@/app/frontend_admin/admin_permissions/admin_permissions_url_config';
import type { RolePermissions, StaffOverride, UpdateStaffPermissionPayload } from '@/app/frontend_admin/admin_permissions/admin_permissions_types/AdminPermissionsTypes';
import { permissionsListSchema, staffOverridesSchema, staffOverrideSchema } from '@/app/frontend_admin/admin_permissions/admin_permissions_schemas/AdminPermissionsSchemas';

export const AdminPermissionsApi = {
  fetchPermissions: async () => apiFetch<ApiResponse<RolePermissions[]>>(ADMIN_PERMISSIONS_API.permissions, { method: 'GET', dataSchema: permissionsListSchema }),
  fetchOverrides: async () => apiFetch<ApiResponse<StaffOverride[]>>(ADMIN_PERMISSIONS_API.overrides, { method: 'GET', dataSchema: staffOverridesSchema }),
  updateStaffPermission: async (staffId: string, payload: UpdateStaffPermissionPayload, idempotencyKey: string) => apiFetch<ApiResponse<StaffOverride>>(ADMIN_PERMISSIONS_API.staff(staffId), { method: 'PATCH', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffOverrideSchema }),
  resetToDefaults: async (staffId: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_PERMISSIONS_API.reset(staffId), { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
};
