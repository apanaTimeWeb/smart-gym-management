// RESPONSIBILITY: Server-side API fetching for the sales module (currently simulated with mock data).
import type { ApiResponse } from '@/lib/api';
import { 
  MOCK_SALES_OVERVIEW, 
  MOCK_MEMBERSHIP_REPORT, 
  MOCK_PENDING_PAYMENTS, 
  MOCK_ALL_MEMBERSHIPS 
} from '@/app/manager/sales/sales_api/ManagerSalesMockData';
import type { OverviewDataPoint, MembershipReportItem, MembershipTotals, PendingPaymentMember } from '@/app/manager/sales/sales_types/ManagerSalesTypes';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';

export const ssrSalesApi = {
  getOverview: async (): Promise<ApiResponse<{ monthlyRevenue: OverviewDataPoint[] }>> => {
    return { success: true, message: 'Success', data: { monthlyRevenue: MOCK_SALES_OVERVIEW } };
  },
  
  getMembershipReport: async (params?: Record<string, string>): Promise<ApiResponse<{ report: MembershipReportItem[]; totals: MembershipTotals }>> => {
    let report = [...MOCK_MEMBERSHIP_REPORT];
    if (params?.search) {
      const q = params.search.toLowerCase();
      report = report.filter(m => m.name?.toLowerCase().includes(q));
    }
    const totals: MembershipTotals = {
      activeCount: report.length,
      revenue: report.reduce((sum, item) => sum + (item.received || 0), 0),
      totalReceivable: report.reduce((sum, item) => sum + (item.receivable || 0), 0),
      totalReceived: report.reduce((sum, item) => sum + (item.received || 0), 0),
      remaining: report.reduce((sum, item) => sum + (item.remaining || 0), 0),
      refunds: report.reduce((sum, item) => sum + (item.refund || 0), 0),
    };
    return { success: true, message: 'Success', data: { report, totals } };
  },
  
  getPendingPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ members: PendingPaymentMember[]; total: number }>> => {
    let members = [...MOCK_PENDING_PAYMENTS];
    if (params?.search) {
      const q = params.search.toLowerCase();
      members = members.filter(m => m.name?.toLowerCase().includes(q) || m.phone?.includes(q));
    }
    const total = members.reduce((sum, item) => sum + (item.pendingAmount || 0), 0);
    return { success: true, message: 'Success', data: { members, total } };
  },
  
  getAllMemberships: async (params?: Record<string, string>): Promise<ApiResponse<{ members: Member[]; total: number }>> => {
    let members = [...MOCK_ALL_MEMBERSHIPS];
    if (params?.search) {
      const q = params.search.toLowerCase();
      members = members.filter(m => m.name?.toLowerCase().includes(q) || m.phone?.includes(q) || m.email?.toLowerCase().includes(q));
    }
    return { success: true, message: 'Success', data: { members, total: members.length } };
  },
};
