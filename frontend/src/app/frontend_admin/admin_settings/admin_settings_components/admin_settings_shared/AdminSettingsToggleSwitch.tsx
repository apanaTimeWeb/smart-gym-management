"use client";
// RESPONSIBILITY: Renders an accessible boolean setting control for the Admin Settings module.
import { useTranslations } from 'next-intl';

import type { AdminSettingsToggleSwitchProps } from '@/app/frontend_admin/admin_settings/admin_settings_types/AdminSettingsToggleSwitchPropsTypes';


/**
 * AdminSettingsToggleSwitch renders the admin settings toggle switch UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsToggleSwitch: Renders an accessible boolean setting control for the Admin Settings module.
 * @dependencies Consumes AdminSettingsToggleSwitchPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminSettingsToggleSwitch({ checked, onChange, label }: AdminSettingsToggleSwitchProps) {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {label ? <span className="text-sm text-primary">{label}</span> : <span aria-hidden="true" />}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || t('settings.AdminSettingsToggleSwitch.remaining_toggleSetting')}
        onClick={() => onChange(!checked)}
        className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 min-h-11 min-w-11 relative w-11 h-6 rounded-full motion-safe:transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${checked ? 'bg-primary-subtle' : 'bg-input border border-border'}`}
       data-testid="admin_settings-admin_settings-toggle-switch-toggle">
        <span
          aria-hidden="true"
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-card motion-safe:transition-transform motion-safe:duration-base ${checked ? 'motion-safe:translate-x-5' : 'motion-safe:translate-x-0'}`}
        />
      </button>
    </div>
  );
}

