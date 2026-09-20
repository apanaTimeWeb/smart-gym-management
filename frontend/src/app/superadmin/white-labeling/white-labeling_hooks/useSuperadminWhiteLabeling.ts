// DATA FLOW: URL state → TanStack Query key/request → module API/MSW → table → drawer mutation → cache reconciliation.
// RESPONSIBILITY: Owns White-labeling server-state queries, URL filter state, and domain-status mutations. No JSX.
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { SuperadminWhiteLabelingApi } from '@/app/superadmin/white-labeling/white-labeling_api/SuperadminWhiteLabelingApi';
import type { UpdateDomainStatusDto, WhiteLabelDomainsListResponse } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingTypes';
import type { SuperadminWhiteLabelingStatusFilter } from '@/app/superadmin/white-labeling/white-labeling_constants/SuperadminWhiteLabelingConstants';

export const DOMAINS_QUERY_KEY = ['superadmin', 'white-labeling', 'domains'] as const;

/** Purpose: Queries domains with URL-synchronized search/filter parameters so cache identity matches the visible list state. */
/** Purpose: Owns the useSuperadminWhiteLabeling data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
export function useSuperadminWhiteLabelingDomains(params: { search: string; status: SuperadminWhiteLabelingStatusFilter }) {
  return useQuery<WhiteLabelDomainsListResponse>({
    queryKey: [...DOMAINS_QUERY_KEY, params],
    queryFn: () => SuperadminWhiteLabelingApi.getDomains(params),
  });
}

/** Purpose: Owns canonical URL synchronization for White-labeling list search and status filter controls. */
export function useSuperadminWhiteLabelingUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const rawStatus = searchParams.get('status') ?? 'all';
  const status: SuperadminWhiteLabelingStatusFilter = rawStatus === 'pending' || rawStatus === 'active' || rawStatus === 'failed' ? rawStatus : 'all';

  const setState = (next: { search?: string; status?: SuperadminWhiteLabelingStatusFilter }) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextSearch = next.search ?? search;
    const nextStatus = next.status ?? status;
    nextSearch ? params.set('search', nextSearch) : params.delete('search');
    nextStatus !== 'all' ? params.set('status', nextStatus) : params.delete('status');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return { search, status, setState };
}

export function useUpdateSuperadminDomainStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateDomainStatusDto }) => SuperadminWhiteLabelingApi.updateDomainStatus(id, dto),
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: DOMAINS_QUERY_KEY });
      toast.success(response.message, { id: 'superadmin-white-labeling-status-success' });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : 'The requested domain status update could not be completed.', { id: 'superadmin-white-labeling-status-error' });
    },
  });
}
