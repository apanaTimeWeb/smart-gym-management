// RESPONSIBILITY: API client for the Manager Profile module.
// DATA FLOW: ManagerProfileApi → useManagerProfileLogic → ManagerProfileMain

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type {
  ManagerProfileData,
  UpdateManagerProfilePayload,
  UpdateManagerPasswordPayload,
} from '@/app/manager/profile/profile_types/ManagerProfileTypes';
import { MOCK_PROFILE } from '@/app/manager/profile/profile_fixtures/ManagerProfileMockData';

export const managerProfileApi = {
  fetchProfile: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_PROFILE };
  },

  updateProfile: async (body: UpdateManagerProfilePayload) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { ...MOCK_PROFILE, ...body } };
  },

  updatePassword: async (body: UpdateManagerPasswordPayload) => {
    await new Promise(res => setTimeout(res, 500));
    return { success: true, message: 'Password updated', data: undefined };
  },
};
