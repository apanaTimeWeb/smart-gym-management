// RESPONSIBILITY: Modularized API client for the Jobs module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { JobsUrlConfig } from '@/app/superadmin/jobs/superadmin_jobs_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types';
import { z } from "zod";
import { BackgroundJobSchema } from '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types';

export const jobsApi = {
  fetchJobs: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackgroundJob[]>>(`${JobsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(BackgroundJobSchema) });
  },
  retryAllJobs: () => apiFetch<ApiResponse<{ queuedCount: number }>>(`${JobsUrlConfig.BACKEND_API.BASE}/retry-all`, { method: 'POST',
      dataSchema: z.object({ queuedCount: z.number() })
}),
};
