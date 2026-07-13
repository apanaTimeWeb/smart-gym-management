import React from 'react';
import { ShieldAlert, Search } from 'lucide-react';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { GlobalAuditLog } from '@/app/superadmin/superadmin_types/superadmin_types';
import { DUMMY_GLOBAL_AUDIT_LOGS as FALLBACK_LOGS } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';

export default function GlobalAuditLogsPage() {
  const { data, loading, error } = useSuperadminData<GlobalAuditLog[] | { logs: GlobalAuditLog[] }>(SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE);

  if (loading) return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  const logs = Array.isArray(data) ? data : (data?.logs || FALLBACK_LOGS);

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
              className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors w-64"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Actor</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Target Resource</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{log.actorName}</span>
                      <span className="text-xs text-secondary">{log.actorRole}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-info-bg text-info">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {log.targetResource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-secondary">
                    <ShieldAlert className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No audit logs found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
