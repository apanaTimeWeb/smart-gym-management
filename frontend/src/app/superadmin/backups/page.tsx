'use client';

import { DUMMY_BACKUPS } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';
import { DatabaseBackup, Search, Download, RotateCcw } from 'lucide-react';
import { BackupRecord } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useState } from 'react';

const StatusColors: Record<BackupRecord['status'], string> = {
  SUCCESS: 'text-[var(--success)] bg-[var(--success)]/10',
  IN_PROGRESS: 'text-[var(--primary)] bg-[var(--primary)]/10',
  FAILED: 'text-[var(--danger)] bg-[var(--danger)]/10',
};

export default function BackupsPage() {
  const [search, setSearch] = useState('');

  const filtered = DUMMY_BACKUPS.filter(b => b.tenantName.toLowerCase().includes(search.toLowerCase()) || b.databaseName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Tenant Database Backups</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage automated pg_dump snapshots for all isolated gym databases.</p>
        </div>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2">
          <DatabaseBackup size={18} /> Trigger Global Snapshot
        </button>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search by gym name or database..." 
              className="w-full pl-9 pr-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[var(--bg-header)] border-b border-[var(--border)] text-sm">
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Backup ID</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Tenant</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Database Name</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Size (MB)</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Status</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Timestamp</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map((backup) => (
                <tr key={backup.id} className="hover:bg-[var(--bg-input)] transition-colors">
                  <td className="p-4 text-xs font-mono text-[var(--text-secondary)]">{backup.id}</td>
                  <td className="p-4 text-sm font-medium text-[var(--text-primary)]">{backup.tenantName}</td>
                  <td className="p-4 text-sm font-mono text-[var(--primary)]">{backup.databaseName}</td>
                  <td className="p-4 text-sm text-[var(--text-secondary)] font-mono">{backup.sizeMB.toFixed(1)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${StatusColors[backup.status]}`}>
                      {backup.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{new Date(backup.timestamp).toLocaleString()}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors" title="Download pg_dump" disabled={backup.status !== 'SUCCESS'}>
                      <Download size={16} />
                    </button>
                    <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-lg transition-colors" title="Restore Snapshot" disabled={backup.status !== 'SUCCESS'}>
                      <RotateCcw size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[var(--text-disabled)]">
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
