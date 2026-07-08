"use client";

import { useSettingsContext } from '../../settings_context/SettingsContext';
import { SETTINGS_TABS } from '../../settings_utils/SettingsSharedConstants';

export default function SettingsNav() {
  const { activeTab, setActiveTab } = useSettingsContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {SETTINGS_TABS.map((s, i) => {
        const isActive = activeTab === s.title;
        return (
          <button 
            key={i} 
            onClick={() => setActiveTab(s.title)}
            className={`bg-[var(--settings-bg-card)] border rounded-xl p-5 text-left transition-all group ${
              isActive 
                ? 'border-orange-400 shadow-md ring-1 ring-orange-400' 
                : 'border-[var(--settings-border)] hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-sm'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon size={19} className={s.color} />
            </div>
            <h3 className="font-semibold text-[var(--settings-text-primary)] mb-1">{s.title}</h3>
            <p className="text-sm text-[var(--settings-text-secondary)]">{s.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
