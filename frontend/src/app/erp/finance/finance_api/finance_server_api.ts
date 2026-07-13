// RESPONSIBILITY: Server-side API fetching for the finance module.
import { ssrApiFetch } from '@/lib/server-api';
import { FinanceUrlConfig } from '@/app/erp/finance/finance_url_config';
import type { Payment, FinanceSummary } from '@/app/erp/finance/finance_types/finance_types';

export const ssrFinanceApi = {
  getPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: { payments: Payment[]; total: number } }>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}${q}`);
  },
  getSummary: () => ssrApiFetch<{ success: boolean; data: FinanceSummary }>(FinanceUrlConfig.BACKEND_API.SUMMARY),
};
