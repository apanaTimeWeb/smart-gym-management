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
    return apiFetch<ApiResponse<{ staff: Staff[]; total: number }>>(`${HrUrlConfig.BACKEND_API.STAFF_BASE}${query ? '?' + query : ''}`, { dataSchema: z.unknown() });
  },
  getOneStaff: async (id: string) => apiFetch<ApiResponse<Staff>>(HrUrlConfig.BACKEND_API.STAFF_GET_ONE(id), { dataSchema: z.unknown() }),
  createStaff: async (body: Partial<Staff>) => apiFetch<ApiResponse<Staff>>(HrUrlConfig.BACKEND_API.STAFF_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: z.unknown() }),
  updateStaff: async (id: string, body: Partial<Staff>) => apiFetch<ApiResponse<Staff>>(HrUrlConfig.BACKEND_API.STAFF_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.unknown() }),
  removeStaff: async (id: string) => apiFetch<ApiResponse<null>>(HrUrlConfig.BACKEND_API.STAFF_DELETE(id), { method: 'DELETE', dataSchema: z.unknown() }),
  bulkDeactivateStaff: async (ids: string[]) => apiFetch<ApiResponse<null>>(HrUrlConfig.BACKEND_API.BULK_DEACTIVATE, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.unknown() }),
  getPayrolls: async (params?: Record<string, string>) => apiFetch<ApiResponse<{ payrolls: Payroll[]; total: number }>>(HrUrlConfig.BACKEND_API.PAYROLLS_BASE, { dataSchema: z.unknown() }),
  createPayroll: async (body: Partial<Payroll>) => apiFetch<ApiResponse<Payroll>>(HrUrlConfig.BACKEND_API.PAYROLLS_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: z.unknown() }),
  updatePayroll: async (id: string, body: Partial<Payroll>) => apiFetch<ApiResponse<Payroll>>(`${HrUrlConfig.BACKEND_API.PAYROLLS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.unknown() }),
  updatePayrollStatus: async (id: string, status: string) => apiFetch<ApiResponse<Payroll>>(HrUrlConfig.BACKEND_API.PAYROLL_STATUS_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ status }), dataSchema: z.unknown() }),
  getSummary: async (branchId?: string) => apiFetch<ApiResponse<HrSummary>>(HrUrlConfig.BACKEND_API.SUMMARY, { dataSchema: z.unknown() }),
  getLedger: async (staffId: string) => apiFetch<ApiResponse<LedgerEntry[]>>(`${HrUrlConfig.BACKEND_API.STAFF_GET_ONE(staffId)}/ledger`, { dataSchema: z.unknown() }),
  giveAdvance: async (data: Record<string, unknown>) => apiFetch<ApiResponse<null>>(HrUrlConfig.BACKEND_API.ADVANCES, { method: 'POST', body: JSON.stringify(data), dataSchema: z.unknown() }),
  payDue: async (data: Record<string, unknown>) => apiFetch<ApiResponse<null>>(HrUrlConfig.BACKEND_API.DUES_PAY, { method: 'POST', body: JSON.stringify(data), dataSchema: z.unknown() }),
  fetchStaffPerformance: async (period: PerformancePeriod) => apiFetch<ApiResponse<StaffPerformanceRecord[]>>(HrUrlConfig.BACKEND_API.PERFORMANCE, { dataSchema: z.unknown() }),
};
