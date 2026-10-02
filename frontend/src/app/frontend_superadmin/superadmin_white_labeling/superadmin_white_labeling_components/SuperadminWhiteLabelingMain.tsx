'use client';
/**
 * RESPONSIBILITY: React component SuperadminWhiteLabelingMain owned by the superadmin_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/hooks/useDebouncedValue, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_constants/SuperadminWhiteLabelingConstants, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_hooks/useSuperadminWhiteLabelingDomains, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_store/useSuperadminWhiteLabelingStore, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingTable, @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingDrawer
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the White-labeling list shell, URL-synchronized search/filter controls, and selected-domain drawer. No API calls.
import { Filter, Globe, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';

import SuperadminWhiteLabelingDrawer from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingDrawer';
import SuperadminWhiteLabelingEmptyState from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingEmptyState';
import SuperadminWhiteLabelingErrorState from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingErrorState';
import SuperadminWhiteLabelingLoadingState from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingLoadingState';
import SuperadminWhiteLabelingTable from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingTable';
import { SUPERADMIN_WHITE_LABELING_SEARCH_DEBOUNCE_MS, SUPERADMIN_WHITE_LABELING_STATUS_OPTIONS } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_constants/SuperadminWhiteLabelingConstants';
import { useSuperadminWhiteLabelingDomains } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_hooks/useSuperadminWhiteLabelingDomains';
import { useSuperadminWhiteLabelingUrlState } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_hooks/useSuperadminWhiteLabelingUrlState';
import { useSuperadminWhiteLabelingStore } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_store/useSuperadminWhiteLabelingStore';

import type { SuperadminWhiteLabelingStatus } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes';



/**
 * @description Owns the SuperadminWhiteLabelingMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminWhiteLabelingMain() {
  const t = useTranslations('superadmin_white_labeling');
  const { search, status, setState } = useSuperadminWhiteLabelingUrlState();
  const debouncedSearch = useDebouncedValue(search, SUPERADMIN_WHITE_LABELING_SEARCH_DEBOUNCE_MS);
  const query = useSuperadminWhiteLabelingDomains({ search: debouncedSearch, status });
  const { data: response, isPending, isError, refetch } = query;
  const selectedDomainId = useSuperadminWhiteLabelingStore((state) => state.selectedDomainId);
  const domains = response?.data ?? [];

  if (isPending) return <SuperadminWhiteLabelingLoadingState  data-testid="superadmin_white_labeling-superadmin-white-labeling-main-page"/>;
  if (isError) return <SuperadminWhiteLabelingErrorState onRetry={() => void refetch()} data-testid="superadmin_white_labeling-superadmin-white-labeling-error-state-interactive-1" />;

  return (
    <div className="space-y-6" data-testid="superadmin_white_labeling-superadmin-white-labeling-main-page-ready">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-primary"><Globe size={18} className="text-primary" aria-hidden="true"/>{t('ui.white_labeling_amp_domains_742e46bf')}</h1>
          <p className="mt-1 text-sm text-secondary">{t('ui.manage_custom_domains_and_branding_for_tenan_26c96fd4')}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row">
        <div className="relative w-full flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
          <label htmlFor="superadmin-white-labeling-search" className="sr-only">{t('ui.search_by_gym_name_or_domain_d96770fb')}</label>
          <input id="superadmin-white-labeling-search" type="search" placeholder={t('ui.search_by_gym_name_or_domain_91307363')} value={search} onChange={(event) => setState({ search: event.target.value })} className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base"  data-testid="superadmin_white_labeling-superadmin-white-labeling-main-superadmin-white-labeling-search"/>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Filter size={18} className="shrink-0 text-secondary" aria-hidden="true"/>
          <label htmlFor="superadmin-white-labeling-status" className="sr-only">{t('ui.filter_by_status_5dd5cd66')}</label>
          <select id="superadmin-white-labeling-status" value={status} onChange={(event) => setState({ status: event.target.value as SuperadminWhiteLabelingStatus })} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:w-40" data-testid="superadmin_white_labeling-superadmin-white-labeling-main-superadmin-white-labeling-status">
            {SUPERADMIN_WHITE_LABELING_STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="superadminwhitelabelingmain-option-6927">{option.label}</option>)}
          </select>
        </div>
      </div>

      <SuperadminWhiteLabelingTable domains={domains} />
      {selectedDomainId ? <SuperadminWhiteLabelingDrawer domains={domains} /> : null}
    </div>
  );
}
