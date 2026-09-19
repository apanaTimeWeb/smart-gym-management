// RESPONSIBILITY: View-only renderer for System & Audit. Query/mutation orchestration, URL-backed filters, and export logic live in useSuperadminSystemClient.ts.
'use client';
import { Activity, Clock, Database, Download, Loader2, RefreshCcw, Search, ShieldAlert } from 'lucide-react';
import { formatDateTime } from '@/lib/formatters';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import SuperadminSystemEmptyState from '@/app/superadmin/system/system_components/SuperadminSystemEmptyState/SuperadminSystemEmptyState';
import SuperadminSystemSlaTab from '@/app/superadmin/system/system_components/SuperadminSystemSlaTab';
import { SuperadminSystemRuntimeConfig } from '@/app/superadmin/system/system_utils/SuperadminSystemRuntimeConfig';
import { useSuperadminSystemClient } from '@/app/superadmin/system/system_components/useSuperadminSystemClient';
export default function SuperadminSystemClient() {
    const model = useSuperadminSystemClient();
    if (model.isPending) {
        return (<div className="space-y-6" aria-busy="true"><div className="h-10 w-64 rounded-lg bg-skeleton-base motion-safe:animate-pulse"/><div className="grid grid-cols-1 gap-6 lg:grid-cols-3"><div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/><div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/><div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/></div><div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/></div>);
    }
    if (model.isError) {
        return <div className="flex h-96 flex-col items-center justify-center gap-3 rounded-xl border border-danger/30 bg-danger-bg text-center" role="alert"><p className="text-danger">Unable to load system data.</p><button type="button" onClick={model.refetch} className="rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors">Retry</button></div>;
    }
    return (<div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-primary">System &amp; Audit</h1>
        <p className="mt-1 text-secondary">Global database migration health and cross-gym uptime tracking.</p>
      </header>

      <div className="flex w-fit gap-1 rounded-xl border border-border bg-input p-1">
        <button onClick={() => model.setTab('migrations')} className={getTabClasses(model.tab === 'migrations')} type="button">
          <Database size={18} aria-hidden="true"/> Migrations &amp; Audit
        </button>
        <button onClick={() => model.setTab('sla')} className={getTabClasses(model.tab === 'sla')} type="button">
          <Clock size={18} aria-hidden="true"/> Uptime Tracker
        </button>
      </div>

      {model.tab === 'migrations' ? (<div className="space-y-8 motion-safe:animate-superadmin-fade-in-up">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Database size={18} className="text-primary" aria-hidden="true"/>
              <h2 className="text-xl font-bold text-primary">Migration Health</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {model.tenants.map((tenant) => {
                const outdated = tenant.databaseVersion !== SuperadminSystemRuntimeConfig.currentSchemaVersion;
                const migrating = model.migratingTenants[tenant.id] ?? false;
                return (<div key={tenant.id} className={`rounded-xl border p-6 ${outdated ? 'border-warning/30 bg-warning-bg' : 'border-border bg-card'}`}>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-primary">{tenant.name}</h3>
                        <p className="mt-1 truncate text-xs text-disabled">Database: gym_{tenant.id.replace('-', '_')}</p>
                      </div>
                      <span className={`rounded px-2 py-1 text-xs font-mono font-medium ${outdated ? 'bg-warning/20 text-warning' : 'bg-success-bg text-success'}`}>
                        {tenant.databaseVersion}
                      </span>
                    </div>
                    {outdated ? (<button type="button" onClick={() => model.handleRunMigration(tenant.id)} disabled={migrating} className="flex w-full items-center justify-center gap-2 rounded-lg bg-warning py-2 text-sm font-medium text-on-primary motion-safe:transition-colors disabled:opacity-50">
                        {migrating ? <Loader2 size={18} className="motion-safe:animate-spin"/> : <RefreshCcw size={18}/>}
                        {migrating ? 'Migrating...' : 'Run Migrations'}
                      </button>) : (<button type="button" disabled className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-border py-2 text-sm font-medium text-disabled">
                        <Activity className="h-4 w-4"/> Fully Synced
                      </button>)}
                  </div>);
            })}
            </div>
          </section>

          <section className="border-t border-border pt-8">
            <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-2">
                <ShieldAlert size={18} className="text-primary" aria-hidden="true"/>
                <h2 className="text-xl font-bold text-primary">Global Audit Log</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-disabled" aria-hidden="true"/>
                  <input aria-label="Search audit logs" type="text" placeholder="Search logs..." value={model.logSearch} onChange={(event) => model.setLogSearch(event.target.value)} className="rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm text-primary focus:border-primary focus:outline-none"/>
                </div>
                <button type="button" onClick={model.handleExportCSV} className="flex items-center gap-2 rounded-lg border border-border bg-input p-2 text-sm font-medium text-primary motion-safe:transition-colors hover:bg-surface-hover">
                  <Download size={18} aria-hidden="true"/> Export CSV
                </button>
              </div>
            </div>

            <div className="flex min-h-96 flex-col overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex-1 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border bg-card text-sm text-secondary">
                      <th className="p-4 font-medium">Timestamp</th>
                      <th className="p-4 font-medium">Target</th>
                      <th className="p-4 font-medium">Actor</th>
                      <th className="p-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {model.logs.map((log) => (<tr key={log.id} className="text-sm motion-safe:transition-colors hover:bg-input">
                        <td className="whitespace-nowrap p-4 text-secondary">{formatDateTime(log.timestamp)}</td>
                        <td className="p-4 font-medium text-primary">{log.targetResource}</td>
                        <td className="p-4"><p className="text-primary">{log.actorName}</p><span className="mt-1 inline-block rounded bg-border px-2 py-0.5 text-xs text-disabled">{log.actorRole}</span></td>
                        <td className="p-4"><span className="inline-flex rounded-full bg-info-bg px-2.5 py-1 text-xs font-semibold font-mono text-info">{log.action}</span></td>
                      </tr>))}
                    {model.logs.length === 0 ? <SuperadminSystemEmptyState /> : null}
                  </tbody>
                </table>
              </div>
              <SuperadminPagination currentPage={model.currentPage} totalPages={model.totalPages} onPageChange={model.setCurrentPage}/>
            </div>
          </section>
        </div>) : <SuperadminSystemSlaTab />}
    </div>);
}
function getTabClasses(active: boolean): string {
    return `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'}`;
}
