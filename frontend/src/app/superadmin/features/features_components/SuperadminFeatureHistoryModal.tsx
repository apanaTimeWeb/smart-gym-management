'use client';
// RESPONSIBILITY: Renders the change history (audit log) for a specific feature flag.

import React, { useMemo } from 'react';
import { X, Clock } from 'lucide-react';
import type { FeatureFlag } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  flag: FeatureFlag | null;
}

export default function SuperadminFeatureHistoryModal({ isOpen, onClose, flag }: Props) {
  const history = useMemo(() => {
    if (!flag) return [];
    
    // Generate mock audit log history based on the flag
    const logs = [];
    const now = new Date();
    
    // Always an initial creation log
    logs.push({
      id: `hist-${flag.id}-1`,
      action: 'Created feature flag',
      user: 'System Admin',
      timestamp: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
    });
    
    // Mock a toggle event
    logs.push({
      id: `hist-${flag.id}-2`,
      action: `Toggled global state to ${flag.isGlobalEnabled ? 'ENABLED' : 'DISABLED'}`,
      user: 'Superadmin User',
      timestamp: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    });
    
    // If it has tenant overrides, mock that event
    if (flag.enabledTenantIds.length > 0) {
      logs.push({
        id: `hist-${flag.id}-3`,
        action: `Updated canary rollout to ${flag.enabledTenantIds.length} tenants`,
        user: 'Superadmin User',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      });
    }

    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [flag]);

  if (!isOpen || !flag) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
      <div 
        className="bg-card w-full max-w-md h-full flex flex-col shadow-2xl border-l border-border motion-safe:animate-in motion-safe:slide-in-from-right-full motion-safe:duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-foreground">Change History</h2>
            <p className="text-sm text-secondary mt-1 truncate max-w-[250px]">{flag.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-secondary hover:bg-input hover:text-foreground rounded-lg motion-safe:transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {history.map((log) => (
              <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-input text-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Clock size={14} />
                </div>
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-card shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-foreground text-sm">{log.user}</div>
                    <time className="text-xs font-medium text-secondary">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </time>
                  </div>
                  <div className="text-secondary text-sm">{log.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
