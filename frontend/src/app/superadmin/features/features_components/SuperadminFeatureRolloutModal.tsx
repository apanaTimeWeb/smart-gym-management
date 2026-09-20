// RESPONSIBILITY: Renders the SuperadminFeatureRolloutModal and delegates canary tenant selection persistence to the feature mutation boundary.
'use client';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import type { FeatureFlag } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import { useSuperadminFeatureRolloutData } from '@/app/superadmin/features/features_utils/useSuperadminFeatureRolloutData';
import type { SuperadminFeatureRolloutModalProps } from '@/app/superadmin/features/features_types/SuperadminFeaturesUiTypes';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';

export default function SuperadminFeatureRolloutModal({ isOpen, onClose, flag, onSaveRollout }: SuperadminFeatureRolloutModalProps) {
  const [search, setSearch] = useState('');
  const [selectedTenantIds, setSelectedTenantIds] = useState<string[]>([]);
  const idempotencyKeyRef = useRef<string | null>(null);
  const baselineTenantIdsRef = useRef<string[]>([]);
  const { tenants, isPending: isLoadingTenants } = useSuperadminFeatureRolloutData(isOpen);
  const rolloutMutation = useMutation({
    mutationFn: () => {
      idempotencyKeyRef.current ??= crypto.randomUUID();
      return onSaveRollout(selectedTenantIds, idempotencyKeyRef.current);
    },
    onSuccess: () => {
      baselineTenantIdsRef.current = selectedTenantIds;
      idempotencyKeyRef.current = null;
      onClose();
    },
  });

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
  useUnsavedChangesGuard(isDirty && !rolloutMutation.isPending, 'You have unsaved rollout changes. Discard?');

  if (!isOpen || !flag) return null;

  const filteredGyms = (tenants ?? []).filter((gym) => {
    const query = search.trim().toLowerCase();
    return !query || gym.name.toLowerCase().includes(query) || gym.id.toLowerCase().includes(query);
  });

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true" aria-labelledby="superadmin-feature-rollout-title">
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 id="superadmin-feature-rollout-title" className="text-xl font-bold text-primary">Canary Rollout</h2>
            <p className="text-sm text-secondary">Select gyms to enable <span className="font-semibold text-primary">{flag.name}</span></p>
          </div>
          <button type="button" onClick={onClose} disabled={rolloutMutation.isPending} aria-label="Close canary rollout dialog" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="relative">
            <Search size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <label htmlFor="superadmin-feature-rollout-search" className="sr-only">Search gyms</label>
            <input id="superadmin-feature-rollout-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by gym name or ID..." className="min-h-11 w-full rounded-lg border border-border bg-input pl-10 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-secondary">Found {filteredGyms.length} gyms</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setSelectedTenantIds(filteredGyms.map((gym) => gym.id))} className="min-h-11 px-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Select All</button>
              <button type="button" onClick={() => setSelectedTenantIds([])} className="min-h-11 px-1 text-xs font-semibold text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Clear</button>
            </div>
          </div>

          <div className="flex h-64 flex-col overflow-hidden rounded-lg border border-border bg-input">
            {isLoadingTenants ? (
              <div className="flex flex-1 items-center justify-center" aria-busy="true"><Loader2 size={20} className="motion-safe:animate-spin text-primary" aria-hidden="true" /><span className="sr-only">Loading gyms</span></div>
            ) : filteredGyms.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-secondary">No gyms match this search.</div>
            ) : (
              <div className="flex-1 space-y-1 overflow-y-auto p-2">
                {filteredGyms.map((gym) => {
                  const selected = selectedTenantIds.includes(gym.id);
                  return (
                    <button key={gym.id} type="button" aria-pressed={selected} onClick={() => setSelectedTenantIds((previous) => previous.includes(gym.id) ? previous.filter((id) => id !== gym.id) : [...previous, gym.id])} className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'border-primary bg-primary-subtle text-primary' : 'border-transparent text-primary hover:bg-surface-hover'}`}>
                      <span className="truncate font-medium">{gym.name}</span>
                      <span className="shrink-0 text-xs text-secondary">{gym.id}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border bg-sidebar px-6 py-5">
          <button type="button" onClick={onClose} disabled={rolloutMutation.isPending} className="min-h-11 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">Cancel</button>
          <button type="button" onClick={() => void rolloutMutation.mutateAsync()} disabled={rolloutMutation.isPending} className="inline-flex min-h-11 min-w-44 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-colors motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
            {rolloutMutation.isPending ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" />Saving...</> : `Save Rollout (${selectedTenantIds.length} Gyms)`}
          </button>
        </div>
      </div>
    </div>
  );
}
