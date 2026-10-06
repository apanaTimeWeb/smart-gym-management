import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { paymentSchema, financeSummarySchema } from '@/app/frontend_manager/manager_finance/manager_finance_schemas/ManagerFinanceSchema';
import { ManagerFinanceUrlConfig } from '@/app/frontend_manager/manager_finance/manager_finance_url_config';
import { toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import type { Payment, FinanceSummary, ManagerFinanceExportFormat } from '@/app/frontend_manager/manager_finance/manager_finance_types/ManagerFinanceTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerFinanceApi implementation for the finance module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_finance/manager_finance_schemas/ManagerFinanceSchema; @/app/frontend_manager/manager_finance/manager_finance_url_config; @/app/frontend_manager/manager_infrastructure/ManagerMoney; @/app/frontend_manager/manager_finance/manager_finance_types/ManagerFinanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerFinanceApi = {
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
