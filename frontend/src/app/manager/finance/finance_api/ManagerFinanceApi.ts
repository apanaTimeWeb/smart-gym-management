// RESPONSIBILITY: Provides strongly-typed network calls for the finance module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { FinanceUrlConfig } from '@/app/manager/finance/ManagerFinanceUrlConfig';
import type { Payment, FinanceSummary } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';

import { MOCK_PAYMENTS, MOCK_FINANCE_SUMMARY } from '@/app/manager/finance/finance_fixtures/ManagerFinanceMockData';

export const financeApi = {
  getPayments: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { payments: MOCK_PAYMENTS, total: MOCK_PAYMENTS.length } };
  },
  createPayment: async (body: Partial<Payment>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_PAYMENTS[0] };
  },
  getSummary: async (range?: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_FINANCE_SUMMARY };
  },
  getByMember: async (memberId: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_PAYMENTS.filter(p => p.memberId === memberId) };
  },
};
