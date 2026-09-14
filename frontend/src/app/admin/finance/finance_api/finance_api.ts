import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { FinanceUrlConfig } from '@/app/admin/finance/finance_url_config';
import type { Payment, FinanceSummary, BranchPnlRecord } from '@/app/admin/finance/finance_types/finance_types';
import { z } from "zod";
export const financeApi = {
  fetchPayments: async (params?: Record<string, string>) => {
            return apiFetch('/api/admin/finance/fetchPayments', { method: 'GET', dataSchema: z.unknown() });
        },
  createPayment: async (body: Partial<Payment>) => {
            return apiFetch('/api/admin/finance/createPayment', { method: 'POST', body: JSON.stringify(body), dataSchema: z.unknown() });
        },
  fetchSummary: async (branchId?: string, range?: string) => {
          return apiFetch('/api/admin/finance/fetchSummary', { method: 'GET', dataSchema: z.unknown() });
      },
  fetchBranchPnl: async (period: string) => {
          return apiFetch('/api/admin/finance/fetchBranchPnl', { method: 'GET', dataSchema: z.unknown() });
      },
  fetchExpenses: async (params?: Record<string, string>) => {
          return apiFetch('/api/admin/finance/fetchExpenses', { method: 'GET', dataSchema: z.unknown() });
      },
};
