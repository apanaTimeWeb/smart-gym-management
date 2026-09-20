// RESPONSIBILITY: Server-side API fetching for the Finance module with boundary validation.
import { ssrApiFetch } from '@/lib/server-api';
import { FinanceUrlConfig } from '@/app/admin/finance/admin_finance_url_config';
import { paymentSchema, financeSummarySchema } from '@/app/admin/finance/finance_types/AdminFinanceSchemas';
import type { Payment, FinanceSummary } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
import type { ApiResponse } from '@/lib/api';
import { z } from 'zod';

const paymentsResponseSchema = z.object({ payments: z.array(paymentSchema), total: z.number() });

export const ssrFinanceApi = {
  fetchPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<{ payments: Payment[]; total: number }>>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}${q}`);
  },
  getSummary: () => ssrApiFetch<ApiResponse<FinanceSummary>>(FinanceUrlConfig.BACKEND_API.SUMMARY),
};
