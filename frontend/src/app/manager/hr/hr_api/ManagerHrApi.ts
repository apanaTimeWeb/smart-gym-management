import { ManagerHrUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import { staffSchema, payrollSchema, hrSummarySchema, ledgerEntrySchema } from '@/app/manager/hr/hr_types/ManagerHrSchema';
import { z } from 'zod';

export const hrApi = {
  getStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: Staff[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff${query ? `?${query}` : ''}`, { dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },
  getOneStaff: async (id: string): Promise<ApiResponse<Staff>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { dataSchema: staffSchema });
  },
  createStaff: async (body: Partial<Staff>): Promise<ApiResponse<Staff>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff`, { method: 'POST', body: JSON.stringify(body), dataSchema: staffSchema });
  },
  updateStaff: async (id: string, body: Partial<Staff>): Promise<ApiResponse<Staff>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: staffSchema });
  },
  removeStaff: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { method: 'DELETE', dataSchema: z.object({ id: z.string() }) });
  },
  getPayrolls: async (params?: Record<string, string>): Promise<ApiResponse<{ payrolls: Payroll[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/payrolls${query ? `?${query}` : ''}`, { dataSchema: z.object({ payrolls: z.array(payrollSchema), total: z.number() }) });
  },
  generatePayrolls: async (month: string): Promise<ApiResponse<{ payrolls: Payroll[] }>> => {
    return apiFetch(ManagerHrUrlConfig.BACKEND_API.PAYROLL_GENERATE, { method: 'POST', body: JSON.stringify({ month }), dataSchema: z.object({ payrolls: z.array(payrollSchema) }) });
  },
  createPayroll: async (body: Partial<Payroll>): Promise<ApiResponse<Payroll>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/payrolls`, { method: 'POST', body: JSON.stringify(body), dataSchema: payrollSchema });
  },
  updatePayroll: async (id: string, body: Partial<Payroll>): Promise<ApiResponse<Payroll>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/payrolls/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: payrollSchema });
  },
  updatePayrollStatus: async (id: string, status: string): Promise<ApiResponse<Payroll>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/payrolls/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }), dataSchema: payrollSchema });
  },
  getSummary: async (): Promise<ApiResponse<HrSummary>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/summary`, { dataSchema: hrSummarySchema });
  },
  getLedger: async (staffId: string): Promise<ApiResponse<{ ledger: LedgerEntry[]; total: number }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/ledger/${staffId}`, { dataSchema: z.object({ ledger: z.array(ledgerEntrySchema), total: z.number() }) });
  },
  giveAdvance: async (data: Record<string, unknown>): Promise<ApiResponse<{ advanceAmount: number }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/ledger/advance`, { method: 'POST', body: JSON.stringify(data), dataSchema: z.unknown() });
  },
  payDue: async (data: Record<string, unknown>): Promise<ApiResponse<{ paidAmount: number }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/ledger/paydue`, { method: 'POST', body: JSON.stringify(data), dataSchema: z.unknown() });
  },
  getStaffAttendance: async (staffId: string, month: string): Promise<ApiResponse<{ history: Array<{ date: string; status: string }> }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff/${staffId}/attendance?month=${month}`, { dataSchema: z.unknown() });
  },
};
