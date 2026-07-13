// RESPONSIBILITY: sales_types.ts handles the logic and UI for its corresponding feature.
import { type SalesTab, type DateFilter } from '@/app/erp/sales/sales_utils/SalesSharedConstants';

export interface SalesContextType {
 tab: SalesTab;
 setTab: (t: SalesTab) => void;
  dateFilter: DateFilter;
  setDateFilter: (d: DateFilter) => void;
  search: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  
  overviewData: any[];
  membershipReport: any[];
  membershipTotals: any;
  pendingPayments: any[];
  pendingTotal: number;
  allMemberships: any[];
  allMembershipsTotal: number;
  loading: boolean;
  
  loadAll: () => Promise<void>;
  
  toast: { message: string; type: any } | null;
  showToast: (message: string, type: any) => void;
}

