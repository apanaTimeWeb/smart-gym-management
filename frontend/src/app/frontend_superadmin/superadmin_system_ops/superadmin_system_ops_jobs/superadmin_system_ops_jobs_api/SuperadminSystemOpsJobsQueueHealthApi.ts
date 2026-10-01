// RESPONSIBILITY: Provides API access for the Background Job Queue Health feature within Superadmin only.
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminJobsV1UrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_url_config';
import { SuperadminJobsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_schemas/SuperadminSystemOpsJobsV1Schema';

import type { SuperadminJobsV1Data } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsV1Types';
import type { ApiResponse } from '@/lib/api';

export async function fetchJobsQueueHealth(): Promise<ApiResponse<SuperadminJobsV1Data>> {
    return apiFetch<ApiResponse<SuperadminJobsV1Data>>(SuperadminJobsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminJobsV1DataSchema });
}
