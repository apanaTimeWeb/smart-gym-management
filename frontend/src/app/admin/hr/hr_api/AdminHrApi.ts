// RESPONSIBILITY: Provides strongly-typed network calls for the hr module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { HrUrlConfig } from '@/app/admin/hr/hr_url_config';
import { MOCK_ADMIN_STAFF, MOCK_ADMIN_PAYROLLS, MOCK_ADMIN_HR_SUMMARY, MOCK_ADMIN_LEDGER, MOCK_ADMIN_STAFF_PERFORMANCE } from '@/app/admin/hr/hr_api/AdminHrMockData';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { StaffPerformanceRecord, PerformancePeriod } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

let mockStaff = [...MOCK_ADMIN_STAFF];
let mockPayrolls = [...MOCK_ADMIN_PAYROLLS];

export const hrApi = {
  getStaff: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { staff: mockStaff, total: mockStaff.length } };
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
