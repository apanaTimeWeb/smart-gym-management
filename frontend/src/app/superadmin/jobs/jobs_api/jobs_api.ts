import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { BackgroundJob, JobsMetrics } from '@/app/superadmin/jobs/jobs_types/jobs_types';

export const jobsApi = {
  getAll: () => apiFetch<ApiResponse<{ jobs: BackgroundJob[], metrics: JobsMetrics }>>(SuperadminUrlConfig.BACKEND_API.JOBS_BASE),
};
