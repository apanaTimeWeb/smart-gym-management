// RESPONSIBILITY: Provides API access for the Tenant Growth & Bulk Controls feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminGymsV1UrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_business_controls_url_config';
import { SuperadminGymsV1DataSchema, type SuperadminGymsV1Data } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';
export async function fetchGymsBusinessControls(): Promise<ApiResponse<SuperadminGymsV1Data>> {
    return apiFetch<ApiResponse<SuperadminGymsV1Data>>(SuperadminGymsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminGymsV1DataSchema });
}
