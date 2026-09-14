import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Payment, FinanceSummary } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';
import { paymentSchema, financeSummarySchema } from '@/app/manager/finance/finance_types/ManagerFinanceSchema';
import { z } from 'zod';

export const financeApi = {
  getPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ payments: Payment[]; total: number }>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/finance/payments${q ? `?${q}` : ''}`, {
      dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() })
    });
  },
  createPayment: async (body: Partial<Payment>): Promise<ApiResponse<Payment>> => {
    return apiFetch(`/manager/finance/payments`, { method: 'POST', body: JSON.stringify(body), dataSchema: paymentSchema });
  },
  getByMember: async (memberId: string): Promise<ApiResponse<Payment[]>> => {
    return apiFetch(`/manager/finance/payments/member/${memberId}`, { dataSchema: z.array(paymentSchema) });
  },
  getSummary: async (params?: Record<string, string>): Promise<ApiResponse<FinanceSummary>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/finance/summary${q ? `?${q}` : ''}`, { dataSchema: financeSummarySchema });
  },
  exportPayments: async (format: 'csv' | 'pdf'): Promise<ApiResponse<{ url: string }>> => {
    return apiFetch(`/manager/finance/export?format=${format}`, { dataSchema: z.object({ url: z.string() }) });
  },
};
