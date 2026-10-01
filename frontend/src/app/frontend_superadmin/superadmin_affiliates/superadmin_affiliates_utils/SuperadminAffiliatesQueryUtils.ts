import { SUPERADMIN_AFFILIATE_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_constants/SuperadminAffiliatesConstants';
import type { AffiliateStatusFilter } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';

/** Builds the canonical Affiliates server-query parameters from URL state. */
export function buildSuperadminAffiliatesQueryParams(input: {
  searchQuery: string;
  statusFilter: AffiliateStatusFilter;
  startDate: string;
  endDate: string;
  currentPage: number;
  pageLimit: number;
}): Record<string, string> {
  const params: Record<string, string> = { page: String(input.currentPage), limit: String(input.pageLimit) };
  if (input.searchQuery) params.search = input.searchQuery;
  if (input.statusFilter !== SUPERADMIN_AFFILIATE_ALL_FILTER) params.status = input.statusFilter;
  if (input.startDate) params.startDate = input.startDate;
  if (input.endDate) params.endDate = input.endDate;
  return params;
}
