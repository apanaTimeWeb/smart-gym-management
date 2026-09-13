'use client';
// RESPONSIBILITY: Shared toggle switch component for the Admin Settings module.

export function AdminSettingsToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer group w-full">
      <span className="text-sm text-foreground group-hover:text-primary motion-safe:transition-colors">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full motion-safe:transition-colors flex-shrink-0 ${checked ? 'bg-primary' : 'bg-input border border-border'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow motion-safe:transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </label>
  );
}
