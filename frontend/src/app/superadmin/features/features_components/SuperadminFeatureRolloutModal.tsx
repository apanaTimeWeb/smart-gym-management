// RESPONSIBILITY: Renders the SuperadminFeatureRolloutModal component using TanStack Query.
'use client';
// Allows Superadmin to select specific tenants (gyms) for a canary feature rollout.
import React, { useState, useEffect } from 'react';
import { X, Loader2, Search } from 'lucide-react';
import type { FeatureFlag, SuperadminFeaturesTenant } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import { useSuperadminFeatureRolloutData } from '@/app/superadmin/features/features_utils/useSuperadminFeatureRolloutData';
import type { SuperadminFeatureRolloutModalProps } from '@/app/superadmin/features/features_types/SuperadminFeaturesUiTypes';
export default function SuperadminFeatureRolloutModal({ isOpen, onClose, flag, onSaveRollout }: SuperadminFeatureRolloutModalProps) {
    const [search, setSearch] = useState('');
    const [selectedTenantIds, setSelectedTenantIds] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const { tenants, isPending: fetchStateLoading } = useSuperadminFeatureRolloutData(isOpen);
    const gyms = tenants;
    // RESPONSIBILITY: Handle side-effects for SuperadminFeatureRolloutModal
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local UI state with the listed inputs and clean up any browser/resource subscription created by this effect.
    useEffect(() => {
        if (isOpen && flag) {
            setSelectedTenantIds(flag.enabledTenantIds || []);
        }
        else if (!isOpen) {
            setSearch('');
            setSelectedTenantIds([]);
        }
    }, [isOpen, flag]);
    if (!isOpen || !flag)
        return null;
    const filteredGyms = gyms?.filter(g => g.name?.toLowerCase().includes(search.toLowerCase()) || g.id?.includes(search)) || [];
    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSaveRollout(selectedTenantIds);
            onClose();
        }
        finally {
            setIsSaving(false);
        }
    };
    return (<div className="fixed inset-0 bg-overlay/80 z-40 flex items-center justify-center p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true">
      <div className="bg-overlay border border-border rounded-2xl w-full max-w-md shadow-dialog overflow-hidden flex flex-col motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-primary">Canary Rollout</h2>
            <p className="text-sm text-secondary">Select gyms to enable <span className="font-semibold text-primary">{flag.name}</span></p>
          </div>
          <button onClick={onClose} className="p-2 text-secondary hover:text-primary hover:bg-input rounded-full motion-safe:transition-colors">
            <X size={18}/>
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary"/>
            <input type="text" placeholder="Search by gym name..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary motion-safe:transition-colors"/>
          </div>

          <div className="flex justify-between items-center px-1">
            <span className="text-sm font-semibold text-secondary">Found {filteredGyms.length} gyms</span>
            <div className="space-x-3">
              <button onClick={() => setSelectedTenantIds(filteredGyms.map(g => g.id))} className="text-xs font-semibold text-primary hover:underline">
                Select All
              </button>
              <button onClick={() => setSelectedTenantIds([])} className="text-xs font-semibold text-secondary hover:underline">
                Clear
              </button>
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden flex flex-col h-64 bg-page">
            {fetchStateLoading ? (<div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-6 h-6 motion-safe:animate-spin text-primary"/>
              </div>) : filteredGyms.length === 0 ? (<div className="flex-1 flex items-center justify-center text-sm text-secondary">
                No tenants found.
              </div>) : (<div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {filteredGyms.map(gym => {
                const isSelected = selectedTenantIds.includes(gym.id);
                return (<button key={gym.id} onClick={() => {
                        setSelectedTenantIds(prev => prev.includes(gym.id) ? prev.filter(id => id !== gym.id) : [...prev, gym.id]);
                    }} className={`w-full text-left px-4 py-3 rounded-md text-sm motion-safe:transition-colors flex items-center justify-between ${isSelected ? 'bg-primary/10 border-primary text-on-primary font-semibold' : 'hover:bg-input text-on-primary border-transparent'} border`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-on-primary' : 'border-border bg-input'}`}>
                          {isSelected && <X className="w-3 h-3"/>}
                        </div>
                        <span>{gym.name}</span>
                      </div>
                      <span className={`text-xs ${isSelected ? 'text-on-primary' : 'text-secondary'}`}>ID: {gym.id}</span>
                    </button>);
            })}
              </div>)}
          </div>
        </div>

        <div className="px-6 py-5 border-t border-border flex justify-end gap-3 bg-sidebar/50">
          <button onClick={onClose} className="px-5 py-2.5 bg-transparent border border-border hover:bg-input text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm">
            Cancel
          </button>
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm disabled:cursor-not-allowed">
            {isSaving && <Loader2 className="w-4 h-4 motion-safe:animate-spin"/>}
            Save Rollout ({selectedTenantIds.length} Gyms)
          </button>
        </div>
      </div>
    </div>);
}
