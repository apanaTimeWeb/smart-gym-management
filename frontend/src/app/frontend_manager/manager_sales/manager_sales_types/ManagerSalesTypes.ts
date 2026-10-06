import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { SalesTab } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesSharedConstants';
import type { SalesMemberSnapshot } from '@/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesMemberSnapshotTypes';



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
