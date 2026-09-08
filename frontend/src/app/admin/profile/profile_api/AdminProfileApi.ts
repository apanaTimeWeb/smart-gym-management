// RESPONSIBILITY: API client for the Admin Profile module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { AdminProfileData, UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/admin/profile/profile_types/AdminProfileTypes';

const BASE = '/admin/profile';

export const adminProfileApi = {
  fetchProfile: () => apiFetch<ApiResponse<AdminProfileData>>(BASE),
  updateProfile: (body: UpdateAdminProfilePayload) =>
    apiFetch<ApiResponse<AdminProfileData>>(BASE, { method: 'PATCH', body: JSON.stringify(body) }),
  updatePassword: (body: UpdateAdminPasswordPayload) =>
    apiFetch<ApiResponse<void>>(`${BASE}/password`, { method: 'PATCH', body: JSON.stringify(body) }),
};
