'use client';// RESPONSIBILITY: Renders the infrastructure tenant-selection dialog and owns its confirmed cache-flush mutation lifecycle.
import { useMemo, useRef, useState } from 'react';

import { Loader2, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import Tooltip from "@/components/ui/Tooltip";

import { useSuperadminLayoutDialogA11y } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';
import { useSuperadminSystemOpsInfrastructureFlushTenantMutation } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureFlushTenantMutation';
import { useSuperadminSystemOpsInfrastructureTenants } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureTenants';

import type { SuperadminFlushTenantModalProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureFlushTenantModalTypes';
import type { SuperadminInfrastructureTenant } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureTypes';



/**
 * @description Renders the infrastructure tenant-selection dialog and owns its confirmed cache-flush mutation lifecycle.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminSystemOpsInfrastructureFlushTenantModal({ isOpen, onClose, onFlush }: SuperadminFlushTenantModalProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  const [search, setSearch] = useState('');
  const [selectedTenantIds, setSelectedTenantIds] = useState<string[]>([]);
  const baselineSelectedTenantIdsRef = useRef<string[]>([]);
  const idempotencyKeyRef = useRef<string | null>(null);
  const { confirm } = useConfirm();
  const tenantsQuery = useSuperadminSystemOpsInfrastructureTenants(isOpen);
  const tenants = tenantsQuery.data?.data ?? [];
  const filteredTenants = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? tenants.filter((tenant) => tenant.name.toLowerCase().includes(query) || tenant.id.toLowerCase().includes(query)) : tenants;
  }, [search, tenants]);
  const flushMutation = useSuperadminSystemOpsInfrastructureFlushTenantMutation(onFlush, selectedTenantIds, idempotencyKeyRef, async () => {
    return confirm({ title: t('ui.confirm_flush_tenant_title'), message: t('ui.confirm_flush_tenant_message', { count: selectedTenantIds.length }), confirmText: t('ui.flush_cache_action'), cancelText: t('ui.cancel_action'), type: 'warning' });
  }, (completed) => {
    if (!completed) { idempotencyKeyRef.current = null; return; }
    baselineSelectedTenantIdsRef.current = [];
    setSelectedTenantIds([]);
    setSearch('');
    idempotencyKeyRef.current = null;
    onClose();
  });
  const isDirty = JSON.stringify(selectedTenantIds) !== JSON.stringify(baselineSelectedTenantIdsRef.current);
  useSuperadminLayoutUnsavedChangesGuard(isOpen && isDirty && !flushMutation.isPending, t('ui.unsaved_cache_flush_selection'));
  const dialogRef = useSuperadminLayoutDialogA11y(isOpen, () => { if (!flushMutation.isPending) onClose(); });
  if (!isOpen) return null;
  const toggleTenant = (tenantId: string) => setSelectedTenantIds((previous) => previous.includes(tenantId) ? previous.filter((id) => id !== tenantId) : [...previous, tenantId]);
  const tenantQueryPending = tenantsQuery.isPending;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true" aria-labelledby="superadmin-flush-tenant-title" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-dialog" ref={dialogRef}>
      <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div><h2 id="superadmin-flush-tenant-title" className="text-lg font-bold text-primary">{t('ui.flush_specific_tenant_7d43c74')}</h2><p className="text-sm text-secondary">{t('ui.select_tenants_whose_redis_cache_should_be_cleared_04932a1')}</p></div>
          <button type="button" onClick={onClose} disabled={flushMutation.isPending} aria-label={t('ui.close_tenant_cache_flush_dialog_e2d344d')} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-close"><X size={18} aria-hidden="true" /></button>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/><label htmlFor="superadmin-flush-tenant-search" className="sr-only">{t('ui.search_tenants_512d7ce')}</label><input  id="superadmin-flush-tenant-search" type="search" placeholder={t('ui.search_by_tenant_name_or_id_f410e3a')} value={search} onChange={(event) => setSearch(event.target.value)} className="min-h-11 w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-search"/></div>
          <div className="flex items-center justify-between px-1"><span className="text-sm font-semibold text-secondary">{t('ui.found_aad1d5d')} {filteredTenants.length}  {t('ui.tenants_1264d7d')}</span><div className="flex items-center gap-3"><button  type="button" onClick={() => setSelectedTenantIds(filteredTenants.map((tenant) => tenant.id))} className="min-h-11 px-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-tenant-modal-select-all">{t('ui.select_all_66d7b9b')}</button><button  type="button" onClick={() => setSelectedTenantIds([])} className="min-h-11 px-1 text-xs font-semibold text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-clear">{t('ui.clear_3b4184d')}</button></div></div>
          <div className="flex h-64 flex-col overflow-hidden rounded-lg border border-border bg-card">
            {tenantQueryPending ? <div className="flex flex-1 items-center justify-center" aria-busy="true" data-testid="superadmin_system_ops_infrastructure-flush-tenant-loading-state"><Loader2 size={18} className="motion-safe:animate-spin text-primary" aria-hidden="true"/></div> : tenantsQuery.isError ? <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center"><p className="text-sm text-danger">{t('ui.tenants_could_not_be_loaded_a5c0597')}</p><button  type="button" onClick={() => void tenantsQuery.refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-retry">{t('ui.retry_9dfd4ea')}</button></div> : filteredTenants.length === 0 ? <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-secondary">{t('ui.no_tenants_match_this_search_d6cc7e6')}</div> : <div className="flex-1 space-y-1 overflow-y-auto p-2">{filteredTenants.map((tenant: SuperadminInfrastructureTenant, index) => { const selected = selectedTenantIds.includes(tenant.id); return <button  key={tenant.id} type="button" aria-pressed={selected} onClick={() => toggleTenant(tenant.id)} className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'border-focus bg-primary-subtle text-primary' : 'border-transparent text-primary hover:bg-surface-hover'} motion-safe:active:scale-95`} data-testid={`superadmin_system_ops_infrastructure-flush-tenant-modal-action5-${index}`}><Tooltip content={tenant.name}><span className="truncate font-medium">{tenant.name}</span></Tooltip><span className="shrink-0 text-xs text-secondary">{tenant.id}</span></button>; })}</div>}
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-border bg-sidebar px-6 py-5"><button type="button" onClick={onClose} disabled={flushMutation.isPending} className="min-h-11 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-cancel">{t('ui.cancel_5ab7db1')}</button><button  type="button" onClick={() => void flushMutation.mutateAsync()} disabled={selectedTenantIds.length === 0 || flushMutation.isPending || tenantQueryPending} className="inline-flex min-h-11 min-w-44 items-center justify-center gap-2 rounded-md bg-warning-bg px-5 py-2.5 text-sm font-medium text-warning hover:bg-warning-bg border border-border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-flush-tenant-modal-control">{flushMutation.isPending ? <><Loader2 size={18} className="motion-safe:animate-spin"/>{t('ui.flushing_4c9e01f')}</> : t('ui.flush_tenants', { count: selectedTenantIds.length })}</button></div>
      </div>
    </div>
  );
}
