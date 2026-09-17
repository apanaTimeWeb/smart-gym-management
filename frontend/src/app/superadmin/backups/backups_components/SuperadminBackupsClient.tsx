'use client';
// RESPONSIBILITY: SuperadminBackupsClient.tsx renders the Database Backups page. Purely a view layer — data fetched via useSuperadminData.

import { backupsApi } from '@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api';
import { useSuperadminBackupsData } from '@/app/superadmin/backups/backups_utils/useSuperadminBackupsData';
import SuperadminBackupsScheduleModal from '@/app/superadmin/backups/backups_components/SuperadminBackupsScheduleModal';
import { DatabaseBackup, Search, Clock } from 'lucide-react';
import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';
import { useState } from 'react';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
// Rule 10: Absolute imports only — no relative paths allowed
import SuperadminBackupsTable from '@/app/superadmin/backups/backups_components/SuperadminBackupsTable';
import SuperadminBackupsRestoreModal from '@/app/superadmin/backups/backups_components/SuperadminBackupsRestoreModal';
import SuperadminBackupsTriggerModal from '@/app/superadmin/backups/backups_components/SuperadminBackupsTriggerModal';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_components/SuperadminLayout/SuperadminErrorBoundary';
import { useSuperadminDebouncedValue } from '@/app/superadmin/superadmin_utils/useSuperadminDebouncedValue';

export default function SuperadminBackupsClient() {
  const { getParam, setParam } = useSuperadminUrlState();

  const search = getParam('search', '');
  const debouncedSearch = useSuperadminDebouncedValue(search);
  const statusFilter = getParam('statusFilter', 'ALL');
  const typeFilter = getParam('typeFilter', 'ALL');
  const currentPage = Number(getParam('page', '1'));
  const ITEMS_PER_PAGE = 10;

  const setSearch = (val: string) => { setParam('search', val); setParam('page', '1'); };
  const setStatusFilter = (val: string) => { setParam('statusFilter', val); setParam('page', '1'); };
  const setTypeFilter = (val: string) => { setParam('typeFilter', val); setParam('page', '1'); };
  const setCurrentPage = (val: number) => setParam('page', String(val));

  const queryParams: Record<string, string> = {
    page: String(currentPage),
    limit: String(ITEMS_PER_PAGE),
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(statusFilter !== 'ALL' && { status: statusFilter }),
    ...(typeFilter !== 'ALL' && { type: typeFilter }),
  };

  const { data: backups, total, totalPages } = useSuperadminBackupsData(queryParams);

  const [isTriggering, setIsTriggering] = useState(false);
  const [triggerModalOpen, setTriggerModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupRecord | null>(null);
  const [restoreConfirmText, setRestoreConfirmText] = useState('');

  const handleRestoreClick = (backup: BackupRecord) => {
    setSelectedBackup(backup);
    setRestoreModalOpen(true);
  };

  const filtered: BackupRecord[] = backups || [];
  const paginatedBackups: BackupRecord[] = filtered;

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
          handleDownload={(id: string) => { window.location.href = backupsApi.fetchBackupDownloadUrl(id); }}
          handleRestoreClick={handleRestoreClick}
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

