// RESPONSIBILITY: Tab switcher between "All Entries" and "Cross-Branch View" for the Blacklist module.
'use client';

import { Globe } from 'lucide-react';
import { useAdminBlacklistLogic } from '@/app/admin/blacklist/blacklist_context/useAdminBlacklistLogic';
import { BLACKLIST_TAB_OPTIONS } from '@/app/admin/blacklist/blacklist_utils/AdminBlacklistSharedConstants';

export default function AdminBlacklistTabs() {
  const { activeTab, setActiveTab, gymSpecificEntries } = useAdminBlacklistLogic();

  return (
    <div className="flex items-center gap-1 bg-input border border-border rounded-xl p-1 w-fit">
      {BLACKLIST_TAB_OPTIONS.map((tab) => {
        const isActive = activeTab === tab.value;
        const badge = tab.value === 'cross-branch' ? gymSpecificEntries.length : null;
        return (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-all ${
              isActive
                ? 'bg-card text-foreground shadow-sm border border-border'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            {tab.value === 'cross-branch' && <Globe size={14} />}
            {tab.label}
            {badge !== null && badge > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-warning-bg text-warning' : 'bg-input text-secondary'}`}>
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
