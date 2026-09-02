'use client';
// RESPONSIBILITY: BackupsClient.tsx renders the Database Backups page. Purely a view layer — data fetched via useSuperadminData.

import { useBackupsData } from '@/app/superadmin/backups/backups_utils/useBackupsData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { DatabaseBackup, Search, Download, RotateCcw } from 'lucide-react';
import type { BackupRecord } from '@/app/superadmin/backups/backups_types/backups_types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';

const StatusColors: Record<BackupRecord['status'], string> = {
  SUCCESS: 'text-success bg-success/10',
  IN_PROGRESS: 'text-primary bg-primary/10',
  FAILED: 'text-destructive bg-destructive/10',
};

export default function BackupsClient() {
  const { data: DUMMY_BACKUPS, fetchState, error, setData } = useBackupsData();

    const [search, setSearch] = useState('');
    const [isTriggering, setIsTriggering] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const handleTriggerSnapshot = async () => {
      setIsTriggering(true);
      const loadingToast = toast.loading('Initiating global pg_dump snapshot...');
      try {
        await new Promise(res => setTimeout(res, 2000)); // Simulate API
        
        // Add a new mock backup to the top of the list
        if (setData && DUMMY_BACKUPS) {
          const newBackup: BackupRecord = {
            id: `bkp-global-${Date.now()}`,
            tenantName: 'System (Global)',
            databaseName: 'all_tenants_db',
            sizeMB: Math.random() * 500 + 100,
            status: 'SUCCESS',
            timestamp: new Date().toISOString()
          };
          setData([newBackup, ...DUMMY_BACKUPS]);
        }
        
        toast.success('Global snapshot completed successfully', { id: loadingToast });
      } catch (err) {
        toast.error('Failed to trigger snapshot', { id: loadingToast });
      } finally {
        setIsTriggering(false);
      }
    };

    const handleDownload = (id: string) => {
      toast.success(`Starting download for backup ${id}`);
      // Simulate real download behavior (TC-32)
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${id}_snapshot.sql.gz`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleRestore = (id: string) => {
      toast('Restoring snapshot requires confirmation modal (Simulated)', { icon: '⚠️' });
    };
if (fetchState === 'loading') return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
  if (error || !DUMMY_BACKUPS) return <div className="p-8 text-center text-destructive">Error loading data.</div>;



  const filtered = DUMMY_BACKUPS.filter(b => 
    b.tenantName.toLowerCase().includes(search.toLowerCase()) || 
    b.databaseName.toLowerCase().includes(search.toLowerCase()) ||
    b.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedBackups = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tenant Database Backups</h1>
          <p className="text-secondary mt-1">Manage automated pg_dump snapshots for all isolated gym databases.</p>
        </div>
        <button 
          onClick={handleTriggerSnapshot}
          disabled={isTriggering}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <DatabaseBackup size={18} /> {isTriggering ? 'Creating Snapshot...' : 'Trigger Global Snapshot'}
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by gym name or database..." 
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
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
              {paginatedBackups.map((backup) => (
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
                    <button 
                      onClick={() => handleDownload(backup.id)}
                      className="p-2 text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-30" 
                      title="Download pg_dump" 
                      disabled={backup.status !== 'SUCCESS'}
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      onClick={() => handleRestore(backup.id)}
                      className="p-2 text-secondary hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-30" 
                      title="Restore Snapshot" 
                      disabled={backup.status !== 'SUCCESS'}
                    >
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
        <SuperadminPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
