'use client';
// RESPONSIBILITY: Renders the SuperadminFeaturesFeatureRolloutModal and delegates canary tenant selection persistence to the feature mutation boundary.
import { useEffect, useRef, useState } from 'react';

import { Loader2, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Tooltip from "@/components/ui/Tooltip";

import { useSuperadminFeaturesFeatureRolloutData } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureRolloutData';
import { useSuperadminFeaturesFeatureRolloutMutation } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureRolloutMutation';
import { useSuperadminLayoutDialogA11y } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import type { SuperadminFeatureRolloutModalProps } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesUiTypes';



/**
 * @description Renders the SuperadminFeaturesFeatureRolloutModal and delegates canary tenant selection persistence to the feature mutation boundary.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminFeaturesFeatureRolloutModal({ isOpen, onClose, flag, onSaveRollout }: SuperadminFeatureRolloutModalProps) {
  const t = useTranslations('superadmin_features');
  const [search, setSearch] = useState('');
  const [selectedTenantIds, setSelectedTenantIds] = useState<string[]>([]);
  const idempotencyKeyRef = useRef<string | null>(null);
  const baselineTenantIdsRef = useRef<string[]>([]);
  const { tenants, isPending: isLoadingTenants } = useSuperadminFeaturesFeatureRolloutData(isOpen);
  const rolloutMutation = useSuperadminFeaturesFeatureRolloutMutation(onSaveRollout, selectedTenantIds, idempotencyKeyRef, () => {
    baselineTenantIdsRef.current = selectedTenantIds;
    idempotencyKeyRef.current = null;
    onClose();
  });

  // EFFECT INTENT: Hydrate the canary rollout draft when the dialog opens and clear draft/search/idempotency state when it closes.
// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    if (isOpen && flag) {
      const nextTenantIds = flag.enabledTenantIds ?? [];
      baselineTenantIdsRef.current = nextTenantIds;
      setSelectedTenantIds(nextTenantIds);
      setSearch('');
      idempotencyKeyRef.current = null;
    } else if (!isOpen) {
      setSearch('');
      setSelectedTenantIds([]);
      idempotencyKeyRef.current = null;
    }
  }, [isOpen, flag]);

  const isDirty = JSON.stringify(selectedTenantIds) !== JSON.stringify(baselineTenantIdsRef.current);
  useSuperadminLayoutUnsavedChangesGuard(isDirty && !rolloutMutation.isPending, t('ui.unsaved_rollout_changes_discard'));
  const dialogRef = useSuperadminLayoutDialogA11y(isOpen && Boolean(flag), onClose);

  if (!isOpen || !flag) return null;

  const filteredGyms = (tenants ?? []).filter((gym) => {
    const query = search.trim().toLowerCase();
    return !query || gym.name.toLowerCase().includes(query) || gym.id.toLowerCase().includes(query);
  });

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true" aria-labelledby="superadmin-feature-rollout-title" data-testid="superadmin_features-superadmin-features-feature-rollout-modal-feature-rollout-modal-dialog" ref={dialogRef}>
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 id="superadmin-feature-rollout-title" className="text-xl font-bold text-primary">{t('ui.canary_rollout_6a7afe3')}</h2>
            <p className="text-sm text-secondary">{t('ui.select_superadmin_gyms_to_enable_c2505fc')} <span className="font-semibold text-primary">{flag.name}</span></p>
          </div>
          <button type="button" data-autofocus="true" onClick={onClose} disabled={rolloutMutation.isPending} aria-label={t('ui.close_canary_rollout_dialog_2f96903')} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_features-superadmin-features-feature-rollout-modal-feature-rollout-modal-close">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="relative">
            <label htmlFor="superadmin-feature-rollout-search" className="sr-only">{t('ui.search_by_gym_name_or_id_1d26f03')}</label>
            <Search size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input  id="superadmin-feature-rollout-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('ui.search_by_gym_name_or_id_1d26f03')} className="min-h-11 w-full rounded-lg border border-border bg-input pl-10 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_features-superadmin-features-feature-rollout-modal-feature-rollout-modal-search"/>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-secondary">{t('ui.found_d2cf1f1')} {filteredGyms.length}  {t('ui.superadmin_gyms_38e723d')}</span>
            <div className="flex items-center gap-3">
              <button  type="button" onClick={() => setSelectedTenantIds(filteredGyms.map((gym) => gym.id))} className="min-h-11 px-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_features-superadmin-features-feature-rollout-modal-rollout-modal-select-all">{t('ui.select_all_7a01238')}</button>
              <button  type="button" onClick={() => setSelectedTenantIds([])} className="min-h-11 px-1 text-xs font-semibold text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_features-superadmin-features-feature-rollout-modal-feature-rollout-modal-clear">{t('ui.clear_4d4e3f3')}</button>
            </div>
          </div>

          <div className="flex h-64 flex-col overflow-hidden rounded-lg border border-border bg-card">
            {isLoadingTenants ? (
              <div className="flex flex-1 items-center justify-center" aria-busy="true" data-testid="superadmin_features-feature-rollout-loading-state"><Loader2 size={18} className="motion-safe:animate-spin text-primary" aria-hidden="true" /><span className="sr-only">{t('ui.loading_superadmin_gyms_1d04321')}</span></div>
            ) : filteredGyms.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-secondary">{t('ui.no_superadmin_gyms_match_this_search_3bbc26b')}</div>
            ) : (
              <div className="flex-1 space-y-1 overflow-y-auto p-2">
                {filteredGyms.map((gym, index) => {
                  const selected = selectedTenantIds.includes(gym.id);
                  return (
                    <button  key={gym.id} type="button" aria-pressed={selected} onClick={() => setSelectedTenantIds((previous) => previous.includes(gym.id) ? previous.filter((id) => id !== gym.id) : [...previous, gym.id])} className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'border-focus bg-primary-subtle text-primary' : 'border-transparent text-primary hover:bg-surface-hover'} motion-safe:active:scale-95`} data-testid={`superadmin_features-features-feature-rollout-modal-rollout-${index}`}>
                      <Tooltip content={gym.name}><span className="truncate font-medium">{gym.name}</span></Tooltip>
                      <span className="shrink-0 text-xs text-secondary">{gym.id}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border bg-sidebar px-6 py-5">
          <button type="button" onClick={onClose} disabled={rolloutMutation.isPending} className="min-h-11 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_features-superadmin-features-feature-rollout-modal-feature-rollout-modal-cancel">{t('ui.cancel_9818bac')}</button>
          <button  type="button" onClick={() => void rolloutMutation.mutateAsync()} disabled={rolloutMutation.isPending} className="inline-flex min-h-11 min-w-44 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-colors motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" data-testid="superadmin_features-superadmin-features-feature-rollout-modal-feature-rollout-modal-save">
            {rolloutMutation.isPending ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" />{t('ui.saving_dc97212')}</> : t('ui.save_rollout_gyms', { count: selectedTenantIds.length })}
          </button>
        </div>
      </div>
    </div>
  );
}
