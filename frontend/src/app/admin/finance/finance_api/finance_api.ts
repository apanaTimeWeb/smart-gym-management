import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { FinanceUrlConfig } from '@/app/admin/finance/finance_url_config';
import { MOCK_ADMIN_FINANCE_SUMMARY, MOCK_ADMIN_PAYMENTS, MOCK_ADMIN_BRANCH_PNL } from '@/app/admin/finance/finance_api/AdminFinanceMockData';
import type { Payment, FinanceSummary, BranchPnlRecord } from '@/app/admin/finance/finance_types/finance_types';

let mockPayments = [...MOCK_ADMIN_PAYMENTS];

export const financeApi = {
  fetchPayments: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { payments: mockPayments, total: mockPayments.length } };
  },
  createPayment: async (body: Partial<Payment>) => {
    await new Promise(res => setTimeout(res, 400));
    const newPayment = { ...body, id: `p${Date.now()}`, paidAt: new Date().toISOString() } as Payment;
    mockPayments = [newPayment, ...mockPayments];
    return { success: true, message: 'Created', data: newPayment };
  },
  fetchSummary: async (branchId?: string, range?: string) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_FINANCE_SUMMARY };
  },
  fetchBranchPnl: async (period: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_ADMIN_BRANCH_PNL };
  },
  fetchExpenses: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: [] };
  },
};
