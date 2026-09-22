import { apiFetch } from '@/lib/api';
import { managerProfileDataSchema, managerPasswordUpdateResponseSchema } from '@/app/manager/profile/profile_schemas/ManagerProfileSchema';
import { ManagerProfileUrlConfig } from '@/app/manager/profile/profile_url_config';
import type { ManagerProfileData, UpdateManagerProfilePayload, UpdateManagerPasswordPayload } from '@/app/manager/profile/profile_types/ManagerProfileTypes';
import type { ApiResponse } from '@/lib/api';


export const managerProfileApi = {
  fetchProfile: async (): Promise<ApiResponse<ManagerProfileData>> => apiFetch(ManagerProfileUrlConfig.BACKEND_API.BASE, { dataSchema: managerProfileDataSchema }),
  updateProfile: async (body: UpdateManagerProfilePayload, idempotencyKey?: string): Promise<ApiResponse<ManagerProfileData>> => apiFetch(ManagerProfileUrlConfig.BACKEND_API.BASE, { method: 'PATCH', body: JSON.stringify(body), dataSchema: managerProfileDataSchema,
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
}),
  updatePassword: async (body: UpdateManagerPasswordPayload, idempotencyKey?: string): Promise<ApiResponse<Record<string, unknown>>> => apiFetch(ManagerProfileUrlConfig.BACKEND_API.PASSWORD, { method: 'PATCH', body: JSON.stringify(body), dataSchema: managerPasswordUpdateResponseSchema,
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
}) };
