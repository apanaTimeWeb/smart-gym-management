import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';
import { FeaturesUrlConfig } from '@/app/superadmin/features/features_url_config';
import { z } from "zod";

export const featuresApi = {
  fetchFeatures: () =>
    apiFetch<ApiResponse<{ flags: FeatureFlag[]; notes: ReleaseNote[] }>>(FeaturesUrlConfig.BACKEND_API.BASE, { dataSchema: z.unknown() }),

  createFlag: (body: Partial<FeatureFlag>) =>
    apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags`, {
      method: 'POST',
      body: JSON.stringify(body),
        dataSchema: z.unknown()
    }),

  updateFlag: (id: string, body: Partial<FeatureFlag>) =>
    apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: z.unknown()
    }),

  toggleFlag: (id: string) =>
    apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}/toggle`, {
      method: 'POST',
        dataSchema: z.unknown()
    }),

  removeFlag: (id: string) =>
    apiFetch<ApiResponse<void>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}`, {
      method: 'DELETE',
        dataSchema: z.unknown()
    }),

  createNote: (body: Partial<ReleaseNote>) =>
    apiFetch<ApiResponse<ReleaseNote>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes`, {
      method: 'POST',
      body: JSON.stringify(body),
        dataSchema: z.unknown()
    }),

  updateNote: (id: string, body: Partial<ReleaseNote>) =>
    apiFetch<ApiResponse<ReleaseNote>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
        dataSchema: z.unknown()
    }),

  removeNote: (id: string) =>
    apiFetch<ApiResponse<void>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes/${id}`, {
      method: 'DELETE',
        dataSchema: z.unknown()
    }),
};
