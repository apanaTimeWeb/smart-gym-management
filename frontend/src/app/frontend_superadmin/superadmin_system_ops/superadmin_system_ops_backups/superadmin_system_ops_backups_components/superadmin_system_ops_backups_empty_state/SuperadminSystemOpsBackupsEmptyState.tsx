'use client';
// RESPONSIBILITY: Renders the empty state UI for the Backups table when no backups exist.
import { useTranslations } from 'next-intl';

import { DatabaseBackup } from 'lucide-react';

/**
 * @description Renders the empty state UI for the Backups table when no backups exist.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsBackupsEmptyState() {
  const t = useTranslations('superadmin_system_ops_backups');
    return (<div data-testid="superadmin_system_ops_backups-backups-empty-state-back" className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4">
        <DatabaseBackup size={18} className="w-8 text-secondary opacity-50"/>
      </div>
      <h3 className="text-base font-semibold text-primary">{t('ui.no_backups_found_d0980c3')}</h3>
      <p className="text-sm text-secondary mt-1 max-w-xs">{t('ui.there_are_no_backups_available_for_this_instance_yet_e35d90b')}</p>
    </div>);
}
