import { apiFetch } from '@/lib/api';
import { managerAllSettingsSchema } from '@/app/frontend_manager/manager_settings/manager_settings_schemas/ManagerSettingsSchema';
import { ManagerSettingsUrlConfig } from '@/app/frontend_manager/manager_settings/manager_settings_url_config';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerSettingsApi implementation for the settings module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_settings/manager_settings_schemas/ManagerSettingsSchema; @/app/frontend_manager/manager_settings/manager_settings_url_config; @/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerSettingsApi = {
  fetchSettings: async (): Promise<ApiResponse<ManagerAllSettings>> => apiFetch(ManagerSettingsUrlConfig.BACKEND_API.BASE, { dataSchema: managerAllSettingsSchema }),
  updateSettings: async (body: Partial<ManagerAllSettings>, idempotencyKey: string): Promise<ApiResponse<ManagerAllSettings>> => apiFetch(ManagerSettingsUrlConfig.BACKEND_API.BASE, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerAllSettingsSchema }) };
