import { z } from 'zod';
import { UsageMeterSchema } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_schemas/SuperadminUsageMetersContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminUsageMetersApi owned by the superadmin_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersTypes, @/lib/api, @/lib/api, @/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersTypes, @/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_url_config, zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_usage_meters_api.ts
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_url_config';

import type { UsageMeter } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersTypes';
import type { ApiResponse } from '@/lib/api';


export const usageMetersApi = {
    fetchUsageMeters: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<UsageMeter[]>>(`${MODULE_URLS.BACKEND_API.BASE}${q}`, { dataSchema: z.array(UsageMeterSchema) });
    },
};
