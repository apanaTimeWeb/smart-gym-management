import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_FINANCE_API } from '@/app/frontend_admin/admin_finance/admin_finance_url_config';
import type { Payment, FinanceSummary, BranchPnlRecord, Expense } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';
import { z } from 'zod';
import { paymentSchema, financeSummarySchema, expenseSchema, branchPnlRecordSchema } from '@/app/frontend_admin/admin_finance/admin_finance_schemas/AdminFinanceSchemas';
export const AdminFinanceApi = {
  fetchPayments: async (params?: Record<string, string>) => {
            const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => query.set(key, value));
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<ApiResponse<{ payments: Payment[]; total: number }>>(`${ADMIN_FINANCE_API.payments}${suffix}`, { method: 'GET', dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() }) });
        },
  fetchSummary: async (branchId?: string, range?: string) => {
          return apiFetch<ApiResponse<FinanceSummary>>(`${ADMIN_FINANCE_API.summary}${branchId || range ? `?${new URLSearchParams({ ...(branchId ? { branchId } : {}), ...(range ? { range } : {}) }).toString()}` : ''}`, { method: 'GET', dataSchema: financeSummarySchema });
      },
  fetchBranchPnl: async (period: string, params?: { status?: string; sortKey?: string; sortDir?: string }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value && value !== 'ALL') query.set(key, value); });
    return apiFetch<ApiResponse<BranchPnlRecord[]>>(`${ADMIN_FINANCE_API.pnlComparison}?${query.toString()}`, { method: 'GET', dataSchema: z.array(branchPnlRecordSchema) });
  },
  fetchExpenses: async (params?: Record<string, string>) => {
          const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => query.set(key, value));
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<ApiResponse<{ expenses: Expense[]; total: number; totalAmount: number }>>(`${ADMIN_FINANCE_API.expenses}${suffix}`, { method: 'GET', dataSchema: z.object({ expenses: z.array(expenseSchema), total: z.number(), totalAmount: z.number() }) });
      },
};
