'use client';
// RESPONSIBILITY: Renders the Superadmin backups V1 BackupsHealthSummary summary cards.
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';
import { formatNumber, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_utils/SuperadminSystemOpsBackupsFormatters';


import type { SuperadminBackupsV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsV1Types';

/**
 * @description Renders the Superadmin backups V1 BackupsHealthSummary summary cards.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsBackupsV1HealthSummaryCards({ data }: SuperadminBackupsV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_backups');
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
  <MetricCard label={t('ui.healthy_1affb99')} value={formatNumber(data.summary.healthy)} helper={t('ui.kpi_helper_recent_successful_backups_v3')} tone="success"/>
  <MetricCard label={t('ui.warning_c68c32e')} value={formatNumber(data.summary.warning)} helper={t('ui.kpi_helper_older_than_target_v3')} tone="warning"/>
  <MetricCard label={t('ui.failed_841decf')} value={formatNumber(data.summary.failed)} helper={t('ui.kpi_helper_needs_action_v3')} tone="danger"/>
  <MetricCard label={t('ui.last_restore_test_e58ae96')} value={data.summary.lastRestoreTest} helper={data.summary.restoreTestStatus} tone="success"/>
  <MetricCard label={t('ui.recovery_point_1f7ea22')} value={data.summary.recoveryPointTarget} helper={t('ui.kpi_helper_maximum_backup_age_v3')}/>
  <MetricCard label={t('ui.recovery_time_732ee20')} value={data.summary.recoveryTimeTarget} helper={t('ui.kpi_helper_restore_target_v3')}/>
    </div>;
}
