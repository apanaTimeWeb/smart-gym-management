import { BackgroundJobSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsSchema';
import { SuperadminJobsNullDataSchema, SuperadminJobsRetryAllDataSchema, SuperadminJobsListDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsApiSchema';
import { CountResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsCountSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsJobsApi owned by the superadmin_system_ops_jobs feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsApiSchema, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_url_config, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsSchema, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsCountSchema, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsCountTypes, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides typed API access for Superadmin background-job list and mutation operations.
import { SUPERADMIN_SYSTEM_OPS_JOBS_API } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_url_config';

import type { CountResponse } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsCountTypes';
import type { BackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes';
import type { ApiResponse } from '@/lib/api';



export const jobsApi = {
    fetchJobs: (params?: Record<string, string>) => {
        const query = params ? `?${new URLSearchParams(params).toString()}` : '';
        return apiFetch<ApiResponse<BackgroundJob[]>>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}${query}`, {
            dataSchema: SuperadminJobsListDataSchema,
        });
    },
    retryAllJobs: (idempotencyKey: string) => apiFetch<ApiResponse<{ queuedCount: number }>>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}/retry-all`, {
        method: 'POST',
        dataSchema: SuperadminJobsRetryAllDataSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    retryJob: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BackgroundJob>>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}/${id}/retry`, {
        method: 'POST',
        dataSchema: BackgroundJobSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    cancelJob: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BackgroundJob>>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}/${id}/cancel`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: BackgroundJobSchema,
    }),
    deleteJob: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}/${id}`, {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminJobsNullDataSchema,
    }),
    clearCompletedJobs: (idempotencyKey: string) => apiFetch<ApiResponse<CountResponse>>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}/clear-completed`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
    bulkRetryJobs: (ids: string[], idempotencyKey: string) => apiFetch<ApiResponse<CountResponse>>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}/bulk-retry`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
    bulkDeleteJobs: (ids: string[], idempotencyKey: string) => apiFetch<ApiResponse<CountResponse>>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}/bulk-delete`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
};
