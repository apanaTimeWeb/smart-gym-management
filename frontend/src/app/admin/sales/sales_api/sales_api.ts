// RESPONSIBILITY: Provides strongly-typed network calls for the sales module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { SalesUrlConfig } from '@/app/admin/sales/sales_url_config';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember, Member } from '@/app/admin/sales/sales_types/sales_types';
import { z } from "zod";

export const salesApi = {
  fetchOverview: async (branchId?: string, range?: string) => {
            return apiFetch('/api/admin/sales/fetchOverview', { method: 'GET', dataSchema: z.unknown() });
        },
  fetchMembershipReport: async (branchId?: string, range?: string) => {
            return apiFetch('/api/admin/sales/fetchMembershipReport', { method: 'GET', dataSchema: z.unknown() });
        },
  fetchPendingPayments: async (params?: Record<string, string>) => {
          return apiFetch('/api/admin/sales/fetchPendingPayments', { method: 'GET', dataSchema: z.unknown() });
      },
  fetchAllMemberships: async (params?: Record<string, string>) => {
          return apiFetch('/api/admin/sales/fetchAllMemberships', { method: 'GET', dataSchema: z.unknown() });
      },
};
