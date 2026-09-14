import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { FinanceUrlConfig } from '@/app/admin/finance/finance_url_config';
import type { Payment, FinanceSummary, BranchPnlRecord } from '@/app/admin/finance/finance_types/finance_types';
import { z } from "zod";
export const financeApi = {
  fetchPayments: async (params?: Record<string, string>) => {
            return apiFetch<ApiResponse<any>>(`${FinanceUrlConfig.api.base}/fetchPayments`, { method: 'GET', dataSchema: z.any() });
        },
  createPayment: async (body: Partial<Payment>) => {
            return apiFetch<ApiResponse<any>>(`${FinanceUrlConfig.api.base}/createPayment`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() });
        },
  fetchSummary: async (branchId?: string, range?: string) => {
          return apiFetch<ApiResponse<any>>(`${FinanceUrlConfig.api.base}/fetchSummary`, { method: 'GET', dataSchema: z.any() });
      },
  fetchBranchPnl: async (period: string) => {
          return apiFetch<ApiResponse<any>>(`${FinanceUrlConfig.api.base}/fetchBranchPnl`, { method: 'GET', dataSchema: z.any() });
      },
  fetchExpenses: async (params?: Record<string, string>) => {
          return apiFetch<ApiResponse<any>>(`${FinanceUrlConfig.api.base}/fetchExpenses`, { method: 'GET', dataSchema: z.any() });
      },
};
