// RESPONSIBILITY: Provides strongly-typed network calls for the sales module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SalesUrlConfig } from '@/app/admin/sales/sales_url_config';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member } from '@/app/admin/sales/sales_types/sales_types';

import { MOCK_ADMIN_SALES_OVERVIEW, MOCK_ADMIN_MEMBERSHIP_REPORT, MOCK_ADMIN_MEMBERSHIP_TOTALS, MOCK_ADMIN_PENDING_PAYMENTS, MOCK_ADMIN_ALL_MEMBERSHIPS } from '@/app/admin/sales/sales_api/AdminSalesMockData';

export const salesApi = {
  fetchOverview: async (branchId?: string, range?: string) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { monthlyRevenue: MOCK_ADMIN_SALES_OVERVIEW } };
  },
  fetchMembershipReport: async (branchId?: string, range?: string) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { report: MOCK_ADMIN_MEMBERSHIP_REPORT, totals: MOCK_ADMIN_MEMBERSHIP_TOTALS } };
  },
  fetchPendingPayments: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { members: MOCK_ADMIN_PENDING_PAYMENTS, total: MOCK_ADMIN_PENDING_PAYMENTS.length } };
  },
  fetchAllMemberships: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: { members: MOCK_ADMIN_ALL_MEMBERSHIPS, total: MOCK_ADMIN_ALL_MEMBERSHIPS.length } };
  },
};
