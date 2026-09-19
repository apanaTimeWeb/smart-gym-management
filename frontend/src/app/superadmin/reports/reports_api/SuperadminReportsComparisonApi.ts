// RESPONSIBILITY: Provides isolated API access for Superadmin Report Comparison with explicit period/segment propagation.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminReportsV1UrlConfig } from '@/app/superadmin/reports/superadmin_reports_comparison_url_config';
import { SuperadminReportsV1DataSchema, type SuperadminReportsV1Data } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types';

export async function fetchReportsComparison(params?: Record<string, string>): Promise<ApiResponse<SuperadminReportsV1Data>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return apiFetch<ApiResponse<SuperadminReportsV1Data>>(`${SuperadminReportsV1UrlConfig.BACKEND_API.BASE}${query}`, { dataSchema: SuperadminReportsV1DataSchema });
}
