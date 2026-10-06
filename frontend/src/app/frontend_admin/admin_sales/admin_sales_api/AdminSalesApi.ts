// RESPONSIBILITY: Provides strongly-typed network calls for the sales module.
import { overviewDataPointSchema, referralDataPointSchema, membershipReportItemSchema, membershipTotalsSchema, pendingPaymentMemberSchema, memberSchema, storeOrdersResponseSchema, storeOrdersSummaryResponseSchema } from '@/app/frontend_admin/admin_sales/admin_sales_schemas/AdminSalesSchemas';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/admin_sales_url_config';
import type { OverviewDataPoint, ReferralDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member, StoreOrder, StoreSummary } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesTypes';
import { z } from "zod";

// Serializes only defined, non-empty query parameters (page/limit/search/branchId/range).
/**
 * buildQuery is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function buildQuery(params?: Record<string, string | undefined>): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, String(value)); });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
}

export const AdminSalesApi = {
  fetchOverview: async (branchId?: string, range?: string) => {
    return apiFetch<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>>(`${ADMIN_SALES_API.overview}${buildQuery({ branchId: branchId && branchId !== 'all' ? branchId : undefined, range })}`, { method: 'GET', dataSchema: z.object({ monthlyRevenue: z.array(overviewDataPointSchema) }) });
  },
  fetchReferralSources: async (branchId?: string, range?: string) => {
    return apiFetch<ApiResponse<ReferralDataPoint[]>>(`${ADMIN_SALES_API.referralSources}${buildQuery({ branchId: branchId && branchId !== 'all' ? branchId : undefined, range })}`, { method: 'GET', dataSchema: z.array(referralDataPointSchema) });
  },
  fetchMembershipReport: async (branchId?: string, range?: string, search?: string) => {
    return apiFetch<ApiResponse<{ report: MembershipReportItem[], totals: MembershipTotals }>>(`${ADMIN_SALES_API.membershipReport}${buildQuery({ branchId: branchId && branchId !== 'all' ? branchId : undefined, range, search })}`, { method: 'GET', dataSchema: z.object({ report: z.array(membershipReportItemSchema), totals: membershipTotalsSchema }) });
  },
  fetchPendingPayments: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ members: PendingPaymentMember[], total: number }>>(`${ADMIN_SALES_API.pendingPayments}${buildQuery(params)}`, { method: 'GET', dataSchema: z.object({ members: z.array(pendingPaymentMemberSchema), total: z.number() }) });
  },
  fetchAllMemberships: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ members: Member[], total: number }>>(`${ADMIN_SALES_API.allMemberships}${buildQuery(params)}`, { method: 'GET', dataSchema: z.object({ members: z.array(memberSchema), total: z.number() }) });
  },
  fetchStoreOrders: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ orders: StoreOrder[], total: number }>>(`${ADMIN_SALES_API.storeOrders}${buildQuery(params)}`, { method: 'GET', dataSchema: storeOrdersResponseSchema });
  },
  fetchStoreSummary: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ summary: StoreSummary }>>(`${ADMIN_SALES_API.storeSummary}${buildQuery(params)}`, { method: 'GET', dataSchema: storeOrdersSummaryResponseSchema });
  },
};
