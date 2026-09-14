import { overviewDataPointSchema, membershipReportItemSchema, membershipTotalsSchema, pendingPaymentMemberSchema, memberSchema } from '@/app/admin/sales/sales_types/sales_schemas';
// RESPONSIBILITY: Provides strongly-typed network calls for the sales module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { SalesUrlConfig } from '@/app/admin/sales/sales_url_config';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member } from '@/app/admin/sales/sales_types/sales_types';
import { z } from "zod";

export const salesApi = {
  fetchOverview: async (branchId?: string, range?: string) => {
            return apiFetch<ApiResponse<z.infer<typeof object>>>(`${SalesUrlConfig.BACKEND_API.BASE}/fetchOverview`, { method: 'GET', dataSchema: z.object({ monthlyRevenue: z.array(overviewDataPointSchema) }) });
        },
  fetchMembershipReport: async (branchId?: string, range?: string) => {
            return apiFetch<ApiResponse<z.infer<typeof object>>>(`${SalesUrlConfig.BACKEND_API.BASE}/fetchMembershipReport`, { method: 'GET', dataSchema: z.object({ report: z.array(membershipReportItemSchema), totals: membershipTotalsSchema }) });
        },
  fetchPendingPayments: async (params?: Record<string, string>) => {
          return apiFetch<ApiResponse<z.infer<typeof object>>>(`${SalesUrlConfig.BACKEND_API.BASE}/fetchPendingPayments`, { method: 'GET', dataSchema: z.object({ members: z.array(pendingPaymentMemberSchema), total: z.number() }) });
      },
  fetchAllMemberships: async (params?: Record<string, string>) => {
          return apiFetch<ApiResponse<z.infer<typeof object>>>(`${SalesUrlConfig.BACKEND_API.BASE}/fetchAllMemberships`, { method: 'GET', dataSchema: z.object({ members: z.array(memberSchema), total: z.number() }) });
      },
};
