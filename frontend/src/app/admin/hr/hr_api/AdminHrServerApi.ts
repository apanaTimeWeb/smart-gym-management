// RESPONSIBILITY: Server-side API fetching for the hr module.
import { ssrApiFetch } from '@/lib/server-api';
import { staffSchema, payrollSchema, hrSummarySchema } from '@/app/admin/hr/hr_types/AdminHrSchemas';
import { z } from 'zod';
import type { ApiResponse } from '@/lib/api';
import { HrUrlConfig } from '@/app/admin/hr/admin_hr_url_config';
import type { Staff, Payroll, HrSummary } from '@/app/admin/hr/hr_types/AdminHrTypes';

export const ssrHrApi = {
  getStaff: () => ssrApiFetch<ApiResponse<{ staff: Staff[]; total: number }>>(HrUrlConfig.BACKEND_API.STAFF_BASE),
  getPayrolls: () => ssrApiFetch<ApiResponse<{ payrolls: Payroll[]; total: number }>>(HrUrlConfig.BACKEND_API.PAYROLLS_BASE),
  getSummary: () => ssrApiFetch<ApiResponse<HrSummary>>(HrUrlConfig.BACKEND_API.SUMMARY),
};
