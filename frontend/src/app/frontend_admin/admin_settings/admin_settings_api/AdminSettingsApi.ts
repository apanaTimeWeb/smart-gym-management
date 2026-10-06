// RESPONSIBILITY: Provides strongly-typed network calls for the Settings module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_SETTINGS_API } from '@/app/frontend_admin/admin_settings/admin_settings_url_config';
import { AdminSettingsResponseSchema } from '@/app/frontend_admin/admin_settings/admin_settings_schemas/AdminSettingsSchemas';
import type { AdminSettingsResponse, AdminSettingsUpdatePayload } from '@/app/frontend_admin/admin_settings/admin_settings_types/AdminSettingsTypes';

export const AdminSettingsApi = {
  fetchSettings: async (): Promise<ApiResponse<AdminSettingsResponse['data']>> =>
    apiFetch<ApiResponse<AdminSettingsResponse['data']>>(ADMIN_SETTINGS_API.fetchSettings, {
      method: 'GET',
      dataSchema: AdminSettingsResponseSchema.shape.data,
    }),

  updateSettings: async (body: AdminSettingsUpdatePayload, idempotencyKey: string): Promise<ApiResponse<AdminSettingsResponse['data']>> =>
    apiFetch<ApiResponse<AdminSettingsResponse['data']>>(ADMIN_SETTINGS_API.updateSettings, {
      method: 'POST',
      body: JSON.stringify(body),
      dataSchema: AdminSettingsResponseSchema.shape.data,
      headers: { 'Idempotency-Key': idempotencyKey },
    }),
};
