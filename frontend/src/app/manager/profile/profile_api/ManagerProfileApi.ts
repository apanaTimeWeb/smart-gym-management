import { ManagerProfileUrlConfig } from '@/app/manager/profile/profile_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ManagerProfileData, UpdateManagerProfilePayload, UpdateManagerPasswordPayload } from '@/app/manager/profile/profile_types/ManagerProfileTypes';
import { managerProfileDataSchema, managerPasswordUpdateResponseSchema } from '@/app/manager/profile/profile_types/ManagerProfileSchema';

export const managerProfileApi = {
  fetchProfile: async (): Promise<ApiResponse<ManagerProfileData>> => apiFetch(ManagerProfileUrlConfig.BACKEND_API.BASE, { dataSchema: managerProfileDataSchema }),
  updateProfile: async (body: UpdateManagerProfilePayload): Promise<ApiResponse<ManagerProfileData>> => apiFetch(ManagerProfileUrlConfig.BACKEND_API.BASE, { method: 'PATCH', body: JSON.stringify(body), dataSchema: managerProfileDataSchema }),
  updatePassword: async (body: UpdateManagerPasswordPayload): Promise<ApiResponse<Record<string, unknown>>> => apiFetch(`${ManagerProfileUrlConfig.BACKEND_API.BASE}/password`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: managerPasswordUpdateResponseSchema }),
};
