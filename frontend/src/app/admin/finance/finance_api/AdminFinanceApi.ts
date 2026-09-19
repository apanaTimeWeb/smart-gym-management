import { apiFetch, type ApiResponse } from '@/lib/api';
import { FinanceUrlConfig } from '@/app/admin/finance/admin_finance_url_config';
import type { Payment, FinanceSummary, BranchPnlRecord, Expense } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
import { z } from 'zod';
import { paymentSchema, financeSummarySchema, expenseSchema, branchPnlRecordSchema } from '@/app/admin/finance/finance_types/AdminFinanceSchemas';
export const financeApi = {
  fetchPayments: async (params?: Record<string, string>) => {
            const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => query.set(key, value));
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<ApiResponse<{ payments: Payment[]; total: number }>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/fetchPayments${suffix}`, { method: 'GET', dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() }) });
        },
  fetchSummary: async (branchId?: string, range?: string) => {
          return apiFetch<ApiResponse<FinanceSummary>>(`${FinanceUrlConfig.BACKEND_API.SUMMARY}${branchId || range ? `?${new URLSearchParams({ ...(branchId ? { branchId } : {}), ...(range ? { range } : {}) }).toString()}` : ''}`, { method: 'GET', dataSchema: financeSummarySchema });
      },
  fetchBranchPnl: async (period: string, params?: { status?: string; sortKey?: string; sortDir?: string }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value && value !== 'ALL') query.set(key, value); });
    return apiFetch<ApiResponse<BranchPnlRecord[]>>(`${FinanceUrlConfig.BACKEND_API.PNL_COMPARISON}?${query.toString()}`, { method: 'GET', dataSchema: z.array(branchPnlRecordSchema) });
  },
  fetchExpenses: async (params?: Record<string, string>) => {
          const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => query.set(key, value));
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<ApiResponse<{ expenses: Expense[]; total: number; totalAmount: number }>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/fetchExpenses${suffix}`, { method: 'GET', dataSchema: z.object({ expenses: z.array(expenseSchema), total: z.number(), totalAmount: z.number() }) });
      },
};
