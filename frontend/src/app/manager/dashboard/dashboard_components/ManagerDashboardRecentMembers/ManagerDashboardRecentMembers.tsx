'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the recent members table on the dashboard with a local search filter.
import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useManagerDebounce } from '@/app/manager/manager_infrastructure/ManagerDebounce';
import Link from 'next/link';
import { Search, ArrowRight, UserPlus } from 'lucide-react';
import { DASHBOARD_RECENT_MEMBERS_PAGE_SIZE, RECENT_MEMBERS_HEADERS, DASHBOARD_STATUS_STYLES } from '@/app/manager/dashboard/dashboard_utils/ManagerDashboardSharedConstants';
import { formatCurrencyFromMinorUnits, formatDate, displayValue } from '@/lib/formatters';
import { ManagerDashboardUrlConfig } from '@/app/manager/dashboard/dashboard_url_config';
import { useDashboardStatsQuery } from '@/app/manager/dashboard/dashboard_api/ManagerUseManagerDashboardQueries';
import { useManagerDashboardUrlState } from '@/app/manager/dashboard/dashboard_hooks/ManagerUseManagerDashboardUrlState';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';

export default function ManagerDashboardRecentMembers() {
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
    <div className="xl:col-span-2 rounded-xl shadow-card border overflow-hidden bg-card border-border">
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-border">
        <h2 className="font-semibold text-primary">Recent Members</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              value={localSearch}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search members..."
              className="pl-8 pr-3 py-1.5 text-sm border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page w-40 sm:w-52 bg-input text-primary"
            />
          </div>
          <Link href={ManagerDashboardUrlConfig.NAV.MEMBERS} className="text-sm font-medium hover:underline whitespace-nowrap text-primary">View all</Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/5">
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
                <tr key={m.id} className="motion-safe:transition-colors hover:bg-primary/5 bg-card">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm bg-primary/10 text-primary">
                        {m.name.charAt(0) || '?'}
                      </div>
                      <span className="text-sm font-medium text-primary">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {typeof m.plan === 'string' ? m.plan : displayValue(m.plan?.name)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {formatDate(m.joinDate)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{formatCurrencyFromMinorUnits(m.paidAmount, ManagerEnvConfig.currencyCode)}</td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={RECENT_MEMBERS_HEADERS.length} className="text-center py-8 text-sm text-secondary">
                  {search ? `No members matching "${search}"` : 'No members yet. Add your first member!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="border-t border-border mt-2 p-2">
          <ManagerPagination 
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

