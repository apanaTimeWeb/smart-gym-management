'use client';

import { useState, useEffect } from 'react';
import { Settings, Shield, BellRing, Database, Loader2, Save } from 'lucide-react';
import { superadminApi } from '@/lib/superadmin-api';
import { useSuperadminMutation } from '@/app/superadmin/superadmin_utils/hooks/useSuperadminMutation';
import toast from 'react-hot-toast';

export default function SettingsClient() {
  const [settings, setSettings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedValues, setEditedValues] = useState<Record<string, any>>({});
  
  const { mutate, isMutating } = useSuperadminMutation();

  const fetchSettings = async () => {
    try {
      const res = await superadminApi.settings.getAll();
      setSettings(res.data || []);
    } catch (e: any) {
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (id: string) => {
    const newValue = editedValues[id];
    if (newValue === undefined) return;
    
    await mutate(
      () => superadminApi.settings.update(id, { value: newValue }),
      {
        successMessage: 'Setting updated successfully',
        onSuccess: () => {
          setSettings(prev => prev.map(s => s.id === id ? { ...s, value: newValue } : s));
          setEditedValues(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
        }
      }
    );
  };

  if (isLoading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  // Group settings by category
  const groupedSettings = settings.reduce((acc, curr) => {
    const cat = curr.category || 'general';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
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
                      <div className="flex items-center gap-2">
                        {setting.dataType === 'boolean' ? (
                          <select 
                            value={String(currentValue)}
                            onChange={(e) => setEditedValues(prev => ({ ...prev, [setting.id]: e.target.value }))}
                            className="bg-input border border-border text-foreground rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
                          >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                          </select>
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
                            disabled={isMutating}
                            className="p-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
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
            ></textarea>
            <button disabled className="mt-2 w-full bg-primary/50 text-white font-medium py-2 rounded-lg cursor-not-allowed">
              Broadcast Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
