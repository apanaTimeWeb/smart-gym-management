import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { FinanceUrlConfig } from '@/app/admin/finance/finance_url_config';
import type { Payment, FinanceSummary, BranchPnlRecord } from '@/app/admin/finance/finance_types/finance_types';
import { z } from "zod";
export const financeApi = {
  fetchPayments: async (params?: Record<string, string>) => {
            return apiFetch(`${FinanceUrlConfig.BACKEND_API.BASE}/fetchPayments`, { method: 'GET', dataSchema: z.any() });
        },
  createPayment: async (body: Partial<Payment>) => {
            return apiFetch(`${FinanceUrlConfig.BACKEND_API.BASE}/createPayment`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() });
        },
  fetchSummary: async (branchId?: string, range?: string) => {
          return apiFetch(`${FinanceUrlConfig.BACKEND_API.BASE}/fetchSummary`, { method: 'GET', dataSchema: z.any() });
      },
  fetchBranchPnl: async (period: string) => {
          return apiFetch(`${FinanceUrlConfig.BACKEND_API.BASE}/fetchBranchPnl`, { method: 'GET', dataSchema: z.any() });
      },
  fetchExpenses: async (params?: Record<string, string>) => {
          return apiFetch(`${FinanceUrlConfig.BACKEND_API.BASE}/fetchExpenses`, { method: 'GET', dataSchema: z.any() });
      },
};
