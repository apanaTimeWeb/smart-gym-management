import { apiFetch, type ApiResponse } from '@/lib/api';
import { FinanceUrlConfig } from '@/app/admin/finance/finance_url_config';
import type { Payment, FinanceSummary, BranchPnlRecord, Expense } from '@/app/admin/finance/finance_types/finance_types';
import { z } from "zod";
export const financeApi = {
  fetchPayments: async (params?: Record<string, string>) => {
            return apiFetch<ApiResponse<{ payments: Payment[]; total: number }>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/fetchPayments`, { method: 'GET', dataSchema: z.unknown() });
        },
  createPayment: async (body: Partial<Payment>) => {
            return apiFetch<ApiResponse<Payment>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/createPayment`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.unknown() });
        },
  fetchSummary: async (branchId?: string, range?: string) => {
          return apiFetch<ApiResponse<FinanceSummary>>(`${FinanceUrlConfig.BACKEND_API.SUMMARY}`, { method: 'GET', dataSchema: z.unknown() });
      },
  fetchBranchPnl: async (period: string) => {
          return apiFetch<ApiResponse<BranchPnlRecord[]>>(`${FinanceUrlConfig.BACKEND_API.PNL_COMPARISON}`, { method: 'GET', dataSchema: z.unknown() });
      },
  fetchExpenses: async (params?: Record<string, string>) => {
          return apiFetch<ApiResponse<Expense[]>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}/fetchExpenses`, { method: 'GET', dataSchema: z.unknown() });
      },
};
