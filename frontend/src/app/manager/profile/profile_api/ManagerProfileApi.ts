import { apiFetch, type ApiResponse } from '@/lib/api';
import type {
  ManagerProfileData,
  UpdateManagerProfilePayload,
  UpdateManagerPasswordPayload,
} from '@/app/manager/profile/profile_types/ManagerProfileTypes';

export const managerProfileApi = {
  fetchProfile: async (): Promise<ApiResponse<ManagerProfileData>> => {
    return apiFetch(`/manager/profile`);
  },

  updateProfile: async (body: UpdateManagerProfilePayload): Promise<ApiResponse<ManagerProfileData>> => {
    return apiFetch(`/manager/profile`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  },

  updatePassword: async (body: UpdateManagerPasswordPayload): Promise<ApiResponse<void>> => {
    return apiFetch(`/manager/profile/password`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  },
};
