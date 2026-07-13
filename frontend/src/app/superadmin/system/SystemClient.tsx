// RESPONSIBILITY: Renders the System & Audit page showing migration health and global audit logs. Fetches data directly.
'use client';

import { useState, useEffect } from 'react';
import { Database, ShieldAlert, Activity, Filter, RefreshCcw, Search, Loader2 } from 'lucide-react';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import toast from 'react-hot-toast';
import type { Tenant, GlobalAuditLog, FetchState } from '@/app/superadmin/superadmin_types/superadmin_types';

const CURRENT_SCHEMA_VERSION = 'v2.4.1';

interface TenantWithVersion extends Tenant {
  databaseVersion: string;
}

export default function SystemClient() {
  const [logSearch, setLogSearch] = useState('');
  const [tenants, setTenants] = useState<TenantWithVersion[]>([]);
  const [auditLogs, setAuditLogs] = useState<GlobalAuditLog[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');

  useEffect(() => {
    // Refetch on mount to load migration health and global audit logs
    async function fetchData() {
      setFetchState('loading');
      try {
        const [migrationsRes, auditRes] = await Promise.all([
          superadminApi.migrations.getAll(),
          superadminApi.auditLogs.getGlobalLogs()
        ]);

        setTenants(migrationsRes.data?.tenants ?? []);
        const logs = auditRes.data?.globalLogs ?? auditRes.data ?? [];
        setAuditLogs(Array.isArray(logs) ? logs : []);
        setFetchState('success');
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : String(error));
        setFetchState('error');
      }
    }
    fetchData();
  }, []);

  const filteredLogs = auditLogs.filter(log =>
    log.targetResource?.toLowerCase().includes(logSearch.toLowerCase()) ||
    log.action?.toLowerCase().includes(logSearch.toLowerCase()) ||
    log.actorName?.toLowerCase().includes(logSearch.toLowerCase())
  );

  if (fetchState === 'loading' || fetchState === 'idle') {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System & Audit</h1>
        <p className="text-secondary mt-1">Global database migration health and cross-tenant audit logs.</p>
      </div>

      {/* Database Migration Health */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Migration Health</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map(tenant => {
            const isOutdated = tenant.databaseVersion !== CURRENT_SCHEMA_VERSION;
            return (
              <div key={tenant.id} className={`border rounded-xl p-6 ${isOutdated ? 'bg-warning-bg border-warning/30' : 'bg-card border-border'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{tenant.name}</h3>
                    <p className="text-xs text-disabled mt-1">DB: gym_{tenant.id.replace('-', '_')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${isOutdated ? 'bg-warning/20 text-warning' : 'bg-success-bg text-success'}`}>
                    {tenant.databaseVersion}
                  </span>
                </div>

                {isOutdated ? (
                  <button className="w-full flex justify-center items-center gap-2 bg-warning hover:bg-warning text-black py-2 rounded-lg text-sm font-medium transition-colors">
                    <RefreshCcw className="w-4 h-4" /> Run Migrations
                  </button>
                ) : (
                  <button disabled className="w-full flex justify-center items-center gap-2 bg-border text-disabled py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                    <Activity className="w-4 h-4" /> Fully Synced
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Master Audit Log */}
      <div className="pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Global Audit Log</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-disabled" />
              <input
                type="text"
                placeholder="Search logs..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="bg-card border border-border text-foreground text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-border-focus"
              />
            </div>
            <button className="p-2 bg-card border border-border rounded-lg text-secondary hover:text-foreground transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-card border-b border-border text-secondary text-sm">
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Target</th>
                <th className="p-4 font-medium">Actor</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-input transition-colors text-sm">
                  <td className="p-4 text-secondary whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-4 text-primary font-medium">
                    {log.targetResource}
                  </td>
                  <td className="p-4">
                    <p className="text-foreground">{log.actorName}</p>
                    <span className="text-xs text-disabled bg-border px-2 py-0.5 rounded mt-1 inline-block">{log.actorRole}</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-info-bg text-info font-mono">
                      {log.action}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-disabled">
                    No logs found.
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
