import { SuperadminReportsV1DataSchema } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_schemas/SuperadminReportsV1ContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config';

import type { SuperadminReportsV1Data } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsV1Types';
import type { ApiResponse } from '@/lib/api';



export async function fetchReportsComparison(params?: Record<string, string>): Promise<ApiResponse<SuperadminReportsV1Data>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return apiFetch<ApiResponse<SuperadminReportsV1Data>>(`${MODULE_URLS.COMPARISON.BACKEND_API.BASE}${query}`, { dataSchema: SuperadminReportsV1DataSchema });
}
