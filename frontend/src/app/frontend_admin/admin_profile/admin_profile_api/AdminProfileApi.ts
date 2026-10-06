// RESPONSIBILITY: API client for the Admin Profile module.
import { ADMIN_PROFILE_API } from '@/app/frontend_admin/admin_profile/admin_profile_url_config';
import { adminProfileDataSchema } from '@/app/frontend_admin/admin_profile/admin_profile_schemas/AdminProfileSchemas';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { AdminProfileData, UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/frontend_admin/admin_profile/admin_profile_types/AdminProfileTypes';
import { type z } from "zod";

export const AdminProfileApi = {
  fetchProfile: async () => {
            return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>(`${ADMIN_PROFILE_API.fetchProfile}`, { method: 'GET', dataSchema: adminProfileDataSchema });
        },
  updateProfile: async (body: UpdateAdminProfilePayload, idempotencyKey: string) => {
            return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>(`${ADMIN_PROFILE_API.updateProfile}`, { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema,
                headers: { 'Idempotency-Key': idempotencyKey }
            });
        },
  updatePassword: async (body: UpdateAdminPasswordPayload, idempotencyKey: string) => {
          return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>(`${ADMIN_PROFILE_API.updatePassword}`, { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema,
              headers: { 'Idempotency-Key': idempotencyKey }
        });
      },
};
