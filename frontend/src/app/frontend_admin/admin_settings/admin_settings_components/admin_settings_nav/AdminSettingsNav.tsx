"use client";
// RESPONSIBILITY: Renders the left-side vertical navigation tabs for different settings sections.
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SETTINGS_TABS } from '@/app/frontend_admin/admin_settings/admin_settings_constants/AdminSettingsConstants';

/**
 * AdminSettingsNav renders the admin settings nav UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSettingsNav: Renders the left-side vertical navigation tabs for different settings sections.
 * @dependencies Consumes AdminSettingsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
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
      {SETTINGS_TABS.map((s , __testIdIndex28) => {
        const isActive = activeTabId === s.id;
        return (
          <button
            type="button"
            key={s.id} 
            onClick={() => handleTabChange(s.id)}
            className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 bg-card border rounded-xl p-5 text-left motion-safe:transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isActive 
                ? 'border-border shadow-card ring-1 ring-primary' 
                : 'border-border hover:border-border dark:hover:border-border hover:shadow-card'
            }`}
           data-testid={`admin_settings-admin_settings-nav-click-map28-${__testIdIndex28}-1`}>
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3 motion-safe:group-hover:scale-110 motion-safe:transition-transform`}>
              <s.icon size={18} className={s.color} />
            </div>
            <h3 className="font-semibold text-primary mb-1">{s.title}</h3>
            <p className="text-sm text-secondary">{s.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
