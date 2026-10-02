import { z } from 'zod';
import { TenantHealthScoreSchema, RevenueRowSchema, CancellationsRecordSchema } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_schemas/SuperadminReportsContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminReportsApi owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes, @/lib/api, @/lib/api, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config, zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_reports_api.ts
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config';

import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';
import type { ApiResponse } from '@/lib/api';


export const superadminReportsApi = {
    fetchRevenueData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<RevenueRow[]>>(`${MODULE_URLS.BACKEND_API.BASE}/revenue${q}`, { dataSchema: z.array(RevenueRowSchema) });
    },
    fetchCancellationsData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<CancellationsRecord[]>>(`${MODULE_URLS.BACKEND_API.BASE}/cancellations${q}`, { dataSchema: z.array(CancellationsRecordSchema) });
    },
    fetchHealthData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<TenantHealthScore[]>>(`${MODULE_URLS.BACKEND_API.BASE}/health${q}`, { dataSchema: z.array(TenantHealthScoreSchema) });
    },
};
