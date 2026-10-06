// RESPONSIBILITY: Renders ManagerDashboardRecentMembers's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import { DASHBOARD_RECENT_MEMBERS_PAGE_SIZE, RECENT_MEMBERS_HEADERS, DASHBOARD_STATUS_STYLES } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_constants/ManagerDashboardSharedConstants';
import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardUrlState';
import { ManagerDashboardFormatCurrency, ManagerDashboardFormatDate, ManagerDashboardDisplayValue } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_utils/ManagerDashboardFormatters';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_NAVIGATION_DESTINATIONS } from '@/app/frontend_manager/manager_navigation/manager_navigation_constants/ManagerNavigationDestinations';
/** @description Renders the ManagerDashboardRecentMembers component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardRecentMembers() {
  const t = useTranslations('MANAGER_DASHBOARD');
  const locale = useLocale();

  const { range } = useManagerDashboardUrlState();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('recentMembersSearch') || '';
  const currentPage = Number(searchParams.get('recentMembersPage') || '1');
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useManagerDebounce(localSearch, 300);
  const queryParams = useMemo(() => ({ range, recentMembersSearch: debouncedSearch, recentMembersPage: String(currentPage), recentMembersLimit: String(DASHBOARD_RECENT_MEMBERS_PAGE_SIZE) }), [range, debouncedSearch, currentPage]);
  const { data: stats } = useDashboardStatsQuery(queryParams);

  if (!stats) return null;
  const paginated = stats.recentMembers || [];
  const totalRecentMembers = stats.totalRecentMembers ?? paginated.length;
  const totalPages = Math.max(1, Math.ceil(totalRecentMembers / DASHBOARD_RECENT_MEMBERS_PAGE_SIZE));

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('recentMembersSearch', value); else params.delete('recentMembersSearch');
    params.set('recentMembersPage', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('recentMembersPage', String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="xl:col-span-2 rounded-xl shadow-card border overflow-hidden bg-card border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-border">
        <h2 className="font-semibold text-primary">{t("COPY_RECENT_MEMBERS")}</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} strokeWidth={2} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" />
            <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-8 pr-3 py-1.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page w-40 sm:w-52 bg-input text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-recent-members-input-value"
              value={localSearch}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder={t("COPY_SEARCH_MEMBERS")}
              
            />
          </div>
          <Link data-testid="manager_dashboard-manager-dashboard-recent-members-navigation" href={MANAGER_NAVIGATION_DESTINATIONS.MEMBERS} className="text-sm font-medium hover:underline whitespace-nowrap text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t("COPY_VIEW_ALL")}</Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-subtle">
            <tr>
              {RECENT_MEMBERS_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-6 py-3 text-secondary">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map(m => {
              const statusStyle = DASHBOARD_STATUS_STYLES[m.status] || { bg: 'bg-input', text: 'text-secondary' };
              return (
                <tr key={m.id} className="motion-safe:transition-all hover:bg-primary-subtle bg-card motion-safe:duration-base ease-in-out">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm bg-primary-subtle text-primary">
                        {m.name.charAt(0) || '?'}
                      </div>
                      <span className="text-sm font-medium text-primary">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {typeof m.plan === 'string' ? m.plan : ManagerDashboardDisplayValue(m.plan?.name)}
                  </td>
                  <td className="px-6 py-4">
                    <span data-testid={`manager_dashboard-manager-dashboard-recent-members-status-${m.id}`} className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {ManagerDashboardFormatDate(m.joinDate)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{ManagerDashboardFormatCurrency(m.paidAmount, ManagerEnvConfig.currencyCode, locale)}</td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={RECENT_MEMBERS_HEADERS.length} className="text-center py-8 text-sm text-secondary">
                  {search ? `No members matching "${search}"` : t('COPY_NO_MEMBERS_YET_ADD_FIRST_MEMBER')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="border-t border-border mt-2 p-2">
          <ManagerPagination data-testid="manager_dashboard-managerdashboardrecentmembers-managerpagination-1" 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalRecentMembers}
            itemsPerPage={DASHBOARD_RECENT_MEMBERS_PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        </div>
    </div>
  );
}
