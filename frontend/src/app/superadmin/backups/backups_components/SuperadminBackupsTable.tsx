'use client';
// RESPONSIBILITY: Renders the Backups Table component and its associated UI logic.
import { Download, RotateCcw } from 'lucide-react';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
import { StatusColors } from '@/app/superadmin/backups/backups_utils/SuperadminBackupsConstants';
import SuperadminBackupsEmptyState from '@/app/superadmin/backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState';
import { formatNumber, formatDateTime } from '@/lib/formatters';

interface SuperadminBackupsTableProps {
  paginatedBackups: BackupRecord[];
  filteredLength: number;
  handleDownload: (id: string) => void;
  handleRestoreClick: (backup: BackupRecord) => void;
}

const TABLE_COLUMN_COUNT = 7;

export default function SuperadminBackupsTable({ paginatedBackups, filteredLength, handleDownload, handleRestoreClick }: SuperadminBackupsTableProps) {
  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full text-left border-collapse min-w-full">
        <thead>
          <tr className="bg-header border-b border-border text-sm">
            <th className="p-4 font-semibold text-secondary">Backup ID</th>
            <th className="p-4 font-semibold text-secondary">Gym</th>
            <th className="p-4 font-semibold text-secondary">Database Name</th>
            <th className="p-4 font-semibold text-secondary">Size (MB)</th>
            <th className="p-4 font-semibold text-secondary">Status</th>
            <th className="p-4 font-semibold text-secondary">Timestamp</th>
            <th className="p-4 font-semibold text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {paginatedBackups.map((backup: BackupRecord) => (
            <tr key={backup.id} className="hover:bg-input motion-safe:transition-colors cursor-pointer" tabIndex={0}>
              <td className="p-4 text-xs font-mono text-secondary">{backup.id}</td>
              <td className="p-4 text-sm font-medium text-foreground">{backup.tenantName}</td>
              <td className="p-4 text-sm font-mono text-primary">{backup.databaseName}</td>
              <td className="p-4 text-sm text-secondary font-mono">{formatNumber(Math.round(backup.sizeMB * 10) / 10)}</td>
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${StatusColors[backup.status]}`}>
                  {backup.status.replace('_', ' ')}
                </span>
              </td>
              <td className="p-4 text-sm text-secondary">{formatDateTime(backup.timestamp)}</td>
              <td className="p-4 text-right flex items-center justify-end gap-2">
                <button 
                  onClick={() => handleDownload(backup.id)}
                  className="p-2 text-secondary hover:text-primary hover:bg-primary/10 rounded-lg motion-safe:transition-colors disabled:opacity-30" 
                  title="Download pg_dump" 
                  disabled={backup.status !== 'SUCCESS'}
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleRestoreClick(backup)}
                  className="p-2 text-secondary hover:text-danger hover:bg-danger-bg/10 rounded-lg motion-safe:transition-colors disabled:opacity-30" 
                  title="Restore Snapshot" 
                  disabled={backup.status !== 'SUCCESS'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {filteredLength === 0 && (
            <tr>
              <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-disabled">
                <SuperadminBackupsEmptyState />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

