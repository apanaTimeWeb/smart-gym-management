import { adminProfileDataSchema } from '@/app/admin/profile/profile_types/profile_schemas';
// RESPONSIBILITY: API client for the Admin Profile module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { AdminProfileData, UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/admin/profile/profile_types/AdminProfileTypes';
import { z } from "zod";

const BASE = '/admin/profile';
export const adminProfileApi = {
  fetchProfile: async () => {
            return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>('/api/admin/adminProfile/fetchProfile', { method: 'GET', dataSchema: adminProfileDataSchema });
        },
  updateProfile: async (body: UpdateAdminProfilePayload) => {
            return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>('/api/admin/adminProfile/updateProfile', { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema });
        },
  updatePassword: async (body: UpdateAdminPasswordPayload) => {
          return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>('/api/admin/adminProfile/updatePassword', { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema });
      },
};
