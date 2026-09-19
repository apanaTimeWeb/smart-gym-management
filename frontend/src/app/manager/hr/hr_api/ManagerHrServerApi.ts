// RESPONSIBILITY: Server-side API fetching for the hr module.
import { ssrApiFetch } from '@/lib/server-api';
import type { ApiResponse } from '@/lib/api';
import { ManagerHrUrlConfig } from '@/app/manager/hr/hr_url_config';
import type { Staff, Payroll, HrSummary } from '@/app/manager/hr/hr_types/ManagerHrTypes';

export const ssrHrApi = {
  fetchStaff: () => ssrApiFetch<ApiResponse<{ staff: Staff[]; total: number }>>(ManagerHrUrlConfig.BACKEND_API.STAFF_BASE),
  fetchPayrolls: () => ssrApiFetch<ApiResponse<{ payrolls: Payroll[]; total: number }>>(ManagerHrUrlConfig.BACKEND_API.PAYROLLS_BASE),
  fetchHrSummary: () => ssrApiFetch<ApiResponse<HrSummary>>(ManagerHrUrlConfig.BACKEND_API.SUMMARY) };
