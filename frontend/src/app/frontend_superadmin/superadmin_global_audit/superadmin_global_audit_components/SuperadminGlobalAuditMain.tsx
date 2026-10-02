'use client';
/**
 * RESPONSIBILITY: React component SuperadminGlobalAuditMain owned by the superadmin_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/lib/formatters, @/components/ui/SearchableDropdown, @/components/ui/Pagination, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_components/SuperadminGlobalAuditSeverityBadge, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditMain, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditFilterTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Composes the Global Audit page view from hook-owned state/actions. No direct API calls or business calculations.
import { Search, Download, ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { formatDateTime } from '@/lib/formatters';

import { SuperadminGlobalAuditSeverityBadge } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_components/SuperadminGlobalAuditSeverityBadge';
import { useSuperadminGlobalAuditMain } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditMain';

import type { AuditActorFilter, AuditSeverityFilter } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditFilterTypes';



const TABLE_COLUMN_COUNT = 4;

/**
 * @description Owns the SuperadminGlobalAuditMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGlobalAuditMain() {
  const t = useTranslations('superadmin_global_audit');
  const vm = useSuperadminGlobalAuditMain();

  if (vm.isPending) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6" aria-busy="true" data-testid="superadmin_global_audit-superadmin-global-audit-main-page">
        <div className="flex items-center justify-between gap-4">
          <div><div className="mb-2 h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-4 w-96 max-w-full rounded bg-skeleton-base motion-safe:animate-pulse" /></div>
          <div className="flex gap-3"><div className="h-10 w-32 rounded-lg bg-skeleton-base motion-safe:animate-pulse" /><div className="h-10 w-32 rounded-lg bg-skeleton-base motion-safe:animate-pulse" /></div>
        </div>
        <div className="min-h-96 overflow-hidden rounded-xl border border-border bg-card shadow-card"><div className="h-14 border-b border-border bg-surface-hover p-4" /><div className="space-y-4 p-6">{[1,2,3,4,5,6].map((item) => <div key={item} className="h-16 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}</div></div>
      </div>
    );
  }

  if (vm.queryError) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-8 text-center" role="alert" data-testid="superadmin_global_audit-main-error-state">
        <p className="font-medium text-danger">{t('ui.global_audit_logs_could_not_be_loaded_a4731105')}</p>
        <button type="button" onClick={() => void vm.refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_global_audit-superadmin-global-audit-main-global-audit-main-retry">{t('ui.retry_6327b4e5')}</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6" data-testid="superadmin_global_audit-superadmin-global-audit-main-page-ready">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div><h1 className="text-2xl font-bold text-primary">{t('ui.global_audit_logs_84dfccdf')}</h1><p className="mt-1 text-secondary">{t('ui.immutable_security_ledger_for_system_wide_in_cf9942a7')}</p></div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => void vm.refetch()} disabled={vm.isFetching} className="min-h-11 rounded-lg border border-border bg-input px-4 py-2 font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_global_audit-superadmin-global-audit-main-global-audit-main-button">{vm.isFetching ? t('ui.refreshing_3c7a1d2e') : t('ui.refresh_5b2e9d1c')}</button>
          <button type="button" onClick={() => void vm.requestExport()} disabled={vm.isExporting} aria-busy={vm.isExporting} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_global_audit-main-export-csv"><Download size={18} strokeWidth={2} aria-hidden="true" />{vm.isExporting ? t('ui.exporting_6cf5a1d2') : t('ui.export_csv_0e36f4bc')}</button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-border bg-surface-hover p-4 sm:flex-row">
          <div className="relative w-full max-w-md"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" /><input aria-label={t('ui.search_audit_logs_abc6cb83')} type="search" placeholder={t('ui.search_by_action_actor_or_resource_0f20fc52')} className="min-h-11 w-full rounded-lg border border-border bg-input py-2 pl-9 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" value={vm.search} onChange={(e) => vm.setSearch(e.target.value)}  data-testid="superadmin_global_audit-superadmin-global-audit-main-main-search-audit-logs"/></div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-48 rounded-lg bg-input"><SearchableDropdown data-testid="superadmin_global_audit-superadmin-global-audit-main-severity-filter" options={vm.severityOptions} value={vm.severityFilter} onChange={(val) => vm.setSeverityFilter(val as AuditSeverityFilter)} className="border-transparent bg-transparent" /></div>
            <div className="w-48 rounded-lg bg-input"><SearchableDropdown data-testid="superadmin_global_audit-superadmin-global-audit-main-actor-type-filter" options={vm.actorTypeOptions} value={vm.actorTypeFilter} onChange={(val) => vm.setActorTypeFilter(val as AuditActorFilter)} className="border-transparent bg-transparent" /></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-border bg-header"><th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.timestamp_a3d5de3e')}</th><th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.severity_007cc954')}</th><th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.action_amp_resource_7092f2db')}</th><th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.actor_origin_ip_ba2d92b2')}</th></tr></thead>
            <tbody className="divide-y divide-border">
              {vm.logs.map((log) => (
                <tr key={log.id} className="motion-safe:transition-colors hover:bg-surface-hover">
                  <td className="whitespace-nowrap px-6 py-4"><span className="font-mono text-sm text-secondary">{formatDateTime(log.timestamp)}</span></td>
                  <td className="whitespace-nowrap px-6 py-4"><SuperadminGlobalAuditSeverityBadge severity={log.severity} /></td>
                  <td className="px-6 py-4"><p className="text-sm font-bold text-primary">{log.action}</p><p className="mt-1 font-mono text-xs text-primary">{log.resource}</p><p className="mt-1 text-sm text-secondary">{log.details}</p></td>
                  <td className="whitespace-nowrap px-6 py-4"><div className="flex items-center gap-2"><p className="text-sm font-medium text-primary">{log.actor}</p>{log.actorType ? <span className="rounded bg-input px-1.5 py-0.5 text-xs font-bold tracking-wider text-secondary">{log.actorType}</span> : null}</div><p className="mt-1 font-mono text-xs text-secondary">{log.ipAddress}</p></td>
                </tr>
              ))}
              {vm.logs.length === 0 ? <tr><td colSpan={TABLE_COLUMN_COUNT} className="px-6 py-12 text-center text-secondary"><ShieldAlert size={18} className="mx-auto mb-3 opacity-20" aria-hidden="true" /><p>{t('ui.no_audit_logs_match_your_search_738cf1b6')}</p></td></tr> : null}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border p-4"><Pagination currentPage={vm.currentPage} totalPages={vm.totalPages} onPageChange={vm.setCurrentPage}  data-testid="superadmin_global_audit-superadmin-global-audit-main-global-audit-main-pagination"/></div>
      </div>
    </div>
  );
}
