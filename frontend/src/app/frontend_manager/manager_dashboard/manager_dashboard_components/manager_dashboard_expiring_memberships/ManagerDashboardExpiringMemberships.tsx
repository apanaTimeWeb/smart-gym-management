// RESPONSIBILITY: Renders ManagerDashboardExpiringMemberships's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { Search, BellRing } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardUrlState';
import { ManagerDashboardFormatDate } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_utils/ManagerDashboardFormatters';
import { MANAGER_NAVIGATION_DESTINATIONS } from '@/app/frontend_manager/manager_navigation/manager_navigation_constants/ManagerNavigationDestinations';
/** @description Renders the ManagerDashboardExpiringMemberships component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardExpiringMemberships() {
  const t = useTranslations('MANAGER_DASHBOARD');

  const { range } = useManagerDashboardUrlState();
  const { data: stats } = useDashboardStatsQuery({ range });
  const [search, setSearch] = useState('');
  const [remindedId, setRemindedId] = useState<string | null>(null);

  if (!stats) return null;
  const list = stats.expiringMemberships || [];

  const filtered = list.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl shadow-card border p-5 bg-card border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="font-semibold text-primary">{t("COPY_EXPIRING_MEMBERSHIPS")}</h2>
      </div>

      <div className="relative mb-4">
        <Search size={18} strokeWidth={2} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" />
        <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-8 pr-3 py-1.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page bg-input text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-expiring-memberships-input-value"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t("COPY_SEARCH_NAME_1")}
          
        />
      </div>

      <div className="space-y-3">
        {filtered.slice(0, 5).map((m, mapIndex) => (
          <div key={m.id} className="flex items-center justify-between py-2 border-b last:border-0 border-border group">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-warning text-on-warning" data-testid="manager_dashboard-managerdashboardexpiringmemberships-status-badge-1">
                {m.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-primary">{m.name}</p>
                <p className="text-xs text-secondary">{t("COPY_EXPIRES_2")}{ManagerDashboardFormatDate(m.expiryDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`p-1.5 rounded-lg motion-safe:transition-all ${
                  remindedId === m.id 
                    ? 'text-on-success bg-success' 
                    : 'text-secondary hover:text-warning hover:bg-warning-bg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 motion-safe:transition-all'
                } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_dashboard-dashboard-managerdashboardexpiringmemberships-button-send-reminder-${mapIndex}`}
                onClick={() => setRemindedId(m.id)}
                
                title={t("COPY_SEND_REMINDER_2")}
              >
                <BellRing size={18} strokeWidth={2}/>
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-center py-4 text-secondary">
            {search ? `No results for "${search}"` : t('COPY_NO_EXPIRING_MEMBERSHIPS')}
          </p>
        )}
      </div>

      <Link data-testid="manager_dashboard-manager-dashboard-expiring-memberships-navigation" href={MANAGER_NAVIGATION_DESTINATIONS.MEMBERS} className="mt-3 block w-full text-center text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t("COPY_VIEW_ALL_MEMBERS")}</Link>
    </div>
  );
}
