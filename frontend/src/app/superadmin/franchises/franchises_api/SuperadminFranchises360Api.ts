// RESPONSIBILITY: Provides API access for the Franchise 360 & Branch Comparison feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminFranchisesV1UrlConfig } from '@/app/superadmin/franchises/superadmin_franchises_360_url_config';
import { SuperadminFranchisesV1DataSchema, type SuperadminFranchisesV1Data } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesV1Types';
export async function fetchFranchise360(): Promise<ApiResponse<SuperadminFranchisesV1Data>> {
    return apiFetch<ApiResponse<SuperadminFranchisesV1Data>>(SuperadminFranchisesV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminFranchisesV1DataSchema });
}
