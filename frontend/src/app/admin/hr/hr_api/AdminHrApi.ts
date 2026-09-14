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
    return apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/staff${query ? '?' + query : ''}`, { dataSchema: z.any() });
  },
  getOneStaff: async (id: string) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { dataSchema: z.any() }),
  createStaff: async (body: Partial<Staff>) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/staff`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() }),
  updateStaff: async (id: string, body: Partial<Staff>) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.any() }),
  removeStaff: async (id: string) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { method: 'DELETE', dataSchema: z.any() }),
  bulkDeactivateStaff: async (ids: string[]) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/staff/bulk-deactivate`, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.any() }),
  getPayrolls: async (params?: Record<string, string>) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/payrolls`, { dataSchema: z.any() }),
  createPayroll: async (body: Partial<Payroll>) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/payrolls`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() }),
  updatePayroll: async (id: string, body: Partial<Payroll>) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/payrolls/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.any() }),
  updatePayrollStatus: async (id: string, status: string) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/payrolls/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }), dataSchema: z.any() }),
  getSummary: async (branchId?: string) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/summary`, { dataSchema: z.any() }),
  getLedger: async (staffId: string) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/staff/${staffId}/ledger`, { dataSchema: z.any() }),
  giveAdvance: async (data: any) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/advances`, { method: 'POST', body: JSON.stringify(data), dataSchema: z.any() }),
  payDue: async (data: any) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/dues/pay`, { method: 'POST', body: JSON.stringify(data), dataSchema: z.any() }),
  fetchStaffPerformance: async (period: PerformancePeriod) => apiFetch(`${HrUrlConfig.BACKEND_API.BASE}/performance`, { dataSchema: z.any() }),
};
