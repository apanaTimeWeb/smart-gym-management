import { z } from 'zod';
import { ManagerSalesUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import { managerSalesOverviewSchema, managerSalesMembershipReportSchema, managerSalesPendingPaymentsSchema, managerSalesAllMembershipsSchema } from '@/app/manager/sales/sales_types/ManagerSalesSchema';
import type { SalesMemberSnapshot } from '@/app/manager/sales/sales_types/ManagerSalesMemberSnapshot';

export const salesApi = {
  getOverview: async (params?: Record<string, string>): Promise<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.BASE}/overview${query ? `?${query}` : ''}`, { dataSchema: managerSalesOverviewSchema });
  },
  
  getMembershipReport: async (params?: Record<string, string>): Promise<ApiResponse<{ report: MembershipReportItem[]; totals: MembershipTotals }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.BASE}/membership-report${query ? `?${query}` : ''}`, { dataSchema: managerSalesMembershipReportSchema });
  },
  
  getPendingPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ members: PendingPaymentMember[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.BASE}/pending-payments${query ? `?${query}` : ''}`, { dataSchema: managerSalesPendingPaymentsSchema });
  },
  
  getAllMemberships: async (params?: Record<string, string>): Promise<ApiResponse<{ members: SalesMemberSnapshot[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerSalesUrlConfig.BACKEND_API.BASE}/all-memberships${query ? `?${query}` : ''}`, { dataSchema: managerSalesAllMembershipsSchema });
  },
};
