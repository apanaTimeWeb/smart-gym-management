"use client";
// RESPONSIBILITY: Manages the Notifications settings tab.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NotificationsSettingsSchema } from '@/app/admin/settings/settings_types/settings.schema';
import type { NotificationsSettingsType } from '@/app/admin/settings/settings_types/settings_types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/app/admin/settings/settings_api/settings_api';
import toast from 'react-hot-toast';
import { Save, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useUnsavedChangesGuard } from '@/app/admin/admin_utils/useUnsavedChangesGuard';

export function AdminSettingsNotifications({ initialData }: { initialData: NotificationsSettingsType }) {
  const queryClient = useQueryClient();
  const form = useForm<NotificationsSettingsType>({
    resolver: zodResolver(NotificationsSettingsSchema),
    defaultValues: initialData,
  });

  useUnsavedChangesGuard(form.formState.isDirty);

  const mutation = useMutation({
    mutationFn: (data: NotificationsSettingsType) => settingsApi.updateSettings({ notifications: data }),
    onSuccess: (res) => {
      toast.success(res.message || 'Notification settings saved', { id: 'settings-notifications-save' });
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] });
      form.reset(form.getValues());
    },
    onError: (err) => toast.error((err as Error).message, { id: 'settings-notifications-save' }),
  });

  const onSubmit = (data: NotificationsSettingsType) => mutation.mutate(data);

  const channels = [
    { key: 'sms', label: 'SMS', color: 'text-info' },
    { key: 'email', label: 'Email', color: 'text-warning' },
    { key: 'whatsapp', label: 'WhatsApp', color: 'text-success' },
  ] as const;

  const events = [
    { key: 'onJoin', label: 'New Member Joins' },
    { key: 'onExpiry', label: 'Membership Expiry Reminder' },
    { key: 'onPayment', label: 'Payment Received' },
    { key: 'onAbsence', label: 'Member Absence Alert' },
  ] as const;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-sm border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-foreground text-lg">Notifications</h2>
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Event</th>
                {channels.map(c => (
                  <th key={c.key} className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ${c.color}`}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map(ev => (
                <tr key={ev.key} className="hover:bg-input/30 motion-safe:transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground font-medium">{ev.label}</td>
                  {channels.map(c => {
                    const fieldName = `${c.key}${ev.key}` as keyof NotificationsSettingsType;
                    const isChecked = form.watch(fieldName) as boolean;
                    return (
                      <td key={c.key} className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => form.setValue(fieldName, !isChecked as Extract<NotificationsSettingsType[typeof fieldName], boolean>, { shouldDirty: true })}
                          aria-label={`Toggle ${c.label} for ${ev.label}`}
                        >
                          {isChecked
                            ? <CheckCircle size={20} className="text-success mx-auto" />
                            : <XCircle size={20} className="text-secondary mx-auto" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-border">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Expiry Reminder (days before)</label>
            <input
              type="number"
              {...form.register('expiryReminderDays', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
            />
            {form.formState.errors.expiryReminderDays && <p className="text-xs text-danger mt-1">{form.formState.errors.expiryReminderDays.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Absence Alert Threshold (days)</label>
            <input
              type="number"
              {...form.register('absenceThresholdDays', { valueAsNumber: true })}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
            />
            {form.formState.errors.absenceThresholdDays && <p className="text-xs text-danger mt-1">{form.formState.errors.absenceThresholdDays.message}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}