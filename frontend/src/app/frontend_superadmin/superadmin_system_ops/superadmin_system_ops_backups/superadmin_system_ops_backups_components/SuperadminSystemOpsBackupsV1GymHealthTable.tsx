'use client';
// RESPONSIBILITY: Renders the Superadmin backups V1 Backup health by gym view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import { formatNumber, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_utils/SuperadminSystemOpsBackupsFormatters';


import { getSuperadminBackupsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_utils/SuperadminSystemOpsBackupsStatusBadgeConfig';

import type { SuperadminBackupsV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsV1Types';

/**
 * @description Renders the Superadmin backups V1 Backup health by gym view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsBackupsV1GymHealthTable({ data }: SuperadminBackupsV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_backups');
    return <Panel title={t('ui.backup_health_by_gym_7ea2e1e')} description={t('ui.every_sample_includes_age_size_and_status_so_gaps_ar_cab6fff')}>
  <div className="overflow-x-auto">
    <table className="w-full text-sm superadmin-mobile-card-table">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary" data-testid="superadmin_system_ops_backups-system-ops-backups-v1-gym-health-table-action-1">
          <th className="px-3 py-3">
            
            {t('ui.gym_7af44a9')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.last_backup_1b62cf5')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.age_822df80')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.size_9ddfd13')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.status_b2c5243')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.tenants.map((tenantItem) => <tr key={tenantItem.gym} className="border-b border-border" data-testid={`superadmin_system_ops_backups-system-ops-backups-v1-gym-health-table-item-t-gym-2-${String(tenantItem.gym)}`}>
          <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_gym')}>
            {tenantItem.gym}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_last_backup')}>
            {formatDateTime(tenantItem.lastBackup)}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_age')}>
            {tenantItem.ageHours}
            
            {t('ui.hours_bdd7d6d')}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_size')}>
            {tenantItem.size}
          </td>
          <td className={`px-3 py-3 ${getSuperadminBackupsStatusBadgeClasses(tenantItem.status)}`} data-mobile-label={t('ui.mobile_status')}>
            <span data-testid={`superadmin_system_ops_backups-gym-health-status-${tenantItem.gym}`}>{tenantItem.status}</span>
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
