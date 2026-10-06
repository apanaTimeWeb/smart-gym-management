// RESPONSIBILITY: Fetches role permission reference data for Admin Settings without importing the Permissions business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_SETTINGS_API } from '@/app/frontend_admin/admin_settings/admin_settings_url_config';
import { z } from 'zod';
import type { AdminSettingsGymPermissionOverride, AdminSettingsRolePermission } from '@/app/frontend_admin/admin_settings/admin_settings_types/AdminSettingsPermissionTypes';
const roleSchema = z.object({ role: z.enum(['manager','trainer']), permissions: z.record(z.string(), z.boolean()) });
const responseSchema = z.object({ roleDefaults: z.array(roleSchema), gymOverrides: z.array(z.object({ gymId:z.string(), gymName:z.string(), role:z.enum(['manager','trainer']), overrides:z.record(z.string(), z.boolean()) })) });
export const AdminSettingsRolesApi = { fetchRolePermissionReference: () => apiFetch<ApiResponse<{ roleDefaults: AdminSettingsRolePermission[]; gymOverrides: AdminSettingsGymPermissionOverride[] }>>(`${ADMIN_SETTINGS_API.permissionsReference}?consumer=settings`, { method: 'GET', dataSchema: responseSchema }) };
