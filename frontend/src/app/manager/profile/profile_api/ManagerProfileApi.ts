import { ManagerProfileUrlConfig } from '@/app/manager/profile/profile_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type {
  ManagerProfileData,
  UpdateManagerProfilePayload,
  UpdateManagerPasswordPayload,
} from '@/app/manager/profile/profile_types/ManagerProfileTypes';

export const managerProfileApi = {
  fetchProfile: async (): Promise<ApiResponse<ManagerProfileData>> => {
    return apiFetch(ManagerProfileUrlConfig.BACKEND_API.BASE);
  },

  updateProfile: async (body: UpdateManagerProfilePayload): Promise<ApiResponse<ManagerProfileData>> => {
    return apiFetch(ManagerProfileUrlConfig.BACKEND_API.BASE, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  },

  updatePassword: async (body: UpdateManagerPasswordPayload): Promise<ApiResponse<void>> => {
    return apiFetch(`${ManagerProfileUrlConfig.BACKEND_API.BASE}/password`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  },
};
