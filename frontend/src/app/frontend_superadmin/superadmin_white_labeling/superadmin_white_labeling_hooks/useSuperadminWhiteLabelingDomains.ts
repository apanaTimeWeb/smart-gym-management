'use client';

import { useQuery } from '@tanstack/react-query';

import { SuperadminWhiteLabelingApi } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_api/SuperadminWhiteLabelingApi';
import { SUPERADMIN_WHITE_LABELING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_constants/SuperadminWhiteLabelingQueryKeys';

import type { SuperadminWhiteLabelingStatusFilter } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_constants/SuperadminWhiteLabelingConstants';
import type { WhiteLabelDomainsListResponse } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes';

/**
 * @description Queries white-label domains with URL-synchronized filter state so cache identity matches the visible list.
 * @dependencies Uses the owning module API facade and query-key registry.
 * @edge-case Preserves distinct cache entries for search/status combinations and leaves retry/error handling to TanStack Query.
 */
export function useSuperadminWhiteLabelingDomains(params: {
  search: string;
  status: SuperadminWhiteLabelingStatusFilter;
}) {
  return useQuery<WhiteLabelDomainsListResponse>({
    queryKey: SUPERADMIN_WHITE_LABELING_QUERY_KEYS.domains(params),
    queryFn: () => SuperadminWhiteLabelingApi.getDomains(params),
  });
}
