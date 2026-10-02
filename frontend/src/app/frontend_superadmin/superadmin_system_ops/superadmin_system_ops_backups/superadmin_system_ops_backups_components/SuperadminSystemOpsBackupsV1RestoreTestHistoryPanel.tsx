'use client';// RESPONSIBILITY: Renders the Superadmin backups V1 Restore test history view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import type { SuperadminBackupsV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsV1Types';



/**
 * @description Renders the Superadmin backups V1 Restore test history view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsBackupsV1RestoreTestHistoryPanel({ data }: SuperadminBackupsV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_backups');
    return <Panel title={t('ui.restore_test_history_974c0b6')} description={t('ui.a_backup_existing_on_disk_is_not_enough_restore_test_e40c6b7')}>
  <div className="space-y-3">
    {data.restoreHistory.map((h) => <div key={h.date} className="flex items-center justify-between rounded-lg border border-border p-3">
      <div>
        <p className="font-medium text-primary">
          {h.date}
        </p>
        <p className="text-xs text-secondary">
          {h.scope}
          {t('ui.text_176848af')}{h.durationMinutes}
          
          {t('ui.minutes_2416591')}
        </p>
      </div>
      <span className="text-xs font-semibold text-success">
        {h.status}
      </span>
    </div>)}
  </div>
    </Panel>;
}
