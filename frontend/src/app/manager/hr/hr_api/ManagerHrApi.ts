// RESPONSIBILITY: Provides strongly-typed network calls for the hr module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { HrUrlConfig } from '@/app/manager/hr/ManagerHrUrlConfig';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/manager/hr/hr_types/ManagerHrTypes';

import { MOCK_STAFF, MOCK_PAYROLLS, MOCK_HR_SUMMARY, MOCK_LEDGER } from '@/app/manager/hr/hr_fixtures/ManagerHrMockData';

export const hrApi = {
  getStaff: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { staff: MOCK_STAFF, total: MOCK_STAFF.length } };
  },
  getOneStaff: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_STAFF.find(s => s.id === id) || MOCK_STAFF[0] };
  },
  createStaff: async (body: Partial<Staff>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Created', data: MOCK_STAFF[0] };
  },
  updateStaff: async (id: string, body: Partial<Staff>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Updated', data: MOCK_STAFF[0] };
  },
  removeStaff: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Removed', data: { id } };
  },
  getPayrolls: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { payrolls: MOCK_PAYROLLS, total: MOCK_PAYROLLS.length } };
  },
  createPayroll: async (body: Partial<Payroll>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Created', data: MOCK_PAYROLLS[0] };
  },
  updatePayroll: async (id: string, body: Partial<Payroll>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Updated', data: MOCK_PAYROLLS[0] };
  },
  updatePayrollStatus: async (id: string, status: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Updated', data: MOCK_PAYROLLS[0] };
  },
  getSummary: async () => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_HR_SUMMARY };
  },
  getLedger: async (staffId: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { ledger: MOCK_LEDGER, total: MOCK_LEDGER.length } };
  },
  giveAdvance: async (data: any) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { advanceAmount: data.amount } };
  },
  payDue: async (data: any) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { paidAmount: data.amount } };
  },
};
