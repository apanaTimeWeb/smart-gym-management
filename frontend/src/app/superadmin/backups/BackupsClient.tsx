'use client';
// RESPONSIBILITY: BackupsClient.tsx renders the Database Backups page. Purely a view layer — data fetched via useSuperadminData.

import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { DatabaseBackup, Search, Download, RotateCcw } from 'lucide-react';
import { BackupRecord } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useState } from 'react';

const StatusColors: Record<BackupRecord['status'], string> = {
  SUCCESS: 'text-success bg-success/10',
  IN_PROGRESS: 'text-primary bg-primary/10',
  FAILED: 'text-destructive bg-destructive/10',
};

export default function BackupsClient() {
  const { data: DUMMY_BACKUPS, fetchState, error } = useSuperadminData<BackupRecord[]>(SuperadminUrlConfig.BACKEND_API.BACKUPS_BASE);

    const [search, setSearch] = useState('');
if (fetchState === 'loading') return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
  if (error || !DUMMY_BACKUPS) return <div className="p-8 text-center text-destructive">Error loading data.</div>;



  const filtered = DUMMY_BACKUPS.filter(b => b.tenantName.toLowerCase().includes(search.toLowerCase()) || b.databaseName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tenant Database Backups</h1>
          <p className="text-secondary mt-1">Manage automated pg_dump snapshots for all isolated gym databases.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
          <DatabaseBackup size={18} /> Trigger Global Snapshot
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by gym name or database..." 
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="bg-header border-b border-border text-sm">
                <th className="p-4 font-semibold text-secondary">Backup ID</th>
                <th className="p-4 font-semibold text-secondary">Tenant</th>
                <th className="p-4 font-semibold text-secondary">Database Name</th>
                <th className="p-4 font-semibold text-secondary">Size (MB)</th>
                <th className="p-4 font-semibold text-secondary">Status</th>
                <th className="p-4 font-semibold text-secondary">Timestamp</th>
                <th className="p-4 font-semibold text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((backup) => (
                <tr key={backup.id} className="hover:bg-input transition-colors">
                  <td className="p-4 text-xs font-mono text-secondary">{backup.id}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{backup.tenantName}</td>
                  <td className="p-4 text-sm font-mono text-primary">{backup.databaseName}</td>
                  <td className="p-4 text-sm text-secondary font-mono">{backup.sizeMB.toFixed(1)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${StatusColors[backup.status]}`}>
                      {backup.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-secondary">{new Date(backup.timestamp).toLocaleString()}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <button className="p-2 text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Download pg_dump" disabled={backup.status !== 'SUCCESS'}>
                      <Download size={16} />
                    </button>
                    <button className="p-2 text-secondary hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Restore Snapshot" disabled={backup.status !== 'SUCCESS'}>
                      <RotateCcw size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-disabled">
                    No backups found matching search.
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
