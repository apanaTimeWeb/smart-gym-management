// RESPONSIBILITY: Server-side API fetching for the hr module.
import { ssrApiFetch } from '@/lib/server-api';
import type { ApiResponse } from '@/lib/api';
import { HrUrlConfig } from '@/app/Admin/hr/AdminHrUrlConfig';
import type { Staff, Payroll, HrSummary } from '@/app/Admin/hr/hr_types/AdminHrTypes';

export const ssrHrApi = {
  getStaff: () => ssrApiFetch<ApiResponse<{ staff: Staff[]; total: number }>>(HrUrlConfig.BACKEND_API.STAFF_BASE),
  getPayrolls: () => ssrApiFetch<ApiResponse<{ payrolls: Payroll[]; total: number }>>(HrUrlConfig.BACKEND_API.PAYROLLS_BASE),
  getSummary: () => ssrApiFetch<ApiResponse<HrSummary>>(HrUrlConfig.BACKEND_API.SUMMARY),
};
