// RESPONSIBILITY: Server-side API fetching for the sales module.
import { ssrApiFetch } from '@/lib/server-api';
import { SalesUrlConfig } from '@/app/admin/sales/admin_sales_url_config';
import { z } from 'zod';
import type { ApiResponse } from '@/lib/api';
import { overviewDataPointSchema, membershipReportItemSchema, membershipTotalsSchema, pendingPaymentMemberSchema, memberSchema, storeOrdersResponseSchema, storeOrdersSummaryResponseSchema } from '@/app/admin/sales/sales_types/AdminSalesSchemas';

export const ssrSalesApi = {
  fetchOverview: () => ssrApiFetch<ApiResponse<Record<string, unknown>>>(SalesUrlConfig.BACKEND_API.OVERVIEW),
  fetchMembershipReport: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<Record<string, unknown>>>(`${SalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT}${q}`);
  },
  fetchPendingPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<Record<string, unknown>>>(`${SalesUrlConfig.BACKEND_API.PENDING_PAYMENTS}${q}`);
  },
  fetchAllMemberships: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<Record<string, unknown>>>(`${SalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS}${q}`);
  },
  fetchStoreOrders: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<Record<string, unknown>>>(`${SalesUrlConfig.BACKEND_API.STORE_ORDERS}${q}`);
  },
  fetchStoreSummary: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return ssrApiFetch<ApiResponse<Record<string, unknown>>>(`${SalesUrlConfig.BACKEND_API.STORE_SUMMARY}${q}`);
  },
};
