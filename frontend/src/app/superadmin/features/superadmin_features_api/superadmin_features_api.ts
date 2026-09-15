// RESPONSIBILITY: Encapsulates functionality for superadmin_features_api.ts
import { FeatureFlagSchema, ReleaseNoteSchema } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';
import { FeaturesUrlConfig } from '@/app/superadmin/features/superadmin_features_url_config';
import { z } from "zod";

export const featuresApi = {
  fetchFeatures: () =>
    apiFetch<ApiResponse<{ flags: FeatureFlag[]; notes: ReleaseNote[] }>>(FeaturesUrlConfig.BACKEND_API.BASE, { dataSchema: z.object({}).passthrough() }),

  createFlag: (body: Partial<FeatureFlag>) =>
    apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags`, {
      method: 'POST',
      body: JSON.stringify(body),
        dataSchema: FeatureFlagSchema
    }),

  updateFlag: (id: string, body: Partial<FeatureFlag>) =>
    apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: FeatureFlagSchema
    }),

  toggleFlag: (id: string) =>
    apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}/toggle`, {
      method: 'POST',
        dataSchema: FeatureFlagSchema
    }),

  removeFlag: (id: string) =>
    apiFetch<ApiResponse<void>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}`, {
      method: 'DELETE',
        dataSchema: z.object({}).passthrough()
    }),

  createNote: (body: Partial<ReleaseNote>) =>
    apiFetch<ApiResponse<ReleaseNote>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes`, {
      method: 'POST',
      body: JSON.stringify(body),
        dataSchema: ReleaseNoteSchema
    }),

  updateNote: (id: string, body: Partial<ReleaseNote>) =>
    apiFetch<ApiResponse<ReleaseNote>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: ReleaseNoteSchema
    }),

  removeNote: (id: string) =>
    apiFetch<ApiResponse<void>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes/${id}`, {
      method: 'DELETE',
        dataSchema: z.object({}).passthrough()
    }),
  fetchTenants: () => {
    return apiFetch<ApiResponse<any[]>>('/superadmin/gyms-list');
  },
};

