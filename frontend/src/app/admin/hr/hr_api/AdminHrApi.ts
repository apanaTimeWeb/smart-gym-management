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
    return apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/staff${query ? '?' + query : ''}`, { dataSchema: z.any() });
  },
  getOneStaff: async (id: string) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { dataSchema: z.any() }),
  createStaff: async (body: Partial<Staff>) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/staff`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() }),
  updateStaff: async (id: string, body: Partial<Staff>) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.any() }),
  removeStaff: async (id: string) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/staff/${id}`, { method: 'DELETE', dataSchema: z.any() }),
  bulkDeactivateStaff: async (ids: string[]) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/staff/bulk-deactivate`, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.any() }),
  getPayrolls: async (params?: Record<string, string>) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/payrolls`, { dataSchema: z.any() }),
  createPayroll: async (body: Partial<Payroll>) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/payrolls`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() }),
  updatePayroll: async (id: string, body: Partial<Payroll>) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/payrolls/${id}`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.any() }),
  updatePayrollStatus: async (id: string, status: string) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/payrolls/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }), dataSchema: z.any() }),
  getSummary: async (branchId?: string) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/summary`, { dataSchema: z.any() }),
  getLedger: async (staffId: string) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/staff/${staffId}/ledger`, { dataSchema: z.any() }),
  giveAdvance: async (data: any) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/advances`, { method: 'POST', body: JSON.stringify(data), dataSchema: z.any() }),
  payDue: async (data: any) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/dues/pay`, { method: 'POST', body: JSON.stringify(data), dataSchema: z.any() }),
  fetchStaffPerformance: async (period: PerformancePeriod) => apiFetch(`${AdminHrUrlConfig.BACKEND_API.BASE}/performance`, { dataSchema: z.any() }),
};
  },
  getOneStaff: async (id: string) => {
    await new Promise(res => setTimeout(res, 300));
    const staff = mockStaff.find(s => s.id === id);
    if (!staff) throw new Error('Not found');
    return { success: true, message: 'Success', data: staff };
  },
  createStaff: async (body: Partial<Staff>) => {
    await new Promise(res => setTimeout(res, 400));
    const newStaff = { ...body, id: `s${Date.now()}` } as Staff;
    mockStaff.push(newStaff);
    return { success: true, message: 'Created', data: newStaff };
  },
  updateStaff: async (id: string, body: Partial<Staff>) => {
    await new Promise(res => setTimeout(res, 400));
    const idx = mockStaff.findIndex(s => s.id === id);
    if (idx === -1) throw new Error('Not found');
    mockStaff[idx] = { ...mockStaff[idx], ...body } as Staff;
    return { success: true, message: 'Updated', data: mockStaff[idx] };
  },
  removeStaff: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    mockStaff = mockStaff.filter(s => s.id !== id);
    return { success: true, message: 'Deleted', data: { id } };
  },
  bulkDeactivateStaff: async (ids: string[]) => {
    await new Promise(res => setTimeout(res, 400));
    mockStaff = mockStaff.map(s => (ids.includes(s.id) ? { ...s, isActive: false } : s));
    return { success: true, message: 'Deactivated', data: { count: ids.length } };
  },
  getPayrolls: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { payrolls: mockPayrolls, total: mockPayrolls.length } };
  },
  createPayroll: async (body: Partial<Payroll>) => {
    await new Promise(res => setTimeout(res, 400));
    const newPayroll = { ...body, id: `pr${Date.now()}` } as Payroll;
    mockPayrolls.push(newPayroll);
    return { success: true, message: 'Created', data: newPayroll };
  },
  updatePayroll: async (id: string, body: Partial<Payroll>) => {
    await new Promise(res => setTimeout(res, 400));
    const idx = mockPayrolls.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Not found');
    mockPayrolls[idx] = { ...mockPayrolls[idx], ...body } as Payroll;
    return { success: true, message: 'Updated', data: mockPayrolls[idx] };
  },
  updatePayrollStatus: async (id: string, status: string) => {
    await new Promise(res => setTimeout(res, 400));
    const idx = mockPayrolls.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Not found');
    mockPayrolls[idx] = { ...mockPayrolls[idx], status } as Payroll;
    return { success: true, message: 'Updated', data: mockPayrolls[idx] };
  },
  getSummary: async (branchId?: string) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_HR_SUMMARY };
  },
  getLedger: async (staffId: string) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { ledger: MOCK_ADMIN_LEDGER, total: MOCK_ADMIN_LEDGER.length } };
  },
  giveAdvance: async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Advance recorded', data: { advanceAmount: data.amount } };
  },
  payDue: async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Due paid', data: { paidAmount: data.amount } };
  },
  fetchStaffPerformance: async (period: PerformancePeriod) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_STAFF_PERFORMANCE };
  },
};
