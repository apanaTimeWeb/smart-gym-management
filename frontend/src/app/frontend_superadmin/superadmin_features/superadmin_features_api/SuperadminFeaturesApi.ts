import { SuperadminFeaturesDeleteDataSchema, SuperadminFeaturesHistoryDataSchema, SuperadminFeaturesTenantsDataSchema, SuperadminFeaturesListDataSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesApiSchema';
import { ReleaseNoteSchema, FeatureFlagSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesTypesSchemas';

import { SUPERADMIN_FEATURES_API } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import type { SuperadminFeatureHistoryEntry, FeatureFlag, ReleaseNote, SuperadminFeaturesTenant } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import type { ApiResponse } from '@/lib/api';



export const featuresApi = {
    fetchTenants: () => apiFetch<ApiResponse<SuperadminFeaturesTenant[]>>(SUPERADMIN_FEATURES_API.TENANTS, { dataSchema: SuperadminFeaturesTenantsDataSchema }),
    fetchFeatures: () => apiFetch<ApiResponse<{
        flags: FeatureFlag[];
        notes: ReleaseNote[];
    }>>(SUPERADMIN_FEATURES_API.BASE, {
        dataSchema: SuperadminFeaturesListDataSchema,
    }),

    fetchFeatureFlagHistory: (id: string) => apiFetch<ApiResponse<SuperadminFeatureHistoryEntry[]>>(`${SUPERADMIN_FEATURES_API.BASE}/flags/${id}/history`, {
        dataSchema: SuperadminFeaturesHistoryDataSchema,
    }),
    createFeatureFlag: (body: Partial<FeatureFlag>, idempotencyKey: string) => apiFetch<ApiResponse<FeatureFlag>>(`${SUPERADMIN_FEATURES_API.BASE}/flags`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    updateFeatureFlag: (id: string, body: Partial<FeatureFlag>, idempotencyKey: string) => apiFetch<ApiResponse<FeatureFlag>>(`${SUPERADMIN_FEATURES_API.BASE}/flags/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    toggleFeatureFlag: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<FeatureFlag>>(`${SUPERADMIN_FEATURES_API.BASE}/flags/${id}/toggle`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: FeatureFlagSchema,
    }),
    deleteFeatureFlag: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${SUPERADMIN_FEATURES_API.BASE}/flags/${id}`, {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminFeaturesDeleteDataSchema,
    }),
    createReleaseNote: (body: Partial<ReleaseNote>, idempotencyKey: string) => apiFetch<ApiResponse<ReleaseNote>>(`${SUPERADMIN_FEATURES_API.BASE}/notes`, {
        method: 'POST',
        body: JSON.stringify({ ...body, date: body.date ?? new Date().toISOString() }),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: ReleaseNoteSchema,
    }),
    updateReleaseNote: (id: string, body: Partial<ReleaseNote>, idempotencyKey: string) => apiFetch<ApiResponse<ReleaseNote>>(`${SUPERADMIN_FEATURES_API.BASE}/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: ReleaseNoteSchema,
    }),
    deleteReleaseNote: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<void>>(`${SUPERADMIN_FEATURES_API.BASE}/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminFeaturesDeleteDataSchema,
    }),
};
