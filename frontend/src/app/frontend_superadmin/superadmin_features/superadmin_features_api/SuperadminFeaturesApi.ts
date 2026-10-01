// RESPONSIBILITY: API client for the Superadmin Features/Feature Flags module.
import { FeatureFlagSchema, ReleaseNoteSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesTypesSchemas';
import { SuperadminFeaturesDeleteDataSchema, SuperadminFeaturesHistoryDataSchema, SuperadminFeaturesListDataSchema, SuperadminFeaturesTenantsDataSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesApiSchema';
import { SuperadminFeaturesTenantSchema, SuperadminFeatureHistoryEntrySchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesTypesSchemas';
import { SuperadminFeaturesUrlConfig } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { SuperadminFeatureHistoryEntry } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import type { FeatureFlag, ReleaseNote, SuperadminFeaturesTenant } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import type { ApiResponse } from '@/lib/api';

export const featuresApi = {
    fetchTenants: () => apiFetch<ApiResponse<SuperadminFeaturesTenant[]>>(SuperadminFeaturesUrlConfig.BACKEND_API.TENANTS, { dataSchema: SuperadminFeaturesTenantsDataSchema }),
    fetchFeatures: () => apiFetch<ApiResponse<{
        flags: FeatureFlag[];
        notes: ReleaseNote[];
    }>>(SuperadminFeaturesUrlConfig.BACKEND_API.BASE, {
        dataSchema: SuperadminFeaturesListDataSchema,
    }),

    fetchFeatureFlagHistory: (id: string) => apiFetch<ApiResponse<SuperadminFeatureHistoryEntry[]>>(`${SuperadminFeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}/history`, {
        dataSchema: SuperadminFeaturesHistoryDataSchema,
    }),
    createFeatureFlag: (body: Partial<FeatureFlag>, idempotencyKey: string) => apiFetch<ApiResponse<FeatureFlag>>(`${SuperadminFeaturesUrlConfig.BACKEND_API.BASE}/flags`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    updateFeatureFlag: (id: string, body: Partial<FeatureFlag>, idempotencyKey: string) => apiFetch<ApiResponse<FeatureFlag>>(`${SuperadminFeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    toggleFeatureFlag: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<FeatureFlag>>(`${SuperadminFeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}/toggle`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    deleteFeatureFlag: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${SuperadminFeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}`, {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminFeaturesDeleteDataSchema,
    }),
    createReleaseNote: (body: Partial<ReleaseNote>, idempotencyKey: string) => apiFetch<ApiResponse<ReleaseNote>>(`${SuperadminFeaturesUrlConfig.BACKEND_API.BASE}/notes`, {
        method: 'POST',
        body: JSON.stringify({ ...body, date: body.date ?? new Date().toISOString() }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: ReleaseNoteSchema,
    }),
    updateReleaseNote: (id: string, body: Partial<ReleaseNote>, idempotencyKey: string) => apiFetch<ApiResponse<ReleaseNote>>(`${SuperadminFeaturesUrlConfig.BACKEND_API.BASE}/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: ReleaseNoteSchema,
    }),
    deleteReleaseNote: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${SuperadminFeaturesUrlConfig.BACKEND_API.BASE}/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminFeaturesDeleteDataSchema,
    }),
};
