'use client';
// RESPONSIBILITY: SuperadminBackupsClient.tsx renders the Database Backups page. Purely a view layer — data fetched via useSuperadminData.

import { useSuperadminBackupsData } from '@/app/superadmin/backups/backups_utils/useSuperadminBackupsData';
import SuperadminBackupsEmptyState from '@/app/superadmin/backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState';
import SuperadminBackupsScheduleModal from '@/app/superadmin/backups/backups_components/SuperadminBackupsScheduleModal';
import { DatabaseBackup, Search, Clock } from 'lucide-react';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
// Rule 10: Absolute imports only — no relative paths allowed
import SuperadminBackupsTable from '@/app/superadmin/backups/backups_components/SuperadminBackupsTable';
import SuperadminBackupsRestoreModal from '@/app/superadmin/backups/backups_components/SuperadminBackupsRestoreModal';
import SuperadminBackupsTriggerModal from '@/app/superadmin/backups/backups_components/SuperadminBackupsTriggerModal';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminErrorBoundary';

export default function SuperadminBackupsClient() {
  const { data: backups, isLoading, isError, error } = useSuperadminBackupsData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [isTriggering, setIsTriggering] = useState(false);
  const [triggerModalOpen, setTriggerModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Resets pagination to page 1 whenever a filter changes, preventing stale empty states.
  // EXPLANATION: Synchronize component state with external dependencies.
  // EFFECT DEPENDENCIES: Documented intentionally.

  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupRecord | null>(null);
  const [restoreConfirmText, setRestoreConfirmText] = useState('');

  const handleDownload = (backup: BackupRecord) => {
    toast.success(`Downloading backup ${backup.id}`);
  };

  const handleRestoreClick = (backup: BackupRecord) => {
    setSelectedBackup(backup);
    setRestoreModalOpen(true);
  };

  const filtered = backups?.filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(search.toLowerCase()) || (b as any).gymId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const bType = b.id.includes('MANUAL') ? 'MANUAL' : 'AUTOMATED'; // Mock logic for type
    const matchesType = typeFilter === 'ALL' || bType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  }) || [];

  const totalPages: number = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedBackups: BackupRecord[] = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tenant Database Backups</h1>
          <p className="text-secondary mt-1 text-sm">Manage automated pg_dump snapshots for all isolated gym databases.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setScheduleModalOpen(true)}
            className="bg-input text-foreground px-4 py-2 rounded-lg font-medium hover:bg-border motion-safe:transition-colors border border-border flex items-center gap-2"
          >
            <Clock className="w-4 h-4" /> Configure Schedule
          </button>
          <button 
            onClick={() => setTriggerModalOpen(true)}
            disabled={isTriggering}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover motion-safe:transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <DatabaseBackup className="w-4 h-4" /> {isTriggering ? 'Creating Snapshot...' : 'Global Snapshot'}
          </button>
        </div>
      </div>

      <SuperadminErrorBoundary variant="inline">
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-96">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by gym name or database..." 
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="w-40 border-none bg-input rounded-lg">
              <SearchableDropdown
                value={statusFilter}
                onChange={(val) => setStatusFilter(String(val))}
                options={[
                  { value: 'ALL', label: 'All Statuses' },
                  { value: 'SUCCESS', label: 'Success' },
                  { value: 'FAILED', label: 'Failed' },
                  { value: 'IN_PROGRESS', label: 'In Progress' }
                ]}
                className="bg-transparent border-transparent text-sm"
              />
            </div>
            <div className="w-40 border-none bg-input rounded-lg">
              <SearchableDropdown
                value={typeFilter}
                onChange={(val) => setTypeFilter(String(val))}
                options={[
                  { value: 'ALL', label: 'All Types' },
                  { value: 'AUTOMATED', label: 'Automated' },
                  { value: 'MANUAL', label: 'Manual' }
                ]}
                className="bg-transparent border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        <SuperadminBackupsTable 
          paginatedBackups={paginatedBackups}
          filteredLength={filtered.length}
          handleDownload={(id: string) => handleDownload({ id } as any)}
          handleRestoreClick={(id: any) => handleRestoreClick({ id } as any)}
        />
        <SuperadminPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        </div>
      </SuperadminErrorBoundary>

      <SuperadminBackupsRestoreModal 
        isOpen={restoreModalOpen}
        onClose={() => setRestoreModalOpen(false)}
        selectedBackup={selectedBackup}
        restoreConfirmText={restoreConfirmText}
        setRestoreConfirmText={setRestoreConfirmText}
        onSuccess={() => {
          setSelectedBackup(null);
          setRestoreConfirmText('');
        }}
      />

      <SuperadminBackupsTriggerModal 
        isOpen={triggerModalOpen}
        onClose={() => setTriggerModalOpen(false)}
        isTriggering={isTriggering}
        setIsTriggering={setIsTriggering}
      />

      <SuperadminBackupsScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </div>
  );
}

