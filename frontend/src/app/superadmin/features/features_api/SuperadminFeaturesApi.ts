// RESPONSIBILITY: API client for the Superadmin Features/Feature Flags module.
import { FeatureFlagSchema, ReleaseNoteSchema, SuperadminFeaturesTenantSchema, SuperadminFeatureHistoryEntrySchema } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import type { SuperadminFeatureHistoryEntry } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { FeatureFlag, ReleaseNote, SuperadminFeaturesTenant } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import { FeaturesUrlConfig } from '@/app/superadmin/features/superadmin_features_url_config';
import { z } from 'zod';
export const featuresApi = {
    fetchTenants: () => apiFetch<ApiResponse<SuperadminFeaturesTenant[]>>(FeaturesUrlConfig.BACKEND_API.TENANTS, { dataSchema: z.array(SuperadminFeaturesTenantSchema) }),
    fetchFeatures: () => apiFetch<ApiResponse<{
        flags: FeatureFlag[];
        notes: ReleaseNote[];
    }>>(FeaturesUrlConfig.BACKEND_API.BASE, {
        dataSchema: z.object({
            flags: z.array(FeatureFlagSchema),
            notes: z.array(ReleaseNoteSchema),
        }),
    }),

    fetchFeatureFlagHistory: (id: string) => apiFetch<ApiResponse<SuperadminFeatureHistoryEntry[]>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}/history`, {
        dataSchema: z.array(SuperadminFeatureHistoryEntrySchema),
    }),
    createFeatureFlag: (body: Partial<FeatureFlag>, idempotencyKey?: string) => apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: FeatureFlagSchema,
    }),
    updateFeatureFlag: (id: string, body: Partial<FeatureFlag>, idempotencyKey?: string) => apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: FeatureFlagSchema,
    }),
    activateFeatureFlag: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}/toggle`, {
        method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: FeatureFlagSchema,
    }),
    suspendFeatureFlag: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<FeatureFlag>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}/toggle`, {
        method: 'POST',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: FeatureFlagSchema,
    }),
    deleteFeatureFlag: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/flags/${id}`, {
        method: 'DELETE',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.null(),
    }),
    createReleaseNote: (body: Partial<ReleaseNote>, idempotencyKey?: string) => apiFetch<ApiResponse<ReleaseNote>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: ReleaseNoteSchema,
    }),
    updateReleaseNote: (id: string, body: Partial<ReleaseNote>, idempotencyKey?: string) => apiFetch<ApiResponse<ReleaseNote>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: ReleaseNoteSchema,
    }),
    deleteReleaseNote: (id: string, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(`${FeaturesUrlConfig.BACKEND_API.BASE}/notes/${id}`, {
        method: 'DELETE',
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.null(),
    }),
};
