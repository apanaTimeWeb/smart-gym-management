// RESPONSIBILITY: Renders the Global Audit Logs page with URL-synced search and pagination. Consumes useSuperadminData for API data and falls back to AUDIT_LOGS_FALLBACK constants.
'use client';
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { useDebounce } from '@/app/superadmin/superadmin_utils/useDebounce';
import { AUDIT_LOGS_FALLBACK, AUDIT_LOGS_PAGE_SIZE } from '@/app/superadmin/superadmin_utils/AuditLogsConstants';
import type { GlobalAuditLog } from '@/app/superadmin/audit-logs/audit-logs_types/audit-logs_types';

export default function AuditLogsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);
  const [searchInput, setSearchInput] = useState(searchParam || '');
  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync search and page to URL when debounced search or page changes.
  // searchParams intentionally excluded — including it causes an infinite push loop.
  useEffect(() => {
    // Refetch when search/page changes by syncing to URL
    const currentUrlParams = new URLSearchParams(Array.from(searchParams.entries()));
    let changed = false;

    if (debouncedSearch !== (currentUrlParams.get('search') || '')) {
      if (debouncedSearch) {
        currentUrlParams.set('search', debouncedSearch);
      } else {
        currentUrlParams.delete('search');
      }
      currentUrlParams.set('page', '1');
      setCurrentPage(1);
      changed = true;
    } else if (currentPage.toString() !== (currentUrlParams.get('page') || '1')) {
      currentUrlParams.set('page', currentPage.toString());
      changed = true;
    }

    if (changed) {
      router.push(`${pathname}?${currentUrlParams.toString()}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, currentPage, pathname, router]);

  // Construct query string for API
  const queryParams = new URLSearchParams();
  queryParams.set('page', currentPage.toString());
  if (debouncedSearch) {
    queryParams.set('search', debouncedSearch);
  }

  const endpoint = `${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}?${queryParams.toString()}`;
  
  const { data, fetchState, error } = useSuperadminData<{ logs: GlobalAuditLog[], total: number }>(endpoint);

  if (fetchState === 'loading') {
    return (
      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto animate-pulse">
        <div className="h-10 bg-card rounded w-1/4"></div>
        <div className="h-64 bg-card rounded-xl w-full"></div>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  const logs = data?.logs || AUDIT_LOGS_FALLBACK;
  const totalLogs = data?.total || AUDIT_LOGS_FALLBACK.length;
  const totalPages = Math.ceil(totalLogs / AUDIT_LOGS_PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-primary" />
            Global Audit Logs
          </h1>
          <p className="text-sm text-secondary mt-1">
            Immutable record of all superadmin and system-level actions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors w-64"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-primary/10 border-b border-border">
                <th className="w-48 px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Timestamp</th>
                <th className="w-56 px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Actor</th>
                <th className="w-48 px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Action</th>
                <th className="w-56 px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Target Resource</th>
                <th className="w-40 px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-primary/5 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary truncate">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 truncate" title={`${log.actorName} (${log.actorRole})`}>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground truncate">{log.actorName}</span>
                      <span className="text-xs text-secondary truncate">{log.actorRole}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap truncate" title={log.action}>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-info-bg text-info">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground truncate" title={log.targetResource}>
                    {log.targetResource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary truncate" title={log.ipAddress}>
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-secondary">
                    <ShieldAlert className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-base font-semibold">No audit logs found.</p>
                    <p className="text-xs mt-1">Try adjusting your search criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Bar */}
        {logs.length > 0 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-card">
            <span className="text-sm text-secondary">
              Showing {(currentPage - 1) * AUDIT_LOGS_PAGE_SIZE + 1} to {Math.min(currentPage * AUDIT_LOGS_PAGE_SIZE, totalLogs)} of {totalLogs} results
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-border rounded text-sm text-secondary hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-1 border border-border rounded text-sm text-secondary hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
