"use client";
// RESPONSIBILITY: Manages the General Settings tab.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GeneralSettingsSchema } from '@/app/admin/settings/settings_types/settings.schema';
import type { GeneralSettingsType } from '@/app/admin/settings/settings_types/settings_types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/app/admin/settings/settings_api/settings_api';
import toast from 'react-hot-toast';
import { Save, RefreshCw } from 'lucide-react';
import { useUnsavedChangesGuard } from '@/app/admin/admin_utils/useUnsavedChangesGuard';
import { TIMEZONE_OPTIONS, LANGUAGE_OPTIONS, BACKUP_FREQUENCY_OPTIONS } from '@/app/admin/settings/settings_utils/AdminSettingsSharedConstants';
import { AdminSettingsToggleSwitch } from '@/app/admin/settings/settings_components/AdminSettingsShared/AdminSettingsToggleSwitch';

export function AdminSettingsGeneral({ initialData }: { initialData: GeneralSettingsType }) {
  const queryClient = useQueryClient();
  const form = useForm<GeneralSettingsType>({
    resolver: zodResolver(GeneralSettingsSchema),
    defaultValues: initialData,
  });

  useUnsavedChangesGuard(form.formState.isDirty);

  const mutation = useMutation({
    mutationFn: (data: GeneralSettingsType) => settingsApi.updateSettings({ general: data }),
    onSuccess: (res) => {
      toast.success(res.message || 'General settings saved', { id: 'settings-general-save' });
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] });
      form.reset(form.getValues());
    },
    onError: (err) => toast.error((err as Error).message, { id: 'settings-general-save' }),
  });

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-sm border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-foreground text-lg">General Settings</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => form.reset(initialData)}
            disabled={!form.formState.isDirty || mutation.isPending}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-input text-secondary flex items-center gap-2 motion-safe:transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors"
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
                className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
              >
                {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Date Format</label>
            <select
              {...form.register('dateFormat')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
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
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
            />
            {form.formState.errors.sessionTimeoutMinutes && <p className="text-xs text-danger mt-1">{form.formState.errors.sessionTimeoutMinutes.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Data Retention (months)</label>
            <input
              type="number"
              {...form.register('dataRetentionMonths', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
            />
            {form.formState.errors.dataRetentionMonths && <p className="text-xs text-danger mt-1">{form.formState.errors.dataRetentionMonths.message}</p>}
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-foreground">System Toggles</p>
          {toggleFields.map(f => (
            <div key={f.key} className="flex items-center justify-between p-3 bg-input/40 rounded-xl border border-border">
              <AdminSettingsToggleSwitch
                checked={form.watch(f.key)}
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