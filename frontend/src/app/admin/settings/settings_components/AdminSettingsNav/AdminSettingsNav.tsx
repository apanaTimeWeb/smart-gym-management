// RESPONSIBILITY: Renders the left-side vertical navigation tabs for different settings sections.
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SETTINGS_TABS } from '@/app/admin/settings/settings_utils/AdminSettingsSharedConstants';

export default function AdminSettingsNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeTabId = searchParams.get('tab') || 'profile';

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {SETTINGS_TABS.map((s) => {
        const isActive = activeTabId === s.id;
        return (
          <button 
            key={s.id} 
            onClick={() => handleTabChange(s.id)}
            className={`bg-card border rounded-xl p-5 text-left transition-all group ${
              isActive 
                ? 'border-warning shadow-md ring-1 ring-warning' 
                : 'border-border hover:border-warning dark:hover:border-warning hover:shadow-sm'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon size={19} className={s.color} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
            <p className="text-sm text-secondary">{s.desc}</p>
          </button>
        );
      })}
    </div>
  );
}

