import { type SalesTab, type DateFilter } from '@/app/(erp)/sales/sales_utils/SalesSharedConstants';

export interface SalesContextType {
 tab: SalesTab;
 setTab: (t: SalesTab) => void;
  dateFilter: DateFilter;
  setDateFilter: (d: DateFilter) => void;
  search: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}
