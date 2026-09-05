// RESPONSIBILITY: Renders the Platform Settings page. Fetches settings from API and allows inline editing per setting using TanStack Query.
'use client';

import { useState } from 'react';
import { Settings, BellRing, Loader2, Save } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import toast from 'react-hot-toast';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import type { PlatformSetting } from '@/app/superadmin/superadmin_types/superadmin_types';

const mockSettings: PlatformSetting[] = [
  { id: '1', key: 'MAX_MEMBERS_PER_GYM', value: '1000', description: 'Default maximum members for new tenants', category: 'general', dataType: 'number' },
  { id: '2', key: 'MAX_BRANCHES', value: '5', description: 'Default maximum branches allowed', category: 'general', dataType: 'number' },
  { id: '3', key: 'SYSTEM_CURRENCY', value: 'INR', description: 'Default currency for billing', category: 'general', dataType: 'string' },
  { id: '4', key: 'ENABLE_BETA_FEATURES', value: 'false', description: 'Toggle experimental features globally', category: 'general', dataType: 'boolean' }
];

export default function SuperadminSettingsClient() {
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const { data: fetchRes, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'settings'],
    queryFn: () => superadminApi.settings.fetchSettings(),
  });

  const responseData = fetchRes as { data?: PlatformSetting[] } | undefined;
  const settings = responseData?.data && responseData.data.length > 0 ? responseData.data : mockSettings;

  const updateMutation = useMutation({
    mutationFn: ({ id, value }: { id: string, value: string }) => superadminApi.settings.updateSetting(id, { value }),
    onSuccess: (res, variables) => {
      toast.success(res.message || 'Setting updated successfully');
      queryClient.setQueryData(['superadmin', 'settings'], (old: { data?: PlatformSetting[] } | undefined) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((s: PlatformSetting) => s.id === variables.id ? { ...s, value: variables.value } : s)
        };
      });
      setEditedValues(prev => {
        const next = { ...prev };
        delete next[variables.id];
        return next;
      });
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || 'Failed to update setting');
    }
  });

  const handleSave = (id: string) => {
    const newValue = editedValues[id];
    if (newValue === undefined) return;
    updateMutation.mutate({ id, value: newValue });
  };

  if (isLoading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" /></div>;
  }
  
  if (isError) {
    return <div className="flex h-96 items-center justify-center text-danger font-medium">Error loading settings.</div>;
  }

  const groupedSettings = settings.reduce<Record<string, PlatformSetting[]>>((acc, curr) => {
    const cat = curr.category || 'general';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-secondary mt-1">Configure global SaaS limits, master credentials, and system defaults.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(groupedSettings).map(([category, items]) => (
            <div key={category} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground uppercase">{category}</h2>
              </div>

              <div className="space-y-4 text-sm">
                {items.map(setting => {
                  const hasChanges = editedValues[setting.id] !== undefined && editedValues[setting.id] !== setting.value;
                  const currentValue = editedValues[setting.id] !== undefined ? editedValues[setting.id] : setting.value;

                  return (
                    <div key={setting.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-border last:border-0">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{setting.key}</h3>
                        <p className="text-xs text-secondary mt-1">{setting.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {setting.dataType === 'boolean' ? (
                          <SearchableDropdown
                            value={String(currentValue)}
                            onChange={(val) => setEditedValues(prev => ({ ...prev, [setting.id]: String(val) }))}
                            className="w-32"
                            options={[
                              { label: 'Enabled', value: 'true' },
                              { label: 'Disabled', value: 'false' }
                            ]}
                          />
                        ) : (
                          <input
                            type={setting.dataType === 'number' ? 'number' : 'text'}
                            value={currentValue}
                            onChange={(e) => setEditedValues(prev => ({ ...prev, [setting.id]: e.target.value }))}
                            className="bg-input border border-border text-foreground rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
                          />
                        )}
                        {hasChanges && (
                          <button
                            onClick={() => handleSave(setting.id)}
                            disabled={updateMutation.isPending && updateMutation.variables?.id === setting.id}
                            className="p-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg motion-safe:transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
              <BellRing className="w-5 h-5 text-warning" />
              <h2 className="text-lg font-bold text-foreground">Global Broadcast</h2>
            </div>
            <p className="text-sm text-secondary mb-4">Send a push notification to all Admins across all 50+ gyms.</p>
            <textarea
              disabled
              placeholder="e.g. System maintenance at 2AM EST..."
              className="w-full bg-input border border-border text-disabled rounded-lg px-4 py-2 h-24 resize-none cursor-not-allowed"
            />
            <button disabled className="mt-2 w-full bg-primary/50 text-white font-medium py-2 rounded-lg cursor-not-allowed">
              Broadcast Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

