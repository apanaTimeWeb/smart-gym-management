'use client';
// RESPONSIBILITY: Renders the editable Manager Settings tabs using an RHF draft backed by Manager Settings API data.
// DATA FLOW: ManagerSettingsQuery → ManagerSettingsMain RHF draft → ManagerSettings mutation → Query cache.
import { Bell, Building, Clock, Globe, Loader2, Mail, Save, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_utils/ManagerToastService';
import { useManagerSettingsLogic } from '@/app/manager/settings/settings_context/ManagerUseManagerSettingsLogic';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_utils/ManagerUnsavedChangesGuard';
import { SearchableDropdown } from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { LANGUAGE_OPTIONS, TIMEZONE_OPTIONS, SETTINGS_TABS, NOTIFICATION_TEMPLATE_LABELS, type ManagerAllSettings, type SettingsTab } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';
import { managerAllSettingsSchema } from '@/app/manager/settings/settings_types/ManagerSettingsSchema';

const EMPTY_SETTINGS: ManagerAllSettings = {
  preferences: { language: 'en-US', timezone: 'Asia/Kolkata', pushNotificationsEnabled: true, emailDailyReports: true },
  gymProfile: { gymName: '', address: '', city: '', state: '', pincode: '', phone: '', email: '' },
  operatingHours: [],
  membershipSettings: { gracePeriodDays: 0, autoSuspendOnExpiry: false, autoSuspendAfterDays: 0, allowFreeze: false, maxFreezeDaysPerYear: 0, reminderDaysBefore: 0 },
  notificationTemplates: [],
};

export default function ManagerSettingsMain() {
  const { settings, isLoading, isError, saveSettings, saving } = useManagerSettingsLogic();
  const [activeTab, setActiveTab] = useState<SettingsTab>('region');
  const { control, register, handleSubmit, reset, formState: { isDirty, errors } } = useForm<ManagerAllSettings>({ resolver: zodResolver(managerAllSettingsSchema), defaultValues: settings ?? EMPTY_SETTINGS });

  useEffect(() => { if (settings) reset(settings); }, [reset, settings]);
  useManagerUnsavedChangesGuard(isDirty);

  const handleSave = async (draft: ManagerAllSettings) => {
    try {
      const response = await saveSettings(draft);
      showManagerSuccessToast(response.message, 'manager-settings-success');
      reset(response.data ?? draft);
    } catch (error) {
      showManagerErrorToast(error, 'manager-settings-error');
    }
  };

  if (isLoading && !settings) return <div className="p-6 space-y-5 motion-safe:animate-pulse"><div className="h-8 w-48 rounded bg-skeleton-base" /><div className="h-12 w-96 rounded bg-skeleton-base" /><div className="h-96 rounded-xl bg-skeleton-base" /></div>;
  if (isError && !settings) return <div role="alert" className="m-6 rounded-xl border border-danger bg-danger-bg p-5 text-sm text-danger">Unable to load settings. Retry by refreshing this route.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div><h1 className="text-2xl font-bold text-foreground">App Settings</h1><p className="text-secondary mt-1 text-sm">Manage your preferences and app behaviour.</p></div>
      <div className="flex flex-wrap gap-1 bg-input rounded-xl p-1 w-fit">
        {SETTINGS_TABS.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-sm font-medium rounded-lg motion-safe:transition-colors ${activeTab === tab.id ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}>{tab.label}</button>)}
      </div>
      <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
        {activeTab === 'region' && <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3"><Globe size={18} className="text-primary" /><h2 className="text-base font-semibold text-foreground">Region &amp; Language</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Controller name="preferences.language" control={control} render={({ field }) => <SearchableDropdown options={[...LANGUAGE_OPTIONS]} value={field.value} onChange={field.onChange} placeholder="Select language" />} />
            <Controller name="preferences.timezone" control={control} render={({ field }) => <SearchableDropdown options={[...TIMEZONE_OPTIONS]} value={field.value} onChange={field.onChange} placeholder="Select timezone" />} />
          </div>
          {([['preferences.pushNotificationsEnabled','Push Notifications','Receive alerts for new members and payments'],['preferences.emailDailyReports','Email Daily Reports','Get daily summary of collections and attendance']] as const).map(([name,label,description]) => <Controller key={name} name={name} control={control} render={({ field }) => <label className="flex items-center justify-between p-3 bg-input rounded-xl border border-border"><div><p className="font-medium text-foreground text-sm">{label}</p><p className="text-xs text-secondary mt-0.5">{description}</p></div><input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" aria-label={label} /></label>} />)}
        </section>}

        {activeTab === 'gym_profile' && <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3"><Building size={18} className="text-primary" /><h2 className="text-base font-semibold text-foreground">Gym Profile</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{(['gymName','phone','email','address','city','state','pincode','website','gstin'] as const).map((fieldName) => <div key={fieldName}><label htmlFor={`gym-${fieldName}`} className="block text-sm font-medium text-secondary mb-1.5">{fieldName.replace(/([A-Z])/g,' $1')}</label><input id={`gym-${fieldName}`} {...register(`gymProfile.${fieldName}`)} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />{errors.gymProfile?.[fieldName]?.message && <p className="mt-1 text-xs text-danger">{String(errors.gymProfile[fieldName]?.message)}</p>}</div>)}</div>
        </section>}

        {activeTab === 'operating_hours' && <section className="bg-card border border-border rounded-xl p-6 space-y-5"><div className="flex items-center gap-2 border-b border-border pb-3"><Clock size={18} className="text-primary" /><h2 className="text-base font-semibold text-foreground">Operating Hours</h2></div>{(settings?.operatingHours ?? []).map((item, index) => <div key={item.day} className="flex flex-col sm:flex-row sm:items-center gap-3"><Controller name={`operatingHours.${index}.isOpen`} control={control} render={({ field }) => <label className="flex items-center gap-2 w-32"><input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-border text-primary" />{item.day}</label>} /><input type="time" {...register(`operatingHours.${index}.openTime`)} className="bg-input border border-border rounded-lg px-3 py-1.5 text-sm" /><span className="text-secondary text-sm">to</span><input type="time" {...register(`operatingHours.${index}.closeTime`)} className="bg-input border border-border rounded-lg px-3 py-1.5 text-sm" /></div>)}</section>}

        {activeTab === 'membership' && <section className="bg-card border border-border rounded-xl p-6 space-y-5"><div className="flex items-center gap-2 border-b border-border pb-3"><Settings size={18} className="text-primary" /><h2 className="text-base font-semibold text-foreground">Membership Settings</h2></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{(['gracePeriodDays','maxFreezeDaysPerYear','autoSuspendAfterDays','reminderDaysBefore'] as const).map((fieldName) => <div key={fieldName}><label htmlFor={`membership-${fieldName}`} className="block text-sm font-medium text-secondary mb-1.5">{fieldName.replace(/([A-Z])/g,' $1')}</label><input id={`membership-${fieldName}`} type="number" min="0" {...register(`membershipSettings.${fieldName}`, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" /></div>)}</div>{(['autoSuspendOnExpiry','allowFreeze'] as const).map((fieldName) => <Controller key={fieldName} name={`membershipSettings.${fieldName}`} control={control} render={({ field }) => <label className="flex items-center gap-3 p-3 bg-input rounded-xl border border-border"><input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-border text-primary" />{fieldName.replace(/([A-Z])/g,' $1')}</label>} />)}</section>}

        {activeTab === 'notification_templates' && <section className="bg-card border border-border rounded-xl p-6 space-y-5"><div className="flex items-center gap-2 border-b border-border pb-3"><Mail size={18} className="text-primary" /><h2 className="text-base font-semibold text-foreground">Notification Templates</h2></div>{(settings?.notificationTemplates ?? []).map((template,index) => <div key={template.id} className="bg-input border border-border rounded-lg p-4 space-y-3"><label className="block text-sm font-bold text-foreground">{NOTIFICATION_TEMPLATE_LABELS[template.type]}</label><textarea rows={4} {...register(`notificationTemplates.${index}.body`)} className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none" /> <Controller name={`notificationTemplates.${index}.isActive`} control={control} render={({ field }) => <label className="flex items-center gap-2 text-xs text-secondary"><input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-border text-primary" /> Active</label>} /></div>)}</section>}

        <div className="flex justify-end pt-4"><button type="submit" disabled={saving} className="min-w-32 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-lg text-sm shadow-lg motion-safe:transition-colors disabled:opacity-60">{saving ? <Loader2 size={16} className="motion-safe:animate-spin" /> : <Save size={16} />} {saving ? 'Saving…' : 'Save Settings'}</button></div>
      </form>
    </div>
  );
}
