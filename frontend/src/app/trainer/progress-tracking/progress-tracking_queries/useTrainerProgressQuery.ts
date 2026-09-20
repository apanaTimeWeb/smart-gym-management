'use client';
// RESPONSIBILITY: Owns Trainer Progress server-state queries and keeps pagination/sort inputs in the Query identity.
// DATA FLOW: URL state -> API params -> Zod-validated response -> TanStack Query -> Progress UI.

import { useQuery } from '@tanstack/react-query';
import { fetchProgressEntries, fetchProgressSummary, fetchProgressMembers } from '@/app/trainer/progress-tracking/progress-tracking_api/TrainerProgressApi';
import type { ProgressSortDirection, ProgressSortField } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';

export interface TrainerProgressEntriesQueryParams {
  memberId: string;
  page: number;
  limit: number;
  sortBy: ProgressSortField;
  sortDirection: ProgressSortDirection;
}

/**
 * Fetches the Trainer member selector data through TanStack Query.
 */
export function useTrainerProgressMembersQuery() {
  return useQuery({
    queryKey: ['trainer', 'progress', 'members'],
    queryFn: fetchProgressMembers,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetches paginated progress entries for one member with server-side sorting.
 */
export function useTrainerProgressEntriesQuery(params: TrainerProgressEntriesQueryParams) {
  return useQuery({
    queryKey: ['trainer', 'progress', 'entries', params],
    queryFn: () => fetchProgressEntries(params),
    enabled: Boolean(params.memberId),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetches the authoritative progress summary for a selected member.
 */
export function useTrainerProgressSummaryQuery(memberId: string) {
  return useQuery({
    queryKey: ['trainer', 'progress', 'summary', memberId],
    queryFn: () => fetchProgressSummary(memberId),
    enabled: Boolean(memberId),
    staleTime: 5 * 60 * 1000,
  });
}
