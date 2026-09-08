'use client';
// RESPONSIBILITY: Root client component for Manager Settings page.
// DATA FLOW: useManagerSettingsLogic → ManagerSettingsMain
// Rule 20: SearchableDropdown replaces native <select>.

import { Bell, Globe, Save, Loader2 } from 'lucide-react';
import { useManagerSettingsLogic } from '@/app/manager/settings/settings_context/useManagerSettingsLogic';
import { LANGUAGE_OPTIONS, TIMEZONE_OPTIONS } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';
import { SearchableDropdown } from '@/app/manager/manager_components/ManagerShared/SearchableDropdown';

function ToggleSwitch({ enabled, onToggle, label, description }: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description: string;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer p-3 bg-input rounded-xl border border-border motion-safe:transition-colors hover:border-primary/40">
      <div>
        <p className="font-medium text-foreground text-sm">{label}</p>
        <p className="text-xs text-secondary mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`w-11 h-6 flex items-center rounded-full p-1 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${enabled ? 'bg-primary' : 'bg-border'}`}
      >
        <span className={`bg-white w-4 h-4 rounded-full shadow-md motion-safe:transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </label>
  );
}

export default function ManagerSettingsMain() {
  const {
    language, setLanguage,
    timezone, setTimezone,
    pushNotificationsEnabled, setPushNotificationsEnabled,
    emailDailyReports, setEmailDailyReports,
    saving, handleSave,
  } = useManagerSettingsLogic();

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">App Settings</h1>
        <p className="text-secondary mt-1 text-sm">Manage your preferences and app behaviour.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Region & Language */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Globe size={18} className="text-primary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-foreground">Region &amp; Language</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Language</label>
              <SearchableDropdown
                options={[...LANGUAGE_OPTIONS]}
                value={language}
                onChange={(val) => setLanguage(val as string)}
                placeholder="Select language"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">Timezone</label>
              <SearchableDropdown
                options={[...TIMEZONE_OPTIONS]}
                value={timezone}
                onChange={(val) => setTimezone(val as string)}
                placeholder="Select timezone"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Bell size={18} className="text-primary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-foreground">Notification Preferences</h2>
          </div>
          <ToggleSwitch
            enabled={pushNotificationsEnabled}
            onToggle={() => setPushNotificationsEnabled((v) => !v)}
            label="Push Notifications"
            description="Receive alerts for new members and payments"
          />
          <ToggleSwitch
            enabled={emailDailyReports}
            onToggle={() => setEmailDailyReports((v) => !v)}
            label="Email Daily Reports"
            description="Get daily summary of collections and attendance"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg text-sm shadow-lg shadow-primary/20 motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {saving ? <Loader2 size={16} strokeWidth={2} className="motion-safe:animate-spin" /> : <Save size={16} strokeWidth={2} />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
