import { ManagerFinanceUrlConfig } from '@/app/manager/finance/finance_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Payment, FinanceSummary } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';
import { paymentSchema, financeSummarySchema } from '@/app/manager/finance/finance_types/ManagerFinanceSchema';
import { z } from 'zod';

export const financeApi = {
  fetchPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ payments: Payment[]; total: number }>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerFinanceUrlConfig.BACKEND_API.BASE}/payments${q ? `?${q}` : ''}`, {
      dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() })
    });
  },
  createPayment: async (body: Partial<Payment>): Promise<ApiResponse<Payment>> => {
    return apiFetch(`${ManagerFinanceUrlConfig.BACKEND_API.BASE}/payments`, { method: 'POST', body: JSON.stringify(body), dataSchema: paymentSchema });
  },
  fetchPaymentsByMember: async (memberId: string): Promise<ApiResponse<Payment[]>> => {
    return apiFetch(`${ManagerFinanceUrlConfig.BACKEND_API.BASE}/payments/member/${memberId}`, { dataSchema: z.array(paymentSchema) });
  },
  fetchFinanceSummary: async (params?: Record<string, string>): Promise<ApiResponse<FinanceSummary>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerFinanceUrlConfig.BACKEND_API.BASE}/summary${q ? `?${q}` : ''}`, { dataSchema: financeSummarySchema });
  },
  exportPaymentsReport: async (format: 'csv' | 'pdf'): Promise<ApiResponse<{ url: string }>> => {
    return apiFetch(`${ManagerFinanceUrlConfig.BACKEND_API.BASE}/export?format=${format}`, { dataSchema: z.object({ url: z.string() }) });
  },
};
