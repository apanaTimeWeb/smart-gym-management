"use client";
// RESPONSIBILITY: Manages the Notifications settings tab.
import type { NotificationsSettingsType } from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { useAdminSettingsNotificationsForm } from '@/app/admin/settings/settings_context/useAdminSettingsForms';
import type { AdminSortDirection } from '@/app/admin/admin_types/AdminSortTypes';
import { useState, useMemo } from 'react';
import { Save, RefreshCw, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function AdminSettingsNotifications({ initialData }: { initialData: NotificationsSettingsType }) {
  const { form, formValues, mutation } = useAdminSettingsNotificationsForm(initialData);

  const onSubmit = (data: NotificationsSettingsType) => mutation.mutate(data);

  const channels = [
    { key: 'sms', label: 'SMS', color: 'text-info' },
    { key: 'email', label: 'Email', color: 'text-warning' },
    { key: 'whatsapp', label: 'WhatsApp', color: 'text-success' },
  ] as const;

  const [eventSort, setEventSort] = useState<AdminSortDirection>('asc');

  const events = useMemo(() => [
    { key: 'onJoin', label: 'New Member Joins' },
    { key: 'onExpiry', label: 'Membership Expiry Reminder' },
    { key: 'onPayment', label: 'Payment Received' },
    { key: 'onAbsence', label: 'Member Absence Alert' },
  ] as const, []);

  const sortedEvents = useMemo(() => [...events].sort((a,b) => eventSort === 'asc' ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)), [eventSort, events]);

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
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 disabled:opacity-70 hover:bg-primary-hover motion-safe:transition-colors"
          >
            <Save size={14} /> {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  onClick={() => setEventSort((current) => current === 'asc' ? 'desc' : 'asc')} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider cursor-pointer select-none" aria-sort={eventSort === 'asc' ? 'ascending' : 'descending'}><div className="flex items-center gap-1.5">Event {eventSort === 'asc' ? <ChevronUp size={13} className="text-primary"/> : <ChevronDown size={13} className="text-primary"/>}</div></th>
                {channels.map(c => (
                  <th key={c.key} className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center ${c.color}`}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedEvents.map(ev => (
                <tr key={ev.key} className="hover:bg-input/30 motion-safe:transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground font-medium">{ev.label}</td>
                  {channels.map(c => {
                    const fieldName = `${c.key}${ev.key}` as keyof NotificationsSettingsType;
                    const isChecked = (formValues[fieldName] ?? initialData[fieldName]) as boolean;
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
