// RESPONSIBILITY: Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook.
'use client';
import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Database, Loader2, RefreshCw, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import type { MigrationLog } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types';
import SuperadminMigrationsEmptyState from '@/app/superadmin/migrations/migrations_components/SuperadminMigrationsEmptyState';
import { useSuperadminMigrationsPage } from '@/app/superadmin/migrations/migrations_utils/useSuperadminMigrationsPage';
const TABLE_COLUMN_COUNT = 5;
const STATUS_STYLES: Record<MigrationLog['status'], string> = {
    COMPLETED: 'bg-success/10 text-success',
    FAILED: 'bg-danger-bg text-danger',
    PENDING: 'bg-warning/10 text-warning',
    IN_PROGRESS: 'bg-primary/10 text-primary',
    ROLLED_BACK: 'bg-secondary/10 text-secondary',
    SUCCESS: 'bg-success/10 text-success',
    ROLLBACK: 'bg-secondary/10 text-secondary',
};
function SuperadminMigrationStatusBadge({ status }: {
    status: MigrationLog['status'];
}) {
    const icon = status === 'COMPLETED' || status === 'SUCCESS'
        ? <CheckCircle className="w-3.5 h-3.5" aria-hidden="true"/>
        : status === 'FAILED'
            ? <XCircle className="w-3.5 h-3.5" aria-hidden="true"/>
            : status === 'IN_PROGRESS'
                ? <RefreshCw className="w-3.5 h-3.5 motion-safe:animate-spin" aria-hidden="true"/>
                : <Clock className="w-3.5 h-3.5" aria-hidden="true"/>;
    return (<span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      {icon}
      {status.replaceAll('_', ' ')}
    </span>);
}
export default function SuperadminMigrationsClient() {
    const [versionInput, setVersionInput] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const { migrations, isPending, isError, isDeploying, requestDeployment, refetch } = useSuperadminMigrationsPage();
    const handleRollout = async () => {
        const normalizedVersion = versionInput.trim();
        if (!normalizedVersion) {
            setValidationMessage('Enter a target schema version.');
            return;
        }
        setValidationMessage('');
        const completed = await requestDeployment(normalizedVersion);
        if (completed)
            setVersionInput('');
    };
    if (isPending) {
        return (<div className="p-6 space-y-4" aria-busy="true" aria-label="Loading schema rollouts">
        {[0, 1, 2].map((row) => (<div key={row} className="h-24 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>))}
      </div>);
    }
    if (isError) {
        return (<div className="p-6">
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-danger" aria-hidden="true"/>
          <p className="font-semibold text-foreground">Schema rollout history could not be loaded.</p>
          <button type="button" onClick={() => void refetch()} className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Retry
          </button>
        </div>
      </div>);
    }
    return (<div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Schema Rollouts</h1>
          <p className="text-secondary mt-1">Manage and track database schema migrations across all gym instances.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <div>
            <label htmlFor="superadmin-migration-version" className="sr-only">Target schema version</label>
            <input id="superadmin-migration-version" type="text" value={versionInput} onChange={(event) => setVersionInput(event.target.value)} placeholder="e.g. v1.6.0" aria-invalid={Boolean(validationMessage)} aria-describedby={validationMessage ? 'superadmin-migration-version-error' : undefined} className="w-40 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"/>
            {validationMessage && <p id="superadmin-migration-version-error" className="mt-1 text-xs text-danger" role="alert">{validationMessage}</p>}
          </div>
          <button type="button" onClick={handleRollout} disabled={isDeploying} className="min-w-40 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {isDeploying ? <Loader2 className="w-5 h-5 motion-safe:animate-spin" aria-hidden="true"/> : <Database size={18} aria-hidden="true"/>}
            {isDeploying ? 'Deploying…' : 'Deploy New Schema'}
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-card-hover border-b border-border">
                {['Version', 'Description', 'Target', 'Status', 'Applied Date'].map((heading) => (<th key={heading} scope="col" className="px-6 py-4 text-sm font-semibold text-secondary">{heading}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {migrations.map((migration) => (<tr key={migration.id} className="hover:bg-card-hover motion-safe:transition-colors">
                  <td className="px-6 py-4"><span className="font-mono font-bold text-foreground">{migration.version}</span></td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{migration.description}</p>
                    {migration.errorLog && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" aria-hidden="true"/>{migration.errorLog}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">{migration.targetTenants ?? '—'}</td>
                  <td className="px-6 py-4"><SuperadminMigrationStatusBadge status={migration.status}/></td>
                  <td className="px-6 py-4 text-sm text-secondary">{formatDate(migration.appliedAt)}</td>
                </tr>))}
              {migrations.length === 0 && (<tr>
                  <td colSpan={TABLE_COLUMN_COUNT} className="px-6 py-3"><SuperadminMigrationsEmptyState /></td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
