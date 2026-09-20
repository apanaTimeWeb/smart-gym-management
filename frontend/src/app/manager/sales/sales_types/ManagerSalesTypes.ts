// RESPONSIBILITY: Provides the implementation for ManagerSalesTypes.ts functionality within its module.
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { SalesMemberSnapshot } from '@/app/manager/sales/sales_types/ManagerSalesMemberSnapshot';
import type { SalesTab } from '@/app/manager/sales/sales_utils/ManagerSalesSharedConstants';



export type PendingPaymentMember = Omit<SalesMemberSnapshot, 'plan'> & {
  plan?: string;
  pendingAmount?: number;
  daysOverdue?: number;
};

export interface OverviewDataPoint {
  month: string;
  revenue: number;
  storeRevenue?: number;
  newMembers?: number;
}

export interface MembershipReportItem {
  id?: number;
  name?: string;
  totalMembers?: number;
  activeMembers?: number;
  revenue?: number;
  plan?: string;
  receivable?: number;
  received?: number;
  remaining?: number;
  refund?: number;
}

export interface MembershipTotals {
  activeCount?: number;
  revenue?: number;
  totalReceivable?: number;
  totalReceived?: number;
  remaining?: number;
  refunds?: number;
}

export interface SalesInitialData {
  overviewData?: OverviewDataPoint[];
  membershipReport?: MembershipReportItem[];
  membershipTotals?: MembershipTotals;
  pendingPayments?: PendingPaymentMember[];
  pendingTotal?: number;
  allMemberships?: SalesMemberSnapshot[];
  allMembershipsTotal?: number;
}

export interface ManagerSalesViewModel {
  tab: SalesTab;
  setTab: (tab: SalesTab) => void;
  search: string;
  setSearch: (search: string) => void;
  customStartDate: string;
  setCustomStartDate: (s: string) => void;
  customEndDate: string;
  setCustomEndDate: (s: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  
  overviewData: OverviewDataPoint[];
  membershipReport: MembershipReportItem[];
  membershipReportTotal: number;
  membershipTotals: MembershipTotals;
  pendingPayments: PendingPaymentMember[];
  pendingTotal: number;
  allMemberships: SalesMemberSnapshot[];
  allMembershipsTotal: number;
  
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  loadAll: () => Promise<void>;
  
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (message: string, type: ManagerToastType) => void;
}
