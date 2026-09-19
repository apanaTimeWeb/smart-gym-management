import { ManagerSalesUrlConfig } from '@/app/manager/sales/sales_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import { managerSalesOverviewSchema, managerSalesMembershipReportSchema, managerSalesPendingPaymentsSchema, managerSalesAllMembershipsSchema } from '@/app/manager/sales/sales_schemas/ManagerSalesSchema';
import type { SalesMemberSnapshot } from '@/app/manager/sales/sales_types/ManagerSalesMemberSnapshot';

export const salesApi = {
  fetchSalesOverview: async (params?: Record<string, string>): Promise<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.OVERVIEW}${query ? `?${query}` : ''}`, { dataSchema: managerSalesOverviewSchema });
  },
  
  fetchMembershipReport: async (params?: Record<string, string>): Promise<ApiResponse<{ report: MembershipReportItem[]; totals: MembershipTotals }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT}${query ? `?${query}` : ''}`, { dataSchema: managerSalesMembershipReportSchema });
  },
  
  fetchPendingPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ members: PendingPaymentMember[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.PENDING_PAYMENTS}${query ? `?${query}` : ''}`, { dataSchema: managerSalesPendingPaymentsSchema });
  },
  
  fetchAllMemberships: async (params?: Record<string, string>): Promise<ApiResponse<{ members: SalesMemberSnapshot[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS}${query ? `?${query}` : ''}`, { dataSchema: managerSalesAllMembershipsSchema });
  } };
