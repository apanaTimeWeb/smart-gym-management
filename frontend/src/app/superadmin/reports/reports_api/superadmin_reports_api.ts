import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueRow, ChurnRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/reports_types';

import { MOCK_SUPERADMIN_REPORTS_REVENUE, MOCK_SUPERADMIN_REPORTS_CHURN, MOCK_SUPERADMIN_REPORTS_HEALTH } from '@/app/superadmin/reports/reports_api/SuperadminReportsMockData';

export const superadminReportsApi = {
  fetchRevenueData: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_REPORTS_REVENUE };
  },
  fetchChurnData: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_REPORTS_CHURN };
  },
  fetchHealthData: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_REPORTS_HEALTH };
  },
};
