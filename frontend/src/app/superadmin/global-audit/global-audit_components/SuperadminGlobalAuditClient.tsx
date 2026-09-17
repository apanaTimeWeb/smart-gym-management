// RESPONSIBILITY: Renders the Global Audit Logs dashboard for superadmins to monitor system-wide security events.
'use client';
import { formatDate, formatDateTime } from '@/lib/formatters';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auditLogsApi } from '@/app/superadmin/global-audit/superadmin_global-audit_api/superadmin_global-audit_api';
import type { AuditLog } from '@/app/superadmin/global-audit/superadmin_global-audit_types/superadmin_global-audit_types';
import { ShieldAlert, Search, Filter, AlertTriangle, Info, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
export type AuditSeverityFilter = 'ALL' | 'INFO' | 'WARNING' | 'CRITICAL';
export type AuditActorFilter = 'ALL' | 'SUPERADMIN' | 'SYSTEM' | 'TENANT';
const TABLE_COLUMN_COUNT = 4;
export default function SuperadminGlobalAuditClient() {
    const { getParam, setParam } = useSuperadminUrlState();
    const search = getParam('search', '');
    const severityFilter = getParam('severityFilter', 'ALL') as AuditSeverityFilter;
    const actorTypeFilter = getParam('actorTypeFilter', 'ALL') as AuditActorFilter;
    const currentPage = Number(getParam('page', '1'));
    const ITEMS_PER_PAGE = 20;
    const setSearch = (val: string) => {
        setParam('search', val);
        setParam('page', '1');
    };
    const setSeverityFilter = (val: AuditSeverityFilter) => {
        setParam('severityFilter', val);
        setParam('page', '1');
    };
    const setActorTypeFilter = (val: AuditActorFilter) => {
        setParam('actorTypeFilter', val);
        setParam('page', '1');
    };
    const setCurrentPage = (val: number) => setParam('page', String(val));
    const queryParams = {
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        ...(search && { search }),
        ...(severityFilter !== 'ALL' && { severity: severityFilter }),
        ...(actorTypeFilter !== 'ALL' && { actorType: actorTypeFilter }),
    };
    const { data: queryData, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ['superadmin', 'global-audit', queryParams],
        queryFn: async () => {
            const res = await auditLogsApi.fetchGlobalLogs(queryParams);
            if (res.success && res.data) {
                return { logs: res.data, total: res.meta?.total || res.data.length };
            }
            return { logs: [], total: 0 };
        }
    });
    const fetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
    const displayLogs = queryData?.logs || [];
    const totalLogs = queryData?.total || 0;
    const filteredLogs = displayLogs; // Server-side filtering applied
    const totalPages = Math.ceil(totalLogs / ITEMS_PER_PAGE) || 1;
    const paginatedLogs = filteredLogs; // Server-side pagination applied
    const getSeverityBadge = (severity: AuditLog['severity']) => {
        switch (severity) {
            case 'CRITICAL':
                return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold bg-danger text-white tracking-wider"><ShieldAlert className="w-3 h-3"/> CRITICAL</span>;
            case 'WARNING':
                return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold bg-warning text-white tracking-wider"><AlertTriangle className="w-3 h-3"/> WARNING</span>;
            case 'INFO':
                return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold bg-primary/10 text-primary tracking-wider"><Info className="w-3 h-3"/> INFO</span>;
        }
    };
    const exportLogs = () => {
        if (filteredLogs.length === 0) {
            toast.error('No logs to export', { id: 'no-logs-to-export' });
            return;
        }
        const headers = ['Timestamp', 'Severity', 'Action', 'Resource', 'Details', 'Actor', 'IP Address'];
        const csvContent = [
            headers.join(','),
            ...filteredLogs.map((log: AuditLog) => [
                new Date(log.timestamp).toISOString(),
                log.severity,
                `"${(log.action || '').replace(/"/g, '""')}"`,
                `"${(log.resource || '').replace(/"/g, '""')}"`,
                `"${(log.details || '').replace(/"/g, '""')}"`,
                `"${(log.actor || '').replace(/"/g, '""')}"`,
                log.ipAddress
            ].join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `global_audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Exporting global audit logs as CSV...', { id: 'exporting-global-audit-logs-as-csv' });
    };
    const severityOptions = [
        { value: 'ALL', label: 'All Severities' },
        { value: 'INFO', label: 'Info' },
        { value: 'WARNING', label: 'Warning' },
        { value: 'CRITICAL', label: 'Critical' },
    ];
    const actorTypeOptions = [
        { value: 'ALL', label: 'All Actors' },
        { value: 'SUPERADMIN', label: 'Superadmin' },
        { value: 'SYSTEM', label: 'System' },
        { value: 'TENANT', label: 'Gym' },
    ];
    if (isLoading) {
        return (<div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded mb-2"/>
            <div className="h-4 w-96 bg-skeleton-base motion-safe:animate-pulse rounded"/>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 h-10 bg-skeleton-base motion-safe:animate-pulse rounded-lg"/>
            <div className="w-32 h-10 bg-skeleton-base motion-safe:animate-pulse rounded-lg"/>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col min-h-96">
          <div className="p-4 border-b border-border bg-card-hover/50">
            <div className="h-10 w-full max-w-md bg-skeleton-base motion-safe:animate-pulse rounded-lg"/>
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (<div key={`skeleton-${i}`} className="h-16 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border"/>))}
          </div>
        </div>
      </div>);
    }
    return (<div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Global Audit Logs</h1>
          <p className="text-secondary mt-1">Immutable security ledger for system-wide infrastructure and billing events.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => refetch()} disabled={isFetching} className="flex items-center gap-2 px-4 py-2 bg-input border border-border text-foreground font-medium rounded-lg hover:bg-card-hover motion-safe:transition-colors disabled:opacity-50">
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </button>
          <button onClick={exportLogs} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 motion-safe:transition-colors">
            <Download className="w-4 h-4"/> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col min-h-96">
        <div className="p-4 border-b border-border bg-card-hover/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary"/>
            <input type="text" placeholder="Search by action, actor, or resource..." className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus:border-primary" value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-48 z-20 border-none bg-input rounded-lg">
              <SearchableDropdown options={severityOptions} value={severityFilter} onChange={(val) => setSeverityFilter(val as 'ALL' | 'INFO' | 'WARNING' | 'CRITICAL')} className="bg-transparent border-transparent"/>
            </div>
            <div className="w-48 z-20 border-none bg-input rounded-lg">
              <SearchableDropdown options={actorTypeOptions} value={actorTypeFilter} onChange={(val) => setActorTypeFilter(val as 'ALL' | 'SUPERADMIN' | 'SYSTEM' | 'TENANT')} className="bg-transparent border-transparent"/>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-header border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Action & Resource</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Actor / Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedLogs.map((log: AuditLog) => (<tr key={log.id} className="hover:bg-card-hover motion-safe:transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-secondary">{formatDateTime(log.timestamp)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSeverityBadge(log.severity)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-foreground">{log.action}</p>
                    <p className="text-xs font-mono text-primary mt-1">{log.resource}</p>
                    <p className="text-sm text-secondary mt-1">{log.details}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{log.actor}</p>
                      {log.actorType && (<span className="text-xs font-bold bg-input text-secondary px-1.5 py-0.5 rounded tracking-wider">
                          {log.actorType}
                        </span>)}
                    </div>
                    <p className="text-xs font-mono text-secondary mt-1 opacity-70">{log.ipAddress}</p>
                  </td>
                </tr>))}
              
              {filteredLogs.length === 0 && (<tr>
                  <td colSpan={TABLE_COLUMN_COUNT} className="px-6 py-12 text-center text-secondary">
                    <ShieldAlert size={32} className="mx-auto mb-3 opacity-20"/>
                    <p>No audit logs match your search.</p>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border">
          <SuperadminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
        </div>
      </div>
    </div>);
}
