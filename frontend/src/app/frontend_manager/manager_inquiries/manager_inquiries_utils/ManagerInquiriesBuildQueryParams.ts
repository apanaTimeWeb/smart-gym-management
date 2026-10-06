// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import { MANAGER_INQUIRIES_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConstants';

export interface ManagerInquiriesQueryState {
  currentPage: number;
  debouncedSearch: string;
  statusFilter: string;
  dateFilter: string;
}

/** Builds the server-side inquiry query parameters from the debounced URL state. */
export function ManagerInquiriesBuildQueryParams(state: ManagerInquiriesQueryState): Record<string, string> {
  const params: Record<string, string> = {
    page: String(state.currentPage),
    limit: String(MANAGER_ITEMS_PER_PAGE) };
  if (state.debouncedSearch) params.search = state.debouncedSearch;
  if (state.statusFilter !== MANAGER_INQUIRIES_STATUS_VALUES.ALL_FILTER) params.status = state.statusFilter;
  if (state.dateFilter !== 'all') params.date = state.dateFilter;
  return params;
}
