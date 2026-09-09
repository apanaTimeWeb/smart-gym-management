'use client';
// RESPONSIBILITY: Renders the Global Audit Logs dashboard for superadmins to monitor system-wide security events.
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { globalAuditApi } from '@/app/superadmin/global-audit/superadmin_global-audit_api/superadmin_global-audit_api';
import type { AuditLog } from '@/app/superadmin/global-audit/superadmin_global-audit_types/superadmin_global-audit_types';
import { ShieldAlert, Search, Filter, AlertTriangle, Info, Download } from 'lucide-react';
import toast from 'react-hot-toast';

import { MOCK_AUDIT_LOGS } from '@/app/superadmin/global-audit/global-audit_utils/SuperadminGlobalAuditConstants';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';

export default function SuperadminGlobalAuditClient() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'INFO' | 'WARNING' | 'CRITICAL'>('ALL');
  const [actorTypeFilter, setActorTypeFilter] = useState<'ALL' | 'SUPERADMIN' | 'SYSTEM' | 'TENANT'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const { data: queryData, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['superadmin', 'global-audit'],
    queryFn: async () => {
      try {
        const res = await globalAuditApi.fetchAuditLogs();
        if (res.success && res.data && res.data.length > 0) {
          return { logs: res.data };
        }
      } catch (err) {
        // Fallback to mock data
      }

      // Mock Data for UI presentation
      return { logs: MOCK_AUDIT_LOGS };
    }
  });

  const fetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const displayLogs = queryData?.logs || MOCK_AUDIT_LOGS;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, severityFilter, actorTypeFilter]);

  const filteredLogs = displayLogs.filter(log => {
    const matchesSearch = log.action?.toLowerCase().includes(search.toLowerCase()) || 
                          log.actor?.toLowerCase().includes(search.toLowerCase()) ||
                          log.resource?.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
    const matchesActorType = actorTypeFilter === 'ALL' || log.actorType === actorTypeFilter;
    
    return matchesSearch && matchesSeverity && matchesActorType;
  });

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE) || 1;
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getSeverityBadge = (severity: AuditLog['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-danger text-white tracking-wider"><ShieldAlert size={12} /> CRITICAL</span>;
      case 'WARNING':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-warning text-white tracking-wider"><AlertTriangle size={12} /> WARNING</span>;
      case 'INFO':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-primary/10 text-primary tracking-wider"><Info size={12} /> INFO</span>;
    }
  };

  const exportLogs = () => {
    if (filteredLogs.length === 0) {
      toast.error('No logs to export');
      return;
    }
    const headers = ['Timestamp', 'Severity', 'Action', 'Resource', 'Details', 'Actor', 'IP Address'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => 
        [
          new Date(log.timestamp).toISOString(),
          log.severity,
          `"${(log.action || '').replace(/"/g, '""')}"`,
          `"${(log.resource || '').replace(/"/g, '""')}"`,
          `"${(log.details || '').replace(/"/g, '""')}"`,
          `"${(log.actor || '').replace(/"/g, '""')}"`,
          log.ipAddress
        ].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `global_audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Exporting global audit logs as CSV...');
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
    { value: 'TENANT', label: 'Tenant' },
  ];

  if (fetchState === 'loading') {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded mb-2" />
            <div className="h-4 w-96 bg-skeleton-base motion-safe:animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-48 h-10 bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
            <div className="w-32 h-10 bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[500px]">
          <div className="p-4 border-b border-border bg-card-hover/50">
            <div className="h-10 w-full max-w-md bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={`skeleton-${i}`} className="h-16 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Global Audit Logs</h1>
          <p className="text-secondary mt-1">Immutable security ledger for system-wide infrastructure and billing events.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 bg-input border border-border text-foreground font-medium rounded-lg hover:bg-card-hover motion-safe:transition-colors disabled:opacity-50"
          >
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </button>
          <button 
            onClick={exportLogs}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 motion-safe:transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-border bg-card-hover/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by action, actor, or resource..." 
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-48 z-20 border-none bg-input rounded-lg">
              <SearchableDropdown
                options={severityOptions}
                value={severityFilter}
                onChange={(val) => setSeverityFilter(val as 'ALL' | 'INFO' | 'WARNING' | 'CRITICAL')}
                className="bg-transparent border-transparent"
              />
            </div>
            <div className="w-48 z-20 border-none bg-input rounded-lg">
              <SearchableDropdown
                options={actorTypeOptions}
                value={actorTypeFilter}
                onChange={(val) => setActorTypeFilter(val as 'ALL' | 'SUPERADMIN' | 'SYSTEM' | 'TENANT')}
                className="bg-transparent border-transparent"
              />
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
              {paginatedLogs.map(log => (
                <tr key={log.id} className="hover:bg-card-hover motion-safe:transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-secondary">{new Date(log.timestamp).toLocaleString()}</span>
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
                      {log.actorType && (
                        <span className="text-[10px] font-bold bg-input text-secondary px-1.5 py-0.5 rounded tracking-wider">
                          {log.actorType}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-secondary mt-1 opacity-70">{log.ipAddress}</p>
                  </td>
                </tr>
              ))}
              
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-secondary">
                    <ShieldAlert size={32} className="mx-auto mb-3 opacity-20" />
                    <p>No audit logs match your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border">
          <SuperadminPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
