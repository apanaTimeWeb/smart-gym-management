import { apiFetch } from '@/lib/api';
import { managerSalesOverviewSchema, managerSalesMembershipReportSchema, managerSalesPendingPaymentsSchema, managerSalesAllMembershipsSchema } from '@/app/frontend_manager/manager_sales/manager_sales_schemas/ManagerSalesSchema';
import { ManagerSalesUrlConfig } from '@/app/frontend_manager/manager_sales/manager_sales_url_config';
import type { SalesMemberSnapshot } from '@/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesMemberSnapshotTypes';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerSalesApi implementation for the sales module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_sales/manager_sales_schemas/ManagerSalesSchema; @/app/frontend_manager/manager_sales/manager_sales_url_config; @/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesMemberSnapshotTypes; @/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerSalesApi = {
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
