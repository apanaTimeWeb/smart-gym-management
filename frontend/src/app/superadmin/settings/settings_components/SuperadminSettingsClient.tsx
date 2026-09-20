// RESPONSIBILITY: Renders platform settings. The view owns only local draft input state; server state and mutations stay in the feature hook.
'use client';
import { useState } from 'react';
import { Settings, Save, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useSuperadminSettingsPage } from '@/app/superadmin/settings/settings_utils/useSuperadminSettingsPage';
import type { PlatformSetting } from '@/app/superadmin/settings/settings_types/SuperadminSettingsTypes';

export default function SuperadminSettingsClient() {
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const { query, updateSetting, isUpdating, variables } = useSuperadminSettingsPage();
  const settings: PlatformSetting[] = query.data?.data ?? [];

  const handleSave = async (id: string) => {
    const value = editedValues[id];
    if (value === undefined) return;
    try {
      const response = await updateSetting({ id, value });
      toast.success(response.message, { id: `superadmin-setting-save-${id}` });
      setEditedValues((previous) => {
        const next = { ...previous };
        delete next[id];
        return next;
      });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '', { id: `superadmin-setting-save-error-${id}` });
    }
  };

  if (query.isPending) {
    return (
      <div className="space-y-6" aria-busy="true" aria-label="Loading platform settings">
        <div>
          <div className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" />
          <div className="mt-2 h-4 w-96 max-w-full rounded bg-skeleton-base motion-safe:animate-pulse" />
        </div>
        <div className="max-w-4xl space-y-6">
          {[1, 2].map((item) => <div key={`settings-skeleton-${item}`} className="h-48 rounded-xl border border-border bg-skeleton-base p-6 motion-safe:animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-6 text-center">
        <p className="font-medium text-danger">Platform settings could not be loaded.</p>
        <button type="button" onClick={() => void query.refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">Retry</button>
      </div>
    );
  }

  const groupedSettings = settings.reduce<Record<string, PlatformSetting[]>>((accumulator, current) => {
    const category = current.category || 'general';
    const existing = accumulator[category] ?? [];
    existing.push(current);
    accumulator[category] = existing;
    return accumulator;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Platform Settings</h1>
        <p className="mt-1 text-secondary">Configure global SaaS limits, master credentials, and system defaults.</p>
      </div>
      <div className="max-w-4xl space-y-6">
        {Object.entries(groupedSettings).map(([category, items]) => (
          <section key={category} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 border-b border-border pb-4">
              <Settings size={18} strokeWidth={2} className="text-primary" aria-hidden="true"/>
              <h2 className="text-lg font-bold uppercase text-primary">{category}</h2>
            </div>
            <div className="space-y-4 text-sm">
              {items.map((setting) => {
                const hasChanges = editedValues[setting.id] !== undefined && editedValues[setting.id] !== setting.value;
                const currentValue = editedValues[setting.id] ?? setting.value;
                const isSavingThis = isUpdating && variables?.id === setting.id;
                return (
                  <div key={setting.id} className="flex flex-col justify-between gap-4 border-b border-border py-2 last:border-0 md:flex-row md:items-center">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-primary" title={setting.key}>{setting.key}</h3>
                      <p className="mt-1 text-xs text-secondary">{setting.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {setting.dataType === 'boolean' ? (
                        <SearchableDropdown value={String(currentValue)} onChange={(value) => setEditedValues((previous) => ({ ...previous, [setting.id]: String(value) }))} className="w-32" options={[{ label: 'Enabled', value: 'true' }, { label: 'Disabled', value: 'false' }]} />
                      ) : (
                        <input aria-label={setting.key} type={setting.dataType === 'number' ? 'number' : 'text'} value={currentValue} onChange={(event) => setEditedValues((previous) => ({ ...previous, [setting.id]: event.target.value }))} className="rounded-lg border border-border bg-input px-3 py-1.5 text-primary focus:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" />
                      )}
                      {hasChanges && (
                        <button type="button" onClick={() => void handleSave(setting.id)} disabled={isSavingThis} aria-label={`Save ${setting.key}`} className="min-h-11 min-w-11 rounded-lg bg-primary-subtle p-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">
                          <Save size={18} strokeWidth={2} aria-hidden="true"/>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-4">
            <FileText size={18} strokeWidth={2} className="text-primary" aria-hidden="true"/>
            <h2 className="text-lg font-bold uppercase text-primary">Changelog</h2>
          </div>
          <div className="space-y-6 text-sm">
            <div className="relative border-l-2 border-border pb-2 pl-6">
              <div className="absolute -left-2 top-1 h-3 w-3 rounded-full bg-primary" />
              <h3 className="mb-1 text-base font-semibold text-primary">v2.4.1 (Current)</h3>
              <p className="mb-2 text-xs text-secondary">Released on Sept 09, 2026</p>
              <ul className="list-disc space-y-1 pl-4 text-secondary"><li>Added support for trialGyms count in dashboard.</li><li>Fixed overdue invoices KPI aggregation bug.</li><li>Added &quot;Revenue by Plan Tier&quot; donut chart.</li></ul>
            </div>
            <div className="relative border-l-2 border-border pb-2 pl-6">
              <div className="absolute -left-2 top-1 h-3 w-3 rounded-full bg-border" />
              <h3 className="mb-1 text-base font-semibold text-primary">v2.4.0</h3>
              <p className="mb-2 text-xs text-secondary">Released on Aug 21, 2026</p>
              <ul className="list-disc space-y-1 pl-4 text-secondary"><li>Introduced Superadmin module.</li><li>Added global audit logs.</li><li>Basic Gym management and uptime tracker.</li></ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
