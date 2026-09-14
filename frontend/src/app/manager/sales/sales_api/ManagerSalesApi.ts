import { apiFetch, type ApiResponse } from '@/lib/api';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import type { SalesMemberSnapshot } from '@/app/manager/sales/sales_types/ManagerSalesMemberSnapshot';

export const salesApi = {
  getOverview: async (params?: Record<string, string>): Promise<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/sales/overview${query ? `?${query}` : ''}`);
  },
  
  getMembershipReport: async (params?: Record<string, string>): Promise<ApiResponse<{ report: MembershipReportItem[]; totals: MembershipTotals }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/sales/membership-report${query ? `?${query}` : ''}`);
  },
  
  getPendingPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ members: PendingPaymentMember[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/sales/pending-payments${query ? `?${query}` : ''}`);
  },
  
  getAllMemberships: async (params?: Record<string, string>): Promise<ApiResponse<{ members: SalesMemberSnapshot[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`/manager/sales/all-memberships${query ? `?${query}` : ''}`);
  },
};
