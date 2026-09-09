import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueRow, ChurnRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/reports_types';

export const superadminReportsApi = {
  fetchRevenueData: async () => {
    return apiFetch<ApiResponse<RevenueRow[]>>('/superadmin/reports/revenue');
  },
  fetchChurnData: async () => {
    return apiFetch<ApiResponse<ChurnRecord[]>>('/superadmin/reports/churn');
  },
  fetchHealthData: async () => {
    return apiFetch<ApiResponse<TenantHealthScore[]>>('/superadmin/reports/health');
  },
};
