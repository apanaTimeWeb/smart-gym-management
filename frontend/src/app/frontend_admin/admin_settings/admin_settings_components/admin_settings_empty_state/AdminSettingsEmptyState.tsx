"use client";
// RESPONSIBILITY: Renders the empty state for Admin settings tabular configuration data.
import { useTranslations } from 'next-intl';

import { Bell } from 'lucide-react';

/**
 * AdminSettingsEmptyState renders the admin settings empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsEmptyState: Renders the empty state for Admin settings tabular configuration data.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSettingsEmptyState() {
  const t = useTranslations();
  return <div className="flex flex-col items-center justify-center gap-2 py-10 text-center" data-testid="admin_settings-admin_settings-empty-state-state">
    <Bell size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{t('settings.admin_settings_empty_state.text_no_events')}</h3>
    <p className="text-sm text-secondary">{t('settings.admin_settings_empty_state.text_empty')}</p>
  </div>;
}

