// RESPONSIBILITY: Modularized API client for the Jobs module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { JobsUrlConfig } from '@/app/superadmin/jobs/jobs_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { BackgroundJob } from '@/app/superadmin/superadmin_types/superadmin_types';
import { z } from "zod";

export const jobsApi = {
  fetchJobs: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackgroundJob[]>>(`${JobsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.unknown() });
  },
  retryAll: () => apiFetch<ApiResponse<{ queuedCount: number }>>(`${JobsUrlConfig.BACKEND_API.BASE}/retry-all`, { method: 'POST',
      dataSchema: z.unknown()
}),
};
