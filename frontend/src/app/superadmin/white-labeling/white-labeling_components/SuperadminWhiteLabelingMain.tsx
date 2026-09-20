// RESPONSIBILITY: Renders the White-labeling list shell, URL-synchronized search/filter controls, and selected-domain drawer. No API calls.
'use client';

import { Filter, Globe, Search } from 'lucide-react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { SUPERADMIN_WHITE_LABELING_SEARCH_DEBOUNCE_MS, SUPERADMIN_WHITE_LABELING_STATUS_OPTIONS } from '@/app/superadmin/white-labeling/white-labeling_constants/SuperadminWhiteLabelingConstants';
import { useSuperadminWhiteLabelingDomains, useSuperadminWhiteLabelingUrlState } from '@/app/superadmin/white-labeling/white-labeling_hooks/useSuperadminWhiteLabeling';
import { useSuperadminWhiteLabelingStore } from '@/app/superadmin/white-labeling/white-labeling_store/useSuperadminWhiteLabelingStore';
import SuperadminWhiteLabelingTable from '@/app/superadmin/white-labeling/white-labeling_components/SuperadminWhiteLabelingTable';
import SuperadminWhiteLabelingDrawer from '@/app/superadmin/white-labeling/white-labeling_components/SuperadminWhiteLabelingDrawer';
import SuperadminWhiteLabelingEmptyState from '@/app/superadmin/white-labeling/white-labeling_components/SuperadminWhiteLabelingEmptyState';
import SuperadminWhiteLabelingLoadingState from '@/app/superadmin/white-labeling/white-labeling_components/SuperadminWhiteLabelingLoadingState';
import SuperadminWhiteLabelingErrorState from '@/app/superadmin/white-labeling/white-labeling_components/SuperadminWhiteLabelingErrorState';

export default function SuperadminWhiteLabelingMain() {
  const { search, status, setState } = useSuperadminWhiteLabelingUrlState();
  const debouncedSearch = useDebouncedValue(search, SUPERADMIN_WHITE_LABELING_SEARCH_DEBOUNCE_MS);
  const query = useSuperadminWhiteLabelingDomains({ search: debouncedSearch, status });
  const { data: response, isPending, isError, refetch } = query;
  const selectedDomainId = useSuperadminWhiteLabelingStore((state) => state.selectedDomainId);
  const domains = response?.data ?? [];

  if (isPending) return <SuperadminWhiteLabelingLoadingState />;
  if (isError) return <SuperadminWhiteLabelingErrorState onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-primary"><Globe size={18} className="h-6 text-primary" aria-hidden="true"/>White-Labeling &amp; Domains</h1>
          <p className="mt-1 text-sm text-secondary">Manage custom domains and branding for tenant gyms.</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row">
        <div className="relative w-full flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
          <label htmlFor="superadmin-white-labeling-search" className="sr-only">Search by gym name or domain</label>
          <input id="superadmin-white-labeling-search" type="search" placeholder="Search by gym name or domain..." value={search} onChange={(event) => setState({ search: event.target.value })} className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-shadow" />
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Filter size={18} className="h-4 shrink-0 text-secondary" aria-hidden="true"/>
          <label htmlFor="superadmin-white-labeling-status" className="sr-only">Filter by status</label>
          <select id="superadmin-white-labeling-status" value={status} onChange={(event) => setState({ status: event.target.value as any })} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:w-40">
            {SUPERADMIN_WHITE_LABELING_STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      </div>

      <SuperadminWhiteLabelingTable domains={domains} />
      {selectedDomainId ? <SuperadminWhiteLabelingDrawer domains={domains} /> : null}
    </div>
  );
}
