// RESPONSIBILITY: Provides API access for the Background Job Queue Health feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminJobsV1UrlConfig } from '@/app/superadmin/system-ops/jobs/superadmin_jobs_queue_health_url_config';
import { SuperadminJobsV1DataSchema, type SuperadminJobsV1Data } from '@/app/superadmin/system-ops/jobs/jobs_types/SuperadminJobsV1Types';
export async function fetchJobsQueueHealth(): Promise<ApiResponse<SuperadminJobsV1Data>> {
    return apiFetch<ApiResponse<SuperadminJobsV1Data>>(SuperadminJobsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminJobsV1DataSchema });
}
