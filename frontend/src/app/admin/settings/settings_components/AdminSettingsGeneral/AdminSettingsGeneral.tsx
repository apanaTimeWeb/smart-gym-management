"use client";
// RESPONSIBILITY: Manages the General Settings tab.
import type { GeneralSettingsType } from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { useAdminSettingsGeneralForm } from '@/app/admin/settings/settings_context/useAdminSettingsForms';
import { Save, RefreshCw } from 'lucide-react';
import { TIMEZONE_OPTIONS, LANGUAGE_OPTIONS, BACKUP_FREQUENCY_OPTIONS } from '@/app/admin/settings/settings_utils/AdminSettingsSharedConstants';
import { AdminSettingsToggleSwitch } from '@/app/admin/settings/settings_components/AdminSettingsShared/AdminSettingsToggleSwitch';

export function AdminSettingsGeneral({ initialData }: { initialData: GeneralSettingsType }) {
  const { form, formValues, mutation } = useAdminSettingsGeneralForm(initialData);

  const onSubmit = (data: GeneralSettingsType) => mutation.mutate(data);

  const selectFields = [
    { label: 'Timezone', key: 'timezone' as const, options: TIMEZONE_OPTIONS },
    { label: 'Language', key: 'language' as const, options: LANGUAGE_OPTIONS },
    { label: 'Backup Frequency', key: 'backupFrequency' as const, options: BACKUP_FREQUENCY_OPTIONS },
  ];

  const toggleFields = [
    { key: 'autoBackup' as const, label: 'Automatic Daily Backup' },
    { key: 'maintenanceMode' as const, label: 'Maintenance Mode' },
    { key: 'twoFactorAuth' as const, label: 'Two-Factor Authentication (2FA)' },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">General Settings</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <Save size={14} /> {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {selectFields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
              <select
                {...form.register(f.key)}
                className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
              >
                {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Date Format</label>
            <select
              {...form.register('dateFormat')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Session Timeout (minutes)</label>
            <input
              type="number"
              {...form.register('sessionTimeoutMinutes', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
            />
            {form.formState.errors.sessionTimeoutMinutes && <p className="text-xs text-danger mt-1">{form.formState.errors.sessionTimeoutMinutes.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Data Retention (months)</label>
            <input
              type="number"
              {...form.register('dataRetentionMonths', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
            />
            {form.formState.errors.dataRetentionMonths && <p className="text-xs text-danger mt-1">{form.formState.errors.dataRetentionMonths.message as string}</p>}
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">System Toggles</p>
          {toggleFields.map(f => (
            <div key={f.key} className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
              <AdminSettingsToggleSwitch
                checked={formValues[f.key] ?? initialData[f.key]}
                onChange={(v) => form.setValue(f.key, v, { shouldDirty: true })}
                label={f.label}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}