// DATA FLOW: URL/query state → buildManagerInquiriesQueryParams → inquiries API client.

import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';

interface ManagerInquiriesQueryState {
  currentPage: number;
  debouncedSearch: string;
  statusFilter: string;
  dateFilter: string;
}

/** Builds the server-side inquiry query parameters from the debounced URL state. */
export function buildManagerInquiriesQueryParams(state: ManagerInquiriesQueryState): Record<string, string> {
  const params: Record<string, string> = {
    page: String(state.currentPage),
    limit: String(MANAGER_ITEMS_PER_PAGE) };
  if (state.debouncedSearch) params.search = state.debouncedSearch;
  if (state.statusFilter !== 'All') params.status = state.statusFilter;
  if (state.dateFilter !== 'all') params.date = state.dateFilter;
  return params;
}
