// RESPONSIBILITY: Server-side API fetching for the hr module.
import { ssrApiFetch } from '@/lib/server-api';
import { HrUrlConfig } from '@/app/erp/hr/hr_url_config';
import type { Staff, Payroll, HrSummary } from '@/app/erp/hr/hr_types/hr_types';

export const ssrHrApi = {
  getStaff: () => ssrApiFetch<{ success: boolean; data: { staff: Staff[]; total: number } }>(HrUrlConfig.BACKEND_API.STAFF_BASE),
  getPayrolls: () => ssrApiFetch<{ success: boolean; data: { payrolls: Payroll[]; total: number } }>(HrUrlConfig.BACKEND_API.PAYROLLS_BASE),
  getSummary: () => ssrApiFetch<{ success: boolean; data: HrSummary }>(HrUrlConfig.BACKEND_API.SUMMARY),
};
