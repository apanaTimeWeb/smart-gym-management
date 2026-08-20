import { apiFetch } from '@/lib/apiFetch';
import type { ApiResponse } from '@/types/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/jobs_types';

export const jobsApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<BackgroundJob[]>>(`${SuperadminUrlConfig.BACKEND_API.JOBS_BASE}${q}`);
  },
};
