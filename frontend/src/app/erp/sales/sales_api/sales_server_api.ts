// RESPONSIBILITY: Server-side API fetching for the sales module.
import { ssrApiFetch } from '@/lib/server-api';
import { SalesUrlConfig } from '@/app/erp/sales/sales_url_config';

export const ssrSalesApi = {
  getOverview: () => ssrApiFetch<{ success: boolean; data: any }>(SalesUrlConfig.BACKEND_API.OVERVIEW),
  getMembershipReport: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: any }>(`${SalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT}${q}`);
  },
  getPendingPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: any }>(`${SalesUrlConfig.BACKEND_API.PENDING_PAYMENTS}${q}`);
  },
  getAllMemberships: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<{ success: boolean; data: any }>(`${SalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS}${q}`);
  },
};
