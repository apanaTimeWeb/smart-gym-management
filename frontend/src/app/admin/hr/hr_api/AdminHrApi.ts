import { z } from 'zod';
// RESPONSIBILITY: Provides strongly-typed network calls for the hr module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { HrUrlConfig } from '@/app/admin/hr/hr_url_config';

import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { StaffPerformanceRecord, PerformancePeriod } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

export const hrApi = {
  getStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch<ApiResponse<any>>(`${HrUrlConfig.BACKEND_API.STAFF_BASE}${query ? '?' + query : ''}`, { dataSchema: z.any() });
  },
  getOneStaff: async (id: string) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.STAFF_GET_ONE(id), { dataSchema: z.any() }),
  createStaff: async (body: Partial<Staff>) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.STAFF_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() }),
  updateStaff: async (id: string, body: Partial<Staff>) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.STAFF_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.any() }),
  removeStaff: async (id: string) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.STAFF_DELETE(id), { method: 'DELETE', dataSchema: z.any() }),
  bulkDeactivateStaff: async (ids: string[]) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.BULK_DEACTIVATE, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.any() }),
  getPayrolls: async (params?: Record<string, string>) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.PAYROLLS_BASE, { dataSchema: z.any() }),
  createPayroll: async (body: Partial<Payroll>) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.PAYROLLS_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() }),
  updatePayroll: async (id: string, body: Partial<Payroll>) => apiFetch<ApiResponse<any>>(`${HrUrlConfig.BACKEND_API.PAYROLLS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.any() }),
  updatePayrollStatus: async (id: string, status: string) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.PAYROLL_STATUS_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ status }), dataSchema: z.any() }),
  getSummary: async (branchId?: string) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.SUMMARY, { dataSchema: z.any() }),
  getLedger: async (staffId: string) => apiFetch<ApiResponse<any>>(`${HrUrlConfig.BACKEND_API.STAFF_GET_ONE(staffId)}/ledger`, { dataSchema: z.any() }),
  giveAdvance: async (data: any) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.ADVANCES, { method: 'POST', body: JSON.stringify(data), dataSchema: z.any() }),
  payDue: async (data: any) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.DUES_PAY, { method: 'POST', body: JSON.stringify(data), dataSchema: z.any() }),
  fetchStaffPerformance: async (period: PerformancePeriod) => apiFetch<ApiResponse<any>>(HrUrlConfig.BACKEND_API.PERFORMANCE, { dataSchema: z.any() }),
};
