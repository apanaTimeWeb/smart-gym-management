// RESPONSIBILITY: Server-side Sales data access using the same Zod contracts as the client API.
import { ssrApiFetch } from '@/lib/server-api';
import { SalesUrlConfig } from '@/app/admin/sales/admin_sales_url_config';
import { z } from 'zod';
import {
  overviewDataPointSchema, membershipReportItemSchema, membershipTotalsSchema, pendingPaymentMemberSchema, memberSchema, storeOrdersResponseSchema, storeOrdersSummaryResponseSchema,
} from '@/app/admin/sales/sales_types/AdminSalesSchemas';
import type { ApiResponse } from '@/lib/api';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member, StoreOrder, StoreSummary } from '@/app/admin/sales/sales_types/AdminSalesTypes';

const overviewResponseSchema = z.object({ monthlyRevenue: z.array(overviewDataPointSchema) });
const membershipReportResponseSchema = z.object({ report: z.array(membershipReportItemSchema), totals: membershipTotalsSchema });
const pendingPaymentsResponseSchema = z.object({ members: z.array(pendingPaymentMemberSchema), total: z.number() });
const membershipsResponseSchema = z.object({ members: z.array(memberSchema), total: z.number() });

function withQuery(base: string, params?: Record<string, string>): string {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return `${base}${query}`;
}

export const ssrSalesApi = {
  fetchOverview: () => ssrApiFetch<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>>(SalesUrlConfig.BACKEND_API.OVERVIEW),
  fetchMembershipReport: (params?: Record<string, string>) => ssrApiFetch<ApiResponse<{ report: MembershipReportItem[]; totals: MembershipTotals }>>(withQuery(SalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT, params)),
  fetchPendingPayments: (params?: Record<string, string>) => ssrApiFetch<ApiResponse<{ members: PendingPaymentMember[]; total: number }>>(withQuery(SalesUrlConfig.BACKEND_API.PENDING_PAYMENTS, params)),
  fetchAllMemberships: (params?: Record<string, string>) => ssrApiFetch<ApiResponse<{ members: Member[]; total: number }>>(withQuery(SalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS, params)),
  fetchStoreOrders: (params?: Record<string, string>) => ssrApiFetch<ApiResponse<{ orders: StoreOrder[]; total: number }>>(withQuery(SalesUrlConfig.BACKEND_API.STORE_ORDERS, params)),
  fetchStoreSummary: (params?: Record<string, string>) => ssrApiFetch<ApiResponse<{ summary: StoreSummary }>>(withQuery(SalesUrlConfig.BACKEND_API.STORE_SUMMARY, params)),
};
