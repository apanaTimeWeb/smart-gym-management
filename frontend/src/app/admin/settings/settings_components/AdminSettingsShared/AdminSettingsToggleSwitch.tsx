"use client";
// RESPONSIBILITY: Renders an accessible boolean setting control for the Admin Settings module.

import type { AdminSettingsToggleSwitchProps } from '@/app/admin/settings/settings_types/AdminSettingsToggleSwitchPropsTypes';


export function AdminSettingsToggleSwitch({ checked, onChange, label }: AdminSettingsToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {label ? <span className="text-sm text-primary">{label}</span> : <span aria-hidden="true" />}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle setting'}
        onClick={() => onChange(!checked)}
        className={`min-h-11 min-w-11 relative w-11 h-6 rounded-full motion-safe:transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${checked ? 'bg-primary-subtle' : 'bg-input border border-border'}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-card motion-safe:transition-transform motion-safe:duration-base ${checked ? 'motion-safe:translate-x-5' : 'motion-safe:translate-x-0'}`}
        />
      </button>
    </div>
  );
}

