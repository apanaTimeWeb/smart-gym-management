import { type SalesTab, type DateFilter } from '../sales_utils/SalesSharedConstants';

export interface SalesContextType {
  tab: SalesTab;
  setTab: (t: SalesTab) => void;
  dateFilter: DateFilter;
  setDateFilter: (d: DateFilter) => void;
}
