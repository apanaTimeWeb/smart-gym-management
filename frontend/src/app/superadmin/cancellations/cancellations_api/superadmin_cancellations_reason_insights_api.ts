// RESPONSIBILITY: Provides API access for the Why Gyms Leave feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminCancellationsV1UrlConfig } from '@/app/superadmin/cancellations/superadmin_cancellations_reason_insights_url_config';
import { SuperadminCancellationsV1DataSchema, type SuperadminCancellationsV1Data } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsV1Types';
export async function fetchCancellationReasonInsights(): Promise<ApiResponse<SuperadminCancellationsV1Data>> {
    return apiFetch<ApiResponse<SuperadminCancellationsV1Data>>(SuperadminCancellationsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminCancellationsV1DataSchema });
}
