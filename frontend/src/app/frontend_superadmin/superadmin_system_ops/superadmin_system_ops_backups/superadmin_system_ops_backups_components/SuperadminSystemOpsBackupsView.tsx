'use client';
/**
 * RESPONSIBILITY: React component SuperadminSystemOpsBackupsView owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: next-intl, lucide-react, @/components/ui/Pagination, @/components/ui/SearchableDropdown, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsRestoreModal, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsScheduleModal, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTable
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Backups page from the feature-owned view-model; contains no URL parsing, query construction, API calls, mutation orchestration, or modal state transitions.
import { DatabaseBackup, Search, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';
import SuperadminSystemOpsBackupsRestoreModal from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsRestoreModal';
import SuperadminSystemOpsBackupsScheduleModal from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsScheduleModal';
import SuperadminSystemOpsBackupsTable from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTable';
import SuperadminSystemOpsBackupsTriggerModal from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsTriggerModal';
import { SUPERADMIN_BACKUPS_STATUS_FILTER_OPTIONS, SUPERADMIN_BACKUPS_TYPE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsFilterOptions';
import { useSuperadminSystemOpsBackupsMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsMainViewModel';



/**
 * @description Owns the SuperadminSystemOpsBackupsView responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminSystemOpsBackupsView() {
  const t = useTranslations('superadmin_system_ops_backups');
  const vm = useSuperadminSystemOpsBackupsMainViewModel();
  const filtered = vm.data || [];
  return (<div className="space-y-6" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-main-page">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div><h1 className="superadmin-page-title text-primary">{t('ui.tenant_database_backups_7312f67')}</h1><p className="text-secondary mt-1 text-sm">{t('ui.manage_automated_pg_dump_snapshots_for_all_isolated__5fd1a3d')}</p></div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <button type="button" onClick={vm.openScheduleModal} className="min-h-11 bg-transparent text-primary px-4 py-2 rounded-lg font-medium hover:bg-surface-hover motion-safe:transition-colors border border-border flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-main-superadmin_system_ops_backups-main-configure-schedule"><Clock size={18} strokeWidth={2} /> {t('ui.configure_schedule_14b2842')}</button>
        <button type="button" onClick={vm.openTriggerModal} disabled={vm.isTriggering} className="min-h-11 min-w-40 bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-hover motion-safe:transition-colors flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-main-superadmin_system_ops_backups-main-global-snapshot"><DatabaseBackup size={18} strokeWidth={2} /> {vm.isTriggering ? t('ui.creating_snapshot_ec1115a') : t('ui.global_snapshot_e932710')}</button>
      </div>
    </div>
    <SuperadminLayoutErrorBoundary variant="inline"><div className="bg-card border border-border rounded-xl shadow-card overflow-hidden flex flex-col min-h-96">
      <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full max-w-md"><label htmlFor="superadmin-backups-search" className="sr-only">{t('ui.search_by_gym_name_or_database_d36489b')}</label><Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" /><input id="superadmin-backups-search" type="text" placeholder={t('ui.search_by_gym_name_or_database_d36489b')} className="min-h-11 w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out" value={vm.search} onChange={(e) => vm.setSearch(e.target.value)} data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-main-superadmin_system_ops_backups-main-search" /></div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="w-40 border-none bg-floating rounded-lg"><SearchableDropdown data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-main-superadmin_system_ops_backups-main-status-filter" value={vm.statusFilter} onChange={(value) => vm.setStatusFilter(String(value))} options={SUPERADMIN_BACKUPS_STATUS_FILTER_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} className="bg-transparent border-transparent text-sm" /></div>
          <div className="w-40 border-none bg-floating rounded-lg"><SearchableDropdown data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-main-superadmin_system_ops_backups-main-type-filter" value={vm.typeFilter} onChange={(value) => vm.setTypeFilter(String(value))} options={SUPERADMIN_BACKUPS_TYPE_FILTER_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} className="bg-transparent border-transparent text-sm" /></div>
        </div>
      </div>
      <SuperadminSystemOpsBackupsTable paginatedBackups={filtered} filteredLength={filtered.length} handleDownload={(id: string) => { void vm.downloadBackup(id); }} handleRestoreClick={vm.handleRestoreClick} />
      <Pagination currentPage={vm.currentPage} totalPages={vm.totalPages} onPageChange={vm.setCurrentPage}  data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-main-ops-backups-main-pagination"/>
    </div></SuperadminLayoutErrorBoundary>
    <SuperadminSystemOpsBackupsRestoreModal isOpen={vm.restoreModalOpen} onClose={vm.closeRestoreModal} selectedBackup={vm.selectedBackup} restoreConfirmText={vm.restoreConfirmText} setRestoreConfirmText={vm.setRestoreConfirmText} data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-restore-modal-interactive-1" />
    <SuperadminSystemOpsBackupsTriggerModal isOpen={vm.triggerModalOpen} onClose={vm.closeTriggerModal} data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-trigger-modal-interactive-2" />
    <SuperadminSystemOpsBackupsScheduleModal isOpen={vm.scheduleModalOpen} onClose={vm.closeScheduleModal} data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-schedule-modal-interactive-3" />
  </div>);
}
