// RESPONSIBILITY: Provides API access for the Plan Comparison & Pricing Control feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminPlansV1UrlConfig } from '@/app/superadmin/plans/superadmin_plans_business_controls_url_config';
import { SuperadminPlansV1DataSchema, type SuperadminPlansV1Data } from '@/app/superadmin/plans/plans_types/SuperadminPlansV1Types';
export async function fetchPlansBusinessControls(): Promise<ApiResponse<SuperadminPlansV1Data>> {
    return apiFetch<ApiResponse<SuperadminPlansV1Data>>(SuperadminPlansV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminPlansV1DataSchema });
}
