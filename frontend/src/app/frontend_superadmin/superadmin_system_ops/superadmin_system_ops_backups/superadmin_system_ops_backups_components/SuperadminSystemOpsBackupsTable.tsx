'use client';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import SuperadminSystemOpsBackupsEmptyState from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/superadmin_system_ops_backups_empty_state/SuperadminSystemOpsBackupsEmptyState';
import { useTranslations } from 'next-intl';
import { Download, RotateCcw } from 'lucide-react';

// RESPONSIBILITY: Renders and composes SuperadminSystemOpsBackupsTable for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';import { SUPERADMIN_BACKUPS_STATUS_CODES, SUPERADMIN_BACKUPS_STATUS_COLORS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsConstants';

import type { SuperadminBackupsTableProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsTableTypes';
import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsTypes';



const TABLE_COLUMN_COUNT = 7;
/**
 * @description Renders the Backups Table component and its associated UI logic.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsBackupsTable({ paginatedBackups, filteredLength, handleDownload, handleRestoreClick }: SuperadminBackupsTableProps) {
  const t = useTranslations('superadmin_system_ops_backups');
    return (<div className="overflow-x-auto flex-1">
      <table className="w-full text-left border-collapse min-w-full superadmin-mobile-card-table">
        <thead>
          <tr className="bg-header border-b border-border text-sm" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-table-backups-table-action-1">
            <th className="p-4 font-semibold text-secondary">{t('ui.backup_id_f321e1e')}</th>
            <th className="p-4 font-semibold text-secondary">{t('ui.gym_7af44a9')}</th>
            <th className="p-4 font-semibold text-secondary">{t('ui.database_name_9627a1b')}</th>
            <th className="p-4 font-semibold text-secondary">{t('ui.size_mb_1e94325')}</th>
            <th className="p-4 font-semibold text-secondary">{t('ui.status_b2c5243')}</th>
            <th className="p-4 font-semibold text-secondary">{t('ui.timestamp_4442a67')}</th>
            <th className="p-4 font-semibold text-secondary text-right">{t('ui.actions_1e45db1')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {paginatedBackups.map((backup: BackupRecord, index) => (<tr key={backup.id} className="hover:bg-surface-hover motion-safe:transition-colors" data-testid={`superadmin_system_ops_backups-system-ops-backups-table-item-backup-id-2-${String(backup.id)}`}>
              <td className="p-4 text-xs font-mono text-secondary" data-mobile-label={t('ui.mobile_backup_id')}>{backup.id}</td>
              <td className="p-4 text-sm font-medium text-primary" data-mobile-label={t('ui.mobile_gym')}>{backup.tenantName}</td>
              <td className="p-4 text-sm font-mono text-primary" data-mobile-label={t('ui.mobile_database_name')}>{backup.databaseName}</td>
              <td className="p-4 text-sm text-secondary font-mono" data-mobile-label={t('ui.mobile_size_mb')}>{formatNumber(Math.round(backup.sizeMB * 10) / 10)}</td>
              <td className="p-4" data-mobile-label={t('ui.mobile_status')}>
                <span data-testid={`superadmin_system_ops_backups-status-${backup.id}`} className={`px-2.5 py-1 rounded-md text-xs font-bold ${SUPERADMIN_BACKUPS_STATUS_COLORS[backup.status as keyof typeof SUPERADMIN_BACKUPS_STATUS_COLORS]}`}>
                  {backup.status.replace('_', ' ')}
                </span>
              </td>
              <td className="p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_timestamp')}>{formatDateTime(backup.timestamp)}</td>
              <td className="p-4 text-right flex items-center justify-end gap-2" data-mobile-label={t('ui.mobile_actions')}>
                <button  type="button" aria-label={t('ui.a11y_download_backup', { id: backup.id })} onClick={() => void handleDownload(backup.id)} className="min-w-11 min-h-11 p-2 text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-colors disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.download_pg_dump_bc330ff')} disabled={backup.status !== SUPERADMIN_BACKUPS_STATUS_CODES.SUCCESS} data-testid={`superadmin_system_ops_backups-backups-table-download-${index}`}>
                  <Download size={18}/>
                </button>
                <button  type="button" aria-label={t('ui.a11y_restore_backup', { id: backup.id })} onClick={() => handleRestoreClick(backup)} className="min-w-11 min-h-11 p-2 text-secondary hover:text-danger hover:bg-danger-bg rounded-lg motion-safe:transition-colors disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.restore_snapshot_9d96d4a')} disabled={backup.status !== SUPERADMIN_BACKUPS_STATUS_CODES.SUCCESS} data-testid={`superadmin_system_ops_backups-backups-table-restore-${index}`}>
                  <RotateCcw size={18}/>
                </button>
              </td>
            </tr>))}
          {filteredLength === 0 && (<tr data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-table-backups-table-action-3">
              <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-disabled" data-mobile-label={t('ui.mobile_backup_id')}>
                <SuperadminSystemOpsBackupsEmptyState />
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>);
}
