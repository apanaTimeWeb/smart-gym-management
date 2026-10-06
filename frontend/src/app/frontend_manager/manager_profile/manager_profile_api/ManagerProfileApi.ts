import { apiFetch } from '@/lib/api';
import { managerProfileDataSchema, managerPasswordUpdateResponseSchema } from '@/app/frontend_manager/manager_profile/manager_profile_schemas/ManagerProfileSchema';
import { ManagerProfileUrlConfig } from '@/app/frontend_manager/manager_profile/manager_profile_url_config';
import type { ManagerProfileData, UpdateManagerProfilePayload, UpdateManagerPasswordPayload } from '@/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerProfileApi implementation for the profile module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_profile/manager_profile_schemas/ManagerProfileSchema; @/app/frontend_manager/manager_profile/manager_profile_url_config; @/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerProfileApi = {
  fetchProfile: async (): Promise<ApiResponse<ManagerProfileData>> => apiFetch(ManagerProfileUrlConfig.BACKEND_API.BASE, { dataSchema: managerProfileDataSchema }),
  updateProfile: async (body: UpdateManagerProfilePayload, idempotencyKey: string): Promise<ApiResponse<ManagerProfileData>> => apiFetch(ManagerProfileUrlConfig.BACKEND_API.BASE, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerProfileDataSchema }),
  updatePassword: async (body: UpdateManagerPasswordPayload, idempotencyKey: string): Promise<ApiResponse<Record<string, unknown>>> => apiFetch(ManagerProfileUrlConfig.BACKEND_API.PASSWORD, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPasswordUpdateResponseSchema }) };
