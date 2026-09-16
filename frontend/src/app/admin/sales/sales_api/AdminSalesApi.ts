import { overviewDataPointSchema, referralDataPointSchema, membershipReportItemSchema, membershipTotalsSchema, pendingPaymentMemberSchema, memberSchema } from '@/app/admin/sales/sales_types/AdminSalesSchemas';
// RESPONSIBILITY: Provides strongly-typed network calls for the sales module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { SalesUrlConfig } from '@/app/admin/sales/admin_sales_url_config';
import type { OverviewDataPoint, ReferralDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import { z } from "zod";

export const salesApi = {
  fetchOverview: async (branchId?: string, range?: string) => {
    return apiFetch<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>>(SalesUrlConfig.BACKEND_API.OVERVIEW, { method: 'GET', dataSchema: z.object({ monthlyRevenue: z.array(overviewDataPointSchema) }) });
  },
  fetchReferralSources: async (branchId?: string, range?: string) => {
    return apiFetch<ApiResponse<ReferralDataPoint[]>>(SalesUrlConfig.BACKEND_API.REFERRAL_SOURCES, { method: 'GET', dataSchema: z.array(referralDataPointSchema) });
  },
  fetchMembershipReport: async (branchId?: string, range?: string) => {
    return apiFetch<ApiResponse<{ report: MembershipReportItem[], totals: MembershipTotals }>>(SalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT, { method: 'GET', dataSchema: z.object({ report: z.array(membershipReportItemSchema), totals: membershipTotalsSchema }) });
  },
  fetchPendingPayments: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ members: PendingPaymentMember[], total: number }>>(SalesUrlConfig.BACKEND_API.PENDING_PAYMENTS, { method: 'GET', dataSchema: z.object({ members: z.array(pendingPaymentMemberSchema), total: z.number() }) });
  },
  fetchAllMemberships: async (params?: Record<string, string>) => {
    return apiFetch<ApiResponse<{ members: Member[], total: number }>>(SalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS, { method: 'GET', dataSchema: z.object({ members: z.array(memberSchema), total: z.number() }) });
  },
};
