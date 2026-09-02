// RESPONSIBILITY: Provides the implementation for sales_types.ts functionality within its module.
import { type SalesTab, type DateFilter } from '@/app/admin/sales/sales_utils/SalesSharedConstants';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
export interface Member {
  id: string; name: string; email: string; phone: string;
  gender: string; address?: string; branch: string;
  planId: string; plan?: { id: string; name: string; tier: string };
  billingCycle: string; status: string;
  joinDate: string; expiryDate: string;
  paidAmount: number; pendingAmount: number; photo?: string;
  createdAt: string;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export type PendingPaymentMember = Omit<Member, 'plan'> & {
  plan?: string;
  pendingAmount?: number;
  daysOverdue?: number;
};

export interface OverviewDataPoint {
  date: string;
  revenue: number;
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
  allMemberships?: Member[];
  allMembershipsTotal?: number;
}

export interface SalesContextType {
  tab: SalesTab;
  setTab: (tab: SalesTab) => void;
  dateFilter: DateFilter;
  setDateFilter: (filter: DateFilter) => void;
  search: string;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  
  overviewData: OverviewDataPoint[];
  membershipReport: MembershipReportItem[];
  membershipTotals: MembershipTotals;
  pendingPayments: PendingPaymentMember[];
  pendingTotal: number;
  allMemberships: Member[];
  allMembershipsTotal: number;
  
  fetchState: FetchState;
  loadAll: () => Promise<void>;
  
  toast: { message: string; type: ToastType } | null;
  showToast: (message: string, type: ToastType) => void;
}
