// RESPONSIBILITY: Provides isolated API access for Superadmin branch performance comparison with explicit period/filter propagation.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminBranchesV1UrlConfig } from '@/app/superadmin/branches/superadmin_branches_comparison_url_config';
import { SuperadminBranchesV1DataSchema, type SuperadminBranchesV1Data } from '@/app/superadmin/branches/branches_types/SuperadminBranchesV1Types';

export async function fetchBranchesComparison(params?: Record<string, string>): Promise<ApiResponse<SuperadminBranchesV1Data>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return apiFetch<ApiResponse<SuperadminBranchesV1Data>>(`${SuperadminBranchesV1UrlConfig.BACKEND_API.BASE}${query}`, { dataSchema: SuperadminBranchesV1DataSchema });
}
