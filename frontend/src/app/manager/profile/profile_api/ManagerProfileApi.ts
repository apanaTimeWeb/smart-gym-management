// RESPONSIBILITY: API client for the Manager Profile module.
// DATA FLOW: ManagerProfileApi → useManagerProfileLogic → ManagerProfileMain

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type {
  ManagerProfileData,
  UpdateManagerProfilePayload,
  UpdateManagerPasswordPayload,
} from '@/app/manager/profile/profile_types/ManagerProfileTypes';

const BASE = '/manager/profile';

export const managerProfileApi = {
  fetchProfile: () =>
    apiFetch<ApiResponse<ManagerProfileData>>(BASE),

  updateProfile: (body: UpdateManagerProfilePayload) =>
    apiFetch<ApiResponse<ManagerProfileData>>(BASE, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  updatePassword: (body: UpdateManagerPasswordPayload) =>
    apiFetch<ApiResponse<void>>(`${BASE}/password`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
};
