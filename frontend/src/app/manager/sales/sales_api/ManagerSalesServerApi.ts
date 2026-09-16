import { z } from 'zod';
import { ManagerSalesUrlConfig } from '@/app/manager/sales/sales_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import { managerSalesOverviewSchema, managerSalesMembershipReportSchema, managerSalesPendingPaymentsSchema, managerSalesAllMembershipsSchema } from '@/app/manager/sales/sales_types/ManagerSalesSchema';
import type { SalesMemberSnapshot } from '@/app/manager/sales/sales_types/ManagerSalesMemberSnapshot';

export const ssrSalesApi = {
  fetchSalesOverview: async (): Promise<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>> => {
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.BASE}/overview`, { dataSchema: managerSalesOverviewSchema });
  },
  
  fetchMembershipReport: async (params?: Record<string, string>): Promise<ApiResponse<{ report: MembershipReportItem[]; totals: MembershipTotals }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.BASE}/membership-report${query ? `?${query}` : ''}`, { dataSchema: managerSalesMembershipReportSchema });
  },
  
  fetchPendingPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ members: PendingPaymentMember[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.BASE}/pending-payments${query ? `?${query}` : ''}`, { dataSchema: managerSalesPendingPaymentsSchema });
  },
  
  fetchAllMemberships: async (params?: Record<string, string>): Promise<ApiResponse<{ members: SalesMemberSnapshot[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.BASE}/all-memberships${query ? `?${query}` : ''}`, { dataSchema: managerSalesAllMembershipsSchema });
  },
};
