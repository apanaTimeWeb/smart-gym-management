// RESPONSIBILITY: Provides typed API access for Superadmin background-job list and mutation operations.
import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { JobsUrlConfig } from '@/app/superadmin/jobs/superadmin_jobs_url_config';
import { BackgroundJobSchema } from '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types';
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types';

const CountResponseSchema = z.object({ affectedCount: z.number().nonnegative() });

type CountResponse = z.infer<typeof CountResponseSchema>;

export const jobsApi = {
    fetchJobs: (params?: Record<string, string>) => {
        const query = params ? `?${new URLSearchParams(params).toString()}` : '';
        return apiFetch<ApiResponse<BackgroundJob[]>>(`${JobsUrlConfig.BACKEND_API.BASE}${query}`, {
            dataSchema: z.array(BackgroundJobSchema),
        });
    },
    retryAllJobs: () => apiFetch<ApiResponse<{ queuedCount: number }>>(`${JobsUrlConfig.BACKEND_API.BASE}/retry-all`, {
        method: 'POST',
        dataSchema: z.object({ queuedCount: z.number().nonnegative() }),
    }),
    retryJob: (id: string) => apiFetch<ApiResponse<BackgroundJob>>(`${JobsUrlConfig.BACKEND_API.BASE}/${id}/retry`, {
        method: 'POST',
        dataSchema: BackgroundJobSchema,
    }),
    cancelJob: (id: string) => apiFetch<ApiResponse<BackgroundJob>>(`${JobsUrlConfig.BACKEND_API.BASE}/${id}/cancel`, {
        method: 'POST',
        dataSchema: BackgroundJobSchema,
    }),
    deleteJob: (id: string) => apiFetch<ApiResponse<null>>(`${JobsUrlConfig.BACKEND_API.BASE}/${id}`, {
        method: 'DELETE',
        dataSchema: z.null(),
    }),
    clearCompletedJobs: () => apiFetch<ApiResponse<CountResponse>>(`${JobsUrlConfig.BACKEND_API.BASE}/clear-completed`, {
        method: 'POST',
        dataSchema: CountResponseSchema,
    }),
    bulkRetryJobs: (ids: string[]) => apiFetch<ApiResponse<CountResponse>>(`${JobsUrlConfig.BACKEND_API.BASE}/bulk-retry`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json' },
        dataSchema: CountResponseSchema,
    }),
    bulkDeleteJobs: (ids: string[]) => apiFetch<ApiResponse<CountResponse>>(`${JobsUrlConfig.BACKEND_API.BASE}/bulk-delete`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json' },
        dataSchema: CountResponseSchema,
    }),
};
