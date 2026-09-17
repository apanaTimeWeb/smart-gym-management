"use client";
// RESPONSIBILITY: Renders an accessible boolean setting control for the Admin Settings module.

interface AdminSettingsToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

export function AdminSettingsToggleSwitch({ checked, onChange, label }: AdminSettingsToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {label ? <span className="text-sm text-foreground">{label}</span> : <span aria-hidden="true" />}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle setting'}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full motion-safe:transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${checked ? 'bg-primary' : 'bg-input border border-border'}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow motion-safe:transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}
