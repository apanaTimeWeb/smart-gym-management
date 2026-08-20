// RESPONSIBILITY: Provides strongly-typed network calls for the sales module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { SalesUrlConfig } from '@/app/admin/sales/sales_url_config';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/admin/sales/sales_types/sales_types';
import type { Member } from '@/app/admin/members/members_types/members_types';

export const salesApi = {
  getOverview: () => apiFetch<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>>(SalesUrlConfig.BACKEND_API.OVERVIEW),
  getMembershipReport: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ report: MembershipReportItem[]; totals: MembershipTotals }>>(`${SalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT}${q}`);
  },
  getPendingPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ members: PendingPaymentMember[]; total: number }>>(`${SalesUrlConfig.BACKEND_API.PENDING_PAYMENTS}${q}`);
  },
  getAllMemberships: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ members: Member[]; total: number }>>(`${SalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS}${q}`);
  },
};
