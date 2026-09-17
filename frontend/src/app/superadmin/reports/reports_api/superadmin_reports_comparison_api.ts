// RESPONSIBILITY: Provides API access for the Report Comparison feature within Superadmin only.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminReportsV1UrlConfig } from '@/app/superadmin/reports/superadmin_reports_comparison_url_config';
import { SuperadminReportsV1DataSchema, type SuperadminReportsV1Data } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types';
export async function fetchReportsComparison(): Promise<ApiResponse<SuperadminReportsV1Data>> {
    return apiFetch<ApiResponse<SuperadminReportsV1Data>>(SuperadminReportsV1UrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminReportsV1DataSchema });
}
