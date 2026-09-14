// RESPONSIBILITY: Modularized API client for the Jobs module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminJobsUrlConfig } from '@/app/superadmin/jobs/superadmin_jobs_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { BackgroundJob } from '@/app/superadmin/superadmin_types/superadmin_types';

export const jobsApi = {
  fetchJobs: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackgroundJob[]>>(`${SuperadminJobsUrlConfig.BACKEND_API.JOBS_BASE}${q}`);
  },
  retryAll: () => apiFetch<ApiResponse<{ queuedCount: number }>>(`${SuperadminJobsUrlConfig.BACKEND_API.JOBS_BASE}/retry-all`, { method: 'POST' }),
};
