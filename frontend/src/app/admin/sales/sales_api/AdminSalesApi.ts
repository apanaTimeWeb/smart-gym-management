import { overviewDataPointSchema, referralDataPointSchema, membershipReportItemSchema, membershipTotalsSchema, pendingPaymentMemberSchema, memberSchema, storeOrdersResponseSchema, storeOrdersSummaryResponseSchema } from '@/app/admin/sales/sales_types/AdminSalesSchemas';
// RESPONSIBILITY: Provides strongly-typed network calls for the sales module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { SalesUrlConfig } from '@/app/admin/sales/admin_sales_url_config';
import type { OverviewDataPoint, ReferralDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member, StoreOrder, StoreSummary } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import { z } from "zod";

// Serializes only defined, non-empty query parameters (page/limit/search/branchId/range).
function buildQuery(params?: Record<string, string | undefined>): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export const salesApi = {
  fetchOverview: async (branchId?: string, range?: string) => {
    return apiFetch<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>>(`${SalesUrlConfig.BACKEND_API.OVERVIEW}${buildQuery({ branchId: branchId && branchId !== 'all' ? branchId : undefined, range })}`, { method: 'GET', dataSchema: z.object({ monthlyRevenue: z.array(overviewDataPointSchema) }) });
  },
  fetchReferralSources: async (branchId?: string, range?: string) => {
    return apiFetch<ApiResponse<ReferralDataPoint[]>>(`${SalesUrlConfig.BACKEND_API.REFERRAL_SOURCES}${buildQuery({ branchId: branchId && branchId !== 'all' ? branchId : undefined, range })}`, { method: 'GET', dataSchema: z.array(referralDataPointSchema) });
  },
  fetchMembershipReport: async (branchId?: string, range?: string, search?: string) => {
    return apiFetch<ApiResponse<{ report: MembershipReportItem[], totals: MembershipTotals }>>(`${SalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT}${buildQuery({ branchId: branchId && branchId !== 'all' ? branchId : undefined, range, search })}`, { method: 'GET', dataSchema: z.object({ report: z.array(membershipReportItemSchema), totals: membershipTotalsSchema }) });
  },
  fetchPendingPayments: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ members: PendingPaymentMember[], total: number }>>(`${SalesUrlConfig.BACKEND_API.PENDING_PAYMENTS}${buildQuery(params)}`, { method: 'GET', dataSchema: z.object({ members: z.array(pendingPaymentMemberSchema), total: z.number() }) });
  },
  fetchAllMemberships: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ members: Member[], total: number }>>(`${SalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS}${buildQuery(params)}`, { method: 'GET', dataSchema: z.object({ members: z.array(memberSchema), total: z.number() }) });
  },
  fetchStoreOrders: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ orders: StoreOrder[], total: number }>>(`${SalesUrlConfig.BACKEND_API.STORE_ORDERS}${buildQuery(params)}`, { method: 'GET', dataSchema: storeOrdersResponseSchema });
  },
  fetchStoreSummary: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ summary: StoreSummary }>>(`${SalesUrlConfig.BACKEND_API.STORE_SUMMARY}${buildQuery(params)}`, { method: 'GET', dataSchema: storeOrdersSummaryResponseSchema });
  },
};
