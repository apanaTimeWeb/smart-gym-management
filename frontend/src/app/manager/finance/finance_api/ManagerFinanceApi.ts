import { ManagerFinanceUrlConfig } from '@/app/manager/finance/finance_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Payment, FinanceSummary, ManagerFinanceExportFormat } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';
import { paymentSchema, financeSummarySchema } from '@/app/manager/finance/finance_schemas/ManagerFinanceSchema';
import { z } from 'zod';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';

export const financeApi = {
  fetchPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ payments: Payment[]; total: number }>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerFinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}${q ? `?${q}` : ''}`, {
      dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() })
    });
  },
  createPayment: async (body: Partial<Payment> & { amount?: number | string }, idempotencyKey: string): Promise<ApiResponse<Payment>> => {
    const payload = { ...body, amount: body.amount === undefined ? undefined : toManagerMinorUnits(body.amount) };
    return apiFetch(ManagerFinanceUrlConfig.BACKEND_API.PAYMENTS_BASE, { method: 'POST', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: paymentSchema });
  },
  fetchPaymentsByMember: async (memberId: string): Promise<ApiResponse<Payment[]>> => {
    return apiFetch(ManagerFinanceUrlConfig.BACKEND_API.PAYMENTS_BY_MEMBER(memberId), { dataSchema: z.array(paymentSchema) });
  },
  fetchFinanceSummary: async (params?: Record<string, string>): Promise<ApiResponse<FinanceSummary>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerFinanceUrlConfig.BACKEND_API.SUMMARY}${q ? `?${q}` : ''}`, { dataSchema: financeSummarySchema });
  },
  exportPaymentsReport: async (format: ManagerFinanceExportFormat): Promise<ApiResponse<{ url: string }>> => {
    return apiFetch(`${ManagerFinanceUrlConfig.BACKEND_API.EXPORT}?format=${format}`, { dataSchema: z.object({ url: z.string() }) });
  } };
