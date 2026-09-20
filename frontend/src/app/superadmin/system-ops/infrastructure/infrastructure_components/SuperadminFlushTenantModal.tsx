// RESPONSIBILITY: Presents the infrastructure tenant-selection UI for a cache flush and delegates server work to the owning parent action.
'use client';
import { useMemo, useState } from 'react';
import { X, Loader2, Search } from 'lucide-react';
import type { SuperadminInfrastructureTenant } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminInfrastructureTypes';
import { useSuperadminInfrastructureTenants } from '@/app/superadmin/system-ops/infrastructure/infrastructure_utils/useSuperadminInfrastructureTenants';
import type { SuperadminFlushTenantModalProps } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminFlushTenantModalTypes';

/**
 * Purpose: Select one or more tenants for the parent-owned infrastructure cache-flush mutation.
 * Inputs: open state, close callback, and parent mutation callback.
 * Output: accessible search, selection controls, and pending action state.
 * Side effects: reads module-owned tenant server state only; mutation remains parent-owned.
 * Invariant: this component never fabricates tenant records or calls the API directly.
 */
export default function SuperadminFlushTenantModal({ isOpen, onClose, onFlush }: SuperadminFlushTenantModalProps) {
  const [search, setSearch] = useState('');
  const [selectedTenantIds, setSelectedTenantIds] = useState<string[]>([]);
  const tenantsQuery = useSuperadminInfrastructureTenants(isOpen);
  const tenants = tenantsQuery.data?.data ?? [];
  const filteredTenants = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return tenants;
    return tenants.filter((tenant) => tenant.name.toLowerCase().includes(normalizedSearch) || tenant.id.toLowerCase().includes(normalizedSearch));
  }, [search, tenants]);
  const isSubmitting = tenantsQuery.isPending;

  if (!isOpen) return null;

  const toggleTenant = (tenantId: string) => {
    setSelectedTenantIds((previous) => previous.includes(tenantId) ? previous.filter((id) => id !== tenantId) : [...previous, tenantId]);
  };

  const handleFlush = async () => {
    if (selectedTenantIds.length === 0) return;
    await onFlush(selectedTenantIds);
    setSelectedTenantIds([]);
    setSearch('');
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true" aria-labelledby="superadmin-flush-tenant-title">
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 id="superadmin-flush-tenant-title" className="text-lg font-bold text-primary">Flush Specific Tenant</h2>
            <p className="text-sm text-secondary">Select tenants whose Redis cache should be cleared.</p>
          </div>
          <button type="button" onClick={onClose} disabled={isSubmitting} aria-label="Close tenant cache flush dialog" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" />
            <label htmlFor="superadmin-flush-tenant-search" className="sr-only">Search tenants</label>
            <input id="superadmin-flush-tenant-search" type="search" placeholder="Search by tenant name or ID..." value={search} onChange={(event) => setSearch(event.target.value)} className="min-h-11 w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-4 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-secondary">Found {filteredTenants.length} tenants</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setSelectedTenantIds(filteredTenants.map((tenant) => tenant.id))} className="min-h-11 px-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Select All</button>
              <button type="button" onClick={() => setSelectedTenantIds([])} className="min-h-11 px-1 text-xs font-semibold text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Clear</button>
            </div>
          </div>

          <div className="flex h-64 flex-col overflow-hidden rounded-lg border border-border bg-input">
            {tenantsQuery.isPending ? (
              <div className="flex flex-1 items-center justify-center" aria-busy="true">
                <Loader2 size={24} className="motion-safe:animate-spin text-primary" aria-hidden="true" />
                <span className="sr-only">Loading tenants</span>
              </div>
            ) : tenantsQuery.isError ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="text-sm text-danger">Tenants could not be loaded.</p>
                <button type="button" onClick={() => void tenantsQuery.refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button>
              </div>
            ) : filteredTenants.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-secondary">No tenants match this search.</div>
            ) : (
              <div className="flex-1 space-y-1 overflow-y-auto p-2">
                {filteredTenants.map((tenant: SuperadminInfrastructureTenant) => {
                  const isSelected = selectedTenantIds.includes(tenant.id);
                  return (
                    <button key={tenant.id} type="button" onClick={() => toggleTenant(tenant.id)} aria-pressed={isSelected} className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected ? 'border-primary bg-primary-subtle text-on-primary' : 'border-transparent text-on-primary hover:bg-surface-hover'}`}>
                      <span className="truncate font-medium">{tenant.name}</span>
                      <span className="shrink-0 text-xs text-secondary">{tenant.id}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border bg-sidebar/50 px-6 py-5">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="min-h-11 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-on-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">Cancel</button>
          <button type="button" onClick={() => void handleFlush()} disabled={selectedTenantIds.length === 0 || isSubmitting} className="inline-flex min-h-11 min-w-40 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" />Loading...</> : `Flush ${selectedTenantIds.length || ''} ${selectedTenantIds.length === 1 ? 'Tenant' : 'Tenants'}`}
          </button>
        </div>
      </div>
    </div>
  );
}
