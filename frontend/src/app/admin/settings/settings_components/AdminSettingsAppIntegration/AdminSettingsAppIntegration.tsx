"use client";
// RESPONSIBILITY: Manages the App Integration settings tab.
import { useState } from 'react';
import type { AppIntegrationSettingsType } from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { useAdminSettingsAppIntegrationForm } from '@/app/admin/settings/settings_context/useAdminSettingsForms';
import { Save, RefreshCw, ExternalLink, Copy } from 'lucide-react';
import { AdminSettingsToggleSwitch } from '@/app/admin/settings/settings_components/AdminSettingsShared/AdminSettingsToggleSwitch';

export function AdminSettingsAppIntegration({ initialData }: { initialData: AppIntegrationSettingsType }) {
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const { form, formValues, mutation } = useAdminSettingsAppIntegrationForm(initialData);

  const onSubmit = (data: AppIntegrationSettingsType) => mutation.mutate(data);

  const features = [
    { key: 'memberAppEnabled' as const, label: 'Member Mobile App' },
    { key: 'qrCheckInEnabled' as const, label: 'QR Code Check-In' },
    { key: 'onlinePaymentsEnabled' as const, label: 'Online Payments' },
    { key: 'dietPlanEnabled' as const, label: 'Diet Plan Module' },
    { key: 'workoutPlanEnabled' as const, label: 'Workout Plan Module' },
    { key: 'progressTrackingEnabled' as const, label: 'Progress Tracking' },
    { key: 'pushNotificationsEnabled' as const, label: 'Push Notifications' },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-xl shadow-card border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-primary text-lg">App Integration</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map(f => (
            <div key={f.key} className="flex items-center justify-between p-3 bg-input rounded-xl border border-border">
              <AdminSettingsToggleSwitch
                checked={formValues[f.key] ?? initialData[f.key]}
                onChange={(v) => form.setValue(f.key, v, { shouldDirty: true })}
                label={f.label}
              />
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">App Store Links</p>
          {[
            { label: 'App Store (iOS)', key: 'appStoreLink' as const },
            { label: 'Play Store (Android)', key: 'playStoreLink' as const },
          ].map(f => {
            const link = formValues[f.key] ?? initialData[f.key];
            return (
              <div key={f.key}>
                <label className="block text-sm font-medium text-secondary mb-1">{f.label}</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    {...form.register(f.key)}
                    className="flex-1 px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
                  />
                  <a href={link || '#'} target="_blank" rel="noopener noreferrer"
                    className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page p-2.5 border border-border rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors ${!link ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                    aria-label="Open link">
                    <ExternalLink size={16} />
                  </a>
                </div>
                {form.formState.errors[f.key] && <p className="text-xs text-danger mt-1">{form.formState.errors[f.key]?.message as string}</p>}
              </div>
            );
          })}
        </div>

        <div className="space-y-4 pt-2 border-t border-border">
          <p className="text-sm font-semibold text-primary">API Configuration</p>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">API Key</label>
            <div className="flex gap-2">
              <input
                type="password"
                {...form.register('apiKey')}
                readOnly
                placeholder="No API key generated"
                className="flex-1 px-3 py-2.5 text-sm border border-border rounded-lg bg-input text-secondary cursor-default"
              />
              <button
                type="button"
                onClick={() => {
                  const key = form.getValues('apiKey');
                  if (!key) return;
                  void navigator.clipboard.writeText(key).then(() => {
                    setCopiedApiKey(true);
                    window.setTimeout(() => setCopiedApiKey(false), 2000);
                  });
                }}
                className="min-h-11 min-w-11 p-2.5 border border-border rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                aria-label="Copy API key"
              >
                <Copy size={16} />
              </button>
            </div>
            {copiedApiKey && <p className="text-xs text-success mt-1">Copied</p>}
            <p className="text-xs text-secondary mt-1">Contact support to regenerate your API key.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Webhook URL</label>
            <input
              type="url"
              {...form.register('webhookUrl')}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
            />
            {form.formState.errors.webhookUrl && <p className="text-xs text-danger mt-1">{form.formState.errors.webhookUrl.message as string}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}