import { ManagerHrUrlConfig } from '@/app/manager/hr/hr_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/manager/hr/hr_types/ManagerHrTypes';

export const hrApi = {
  getStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: Staff[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff${query ? `?${query}` : ''}`);
  },
  getOneStaff: async (id: string): Promise<ApiResponse<Staff>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff/${id}`);
  },
  createStaff: async (body: Partial<Staff>): Promise<ApiResponse<Staff>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff`, { method: 'POST', body: JSON.stringify(body) });
  },
  updateStaff: async (id: string, body: Partial<Staff>): Promise<ApiResponse<Staff>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
  },
  removeStaff: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { method: 'DELETE' });
  },
  getPayrolls: async (params?: Record<string, string>): Promise<ApiResponse<{ payrolls: Payroll[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/payrolls${query ? `?${query}` : ''}`);
  },
  createPayroll: async (body: Partial<Payroll>): Promise<ApiResponse<Payroll>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/payrolls`, { method: 'POST', body: JSON.stringify(body) });
  },
  updatePayroll: async (id: string, body: Partial<Payroll>): Promise<ApiResponse<Payroll>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/payrolls/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
  },
  updatePayrollStatus: async (id: string, status: string): Promise<ApiResponse<Payroll>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/payrolls/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
  },
  getSummary: async (): Promise<ApiResponse<HrSummary>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/summary`);
  },
  getLedger: async (staffId: string): Promise<ApiResponse<{ ledger: LedgerEntry[]; total: number }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/ledger/${staffId}`);
  },
  giveAdvance: async (data: Record<string, unknown>): Promise<ApiResponse<{ advanceAmount: number }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/ledger/advance`, { method: 'POST', body: JSON.stringify(data) });
  },
  payDue: async (data: Record<string, unknown>): Promise<ApiResponse<{ paidAmount: number }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/ledger/paydue`, { method: 'POST', body: JSON.stringify(data) });
  },
  getStaffAttendance: async (staffId: string, month: string): Promise<ApiResponse<{ history: Array<{ date: string; status: string }> }>> => {
    return apiFetch(`${ManagerHrUrlConfig.BACKEND_API.BASE}/staff/${staffId}/attendance?month=${month}`);
  },
};
