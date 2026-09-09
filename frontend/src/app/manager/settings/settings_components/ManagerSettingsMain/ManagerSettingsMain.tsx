'use client';
// RESPONSIBILITY: Root client component for Manager Settings page.
// DATA FLOW: useManagerSettingsLogic → ManagerSettingsMain
// Rule 20: SearchableDropdown replaces native <select>.

import { Bell, Globe, Save, Loader2, Building, Clock, Settings, Mail } from 'lucide-react';
import { useManagerSettingsLogic } from '@/app/manager/settings/settings_context/useManagerSettingsLogic';
import { LANGUAGE_OPTIONS, TIMEZONE_OPTIONS, SETTINGS_TABS, SettingsTab, DAYS_OF_WEEK } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';
import { SearchableDropdown } from '@/app/manager/manager_components/ManagerShared/SearchableDropdown';
import { useState } from 'react';

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

  const [activeTab, setActiveTab] = useState<SettingsTab>('region');
  const [gymProfile, setGymProfile] = useState({ gymName: 'Smart Gym', address: '123 Fitness St', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', phone: '9876543210', email: 'hello@smartgym.com' });
  const [membershipSettings, setMembershipSettings] = useState({ gracePeriodDays: 3, autoSuspendOnExpiry: true, allowFreeze: true, maxFreezeDaysPerYear: 30 });
  const [opHours, setOpHours] = useState(DAYS_OF_WEEK.map(day => ({ day, isOpen: day !== 'Sunday', openTime: '06:00', closeTime: '22:00' })));

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">App Settings</h1>
        <p className="text-secondary mt-1 text-sm">Manage your preferences and app behaviour.</p>
      </div>

      <div className="flex flex-wrap gap-1 bg-input rounded-xl p-1 w-fit">
        {SETTINGS_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg motion-safe:transition-colors ${
              activeTab === t.id ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {activeTab === 'region' && (
          <>
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Globe size={18} className="text-primary" strokeWidth={2} />
                <h2 className="text-base font-semibold text-foreground">Region &amp; Language</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Language</label>
                  <SearchableDropdown options={[...LANGUAGE_OPTIONS]} value={language} onChange={(val) => setLanguage(val as string)} placeholder="Select language" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Timezone</label>
                  <SearchableDropdown options={[...TIMEZONE_OPTIONS]} value={timezone} onChange={(val) => setTimezone(val as string)} placeholder="Select timezone" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Bell size={18} className="text-primary" strokeWidth={2} />
                <h2 className="text-base font-semibold text-foreground">Notification Preferences</h2>
              </div>
              <ToggleSwitch enabled={pushNotificationsEnabled} onToggle={() => setPushNotificationsEnabled((v) => !v)} label="Push Notifications" description="Receive alerts for new members and payments" />
              <ToggleSwitch enabled={emailDailyReports} onToggle={() => setEmailDailyReports((v) => !v)} label="Email Daily Reports" description="Get daily summary of collections and attendance" />
            </div>
          </>
        )}

        {activeTab === 'gym_profile' && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Building size={18} className="text-primary" strokeWidth={2} />
              <h2 className="text-base font-semibold text-foreground">Gym Profile</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Gym Name</label>
                <input value={gymProfile.gymName} onChange={e => setGymProfile({...gymProfile, gymName: e.target.value})} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Phone Number</label>
                <input value={gymProfile.phone} onChange={e => setGymProfile({...gymProfile, phone: e.target.value})} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-secondary mb-1.5">Address</label>
                <input value={gymProfile.address} onChange={e => setGymProfile({...gymProfile, address: e.target.value})} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">City</label>
                <input value={gymProfile.city} onChange={e => setGymProfile({...gymProfile, city: e.target.value})} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Pincode</label>
                <input value={gymProfile.pincode} onChange={e => setGymProfile({...gymProfile, pincode: e.target.value})} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operating_hours' && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Clock size={18} className="text-primary" strokeWidth={2} />
              <h2 className="text-base font-semibold text-foreground">Operating Hours</h2>
            </div>
            <div className="space-y-4">
              {opHours.map((oh, idx) => (
                <div key={oh.day} className="flex items-center gap-4">
                  <div className="w-32">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={oh.isOpen} onChange={e => {
                        const newOp = [...opHours];
                        newOp[idx].isOpen = e.target.checked;
                        setOpHours(newOp);
                      }} className="rounded border-border text-primary focus:ring-primary w-4 h-4" />
                      <span className="text-sm font-medium text-foreground">{oh.day}</span>
                    </label>
                  </div>
                  <input type="time" disabled={!oh.isOpen} value={oh.openTime} onChange={e => {
                    const newOp = [...opHours];
                    newOp[idx].openTime = e.target.value;
                    setOpHours(newOp);
                  }} className="bg-input border border-border text-sm rounded-lg px-3 py-1.5 text-foreground disabled:opacity-50" />
                  <span className="text-secondary text-sm">to</span>
                  <input type="time" disabled={!oh.isOpen} value={oh.closeTime} onChange={e => {
                    const newOp = [...opHours];
                    newOp[idx].closeTime = e.target.value;
                    setOpHours(newOp);
                  }} className="bg-input border border-border text-sm rounded-lg px-3 py-1.5 text-foreground disabled:opacity-50" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'membership' && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Settings size={18} className="text-primary" strokeWidth={2} />
              <h2 className="text-base font-semibold text-foreground">Membership Settings</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Grace Period (Days)</label>
                <input type="number" value={membershipSettings.gracePeriodDays} onChange={e => setMembershipSettings({...membershipSettings, gracePeriodDays: Number(e.target.value)})} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Max Freeze Days (Per Year)</label>
                <input type="number" value={membershipSettings.maxFreezeDaysPerYear} onChange={e => setMembershipSettings({...membershipSettings, maxFreezeDaysPerYear: Number(e.target.value)})} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
            <ToggleSwitch enabled={membershipSettings.autoSuspendOnExpiry} onToggle={() => setMembershipSettings(s => ({...s, autoSuspendOnExpiry: !s.autoSuspendOnExpiry}))} label="Auto-Suspend on Expiry" description="Automatically change member status to expired" />
            <ToggleSwitch enabled={membershipSettings.allowFreeze} onToggle={() => setMembershipSettings(s => ({...s, allowFreeze: !s.allowFreeze}))} label="Allow Membership Freeze" description="Allow members to freeze their membership" />
          </div>
        )}

        {activeTab === 'notification_templates' && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Mail size={18} className="text-primary" strokeWidth={2} />
              <h2 className="text-base font-semibold text-foreground">Notification Templates</h2>
            </div>
            <p className="text-sm text-secondary">Templates can be customized to match your gym's branding and tone.</p>
            <div className="space-y-4">
              <div className="bg-input border border-border rounded-lg p-4">
                <label className="block text-sm font-bold text-foreground mb-1">Renewal Reminder</label>
                <textarea rows={3} defaultValue="Hi {{member_name}}, your gym membership expires on {{expiry_date}}. Renew now to continue!" className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground mt-2 resize-none" />
              </div>
              <div className="bg-input border border-border rounded-lg p-4">
                <label className="block text-sm font-bold text-foreground mb-1">Payment Receipt</label>
                <textarea rows={3} defaultValue="Hi {{member_name}}, we received your payment of {{amount}}. Thank you!" className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground mt-2 resize-none" />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
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
