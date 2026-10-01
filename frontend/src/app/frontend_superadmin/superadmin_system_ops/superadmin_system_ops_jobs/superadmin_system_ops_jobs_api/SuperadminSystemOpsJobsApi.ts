// RESPONSIBILITY: Provides typed API access for Superadmin background-job list and mutation operations.
import { SuperadminJobsListDataSchema, SuperadminJobsNullDataSchema, SuperadminJobsRetryAllDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminSystemOpsJobsUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_url_config';
import { BackgroundJobSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsSchema';

import { CountResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsCountSchema';
import type { CountResponse } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsCountTypes';
import type { BackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes';
import type { ApiResponse } from '@/lib/api';


export const jobsApi = {
    fetchJobs: (params?: Record<string, string>) => {
        const query = params ? `?${new URLSearchParams(params).toString()}` : '';
        return apiFetch<ApiResponse<BackgroundJob[]>>(`${SuperadminSystemOpsJobsUrlConfig.BACKEND_API.BASE}${query}`, {
            dataSchema: SuperadminJobsListDataSchema,
        });
    },
    retryAllJobs: (idempotencyKey: string) => apiFetch<ApiResponse<{ queuedCount: number }>>(`${SuperadminSystemOpsJobsUrlConfig.BACKEND_API.BASE}/retry-all`, {
        method: 'POST',
        dataSchema: SuperadminJobsRetryAllDataSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    retryJob: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BackgroundJob>>(`${SuperadminSystemOpsJobsUrlConfig.BACKEND_API.BASE}/${id}/retry`, {
        method: 'POST',
        dataSchema: BackgroundJobSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    cancelJob: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<BackgroundJob>>(`${SuperadminSystemOpsJobsUrlConfig.BACKEND_API.BASE}/${id}/cancel`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: BackgroundJobSchema,
    }),
    deleteJob: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(`${SuperadminSystemOpsJobsUrlConfig.BACKEND_API.BASE}/${id}`, {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminJobsNullDataSchema,
    }),
    clearCompletedJobs: (idempotencyKey: string) => apiFetch<ApiResponse<CountResponse>>(`${SuperadminSystemOpsJobsUrlConfig.BACKEND_API.BASE}/clear-completed`, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
    bulkRetryJobs: (ids: string[], idempotencyKey: string) => apiFetch<ApiResponse<CountResponse>>(`${SuperadminSystemOpsJobsUrlConfig.BACKEND_API.BASE}/bulk-retry`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
    bulkDeleteJobs: (ids: string[], idempotencyKey: string) => apiFetch<ApiResponse<CountResponse>>(`${SuperadminSystemOpsJobsUrlConfig.BACKEND_API.BASE}/bulk-delete`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
};
