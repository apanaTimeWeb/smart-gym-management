// RESPONSIBILITY: SuperadminBackupsClient.tsx renders the Database Backups page. Purely a view layer — backup data is fetched via useSuperadminBackupsData and rendered from query state.
'use client';
import { useSuperadminBackupsData } from '@/app/superadmin/system-ops/backups/backups_utils/useSuperadminBackupsData';
import SuperadminBackupsScheduleModal from '@/app/superadmin/system-ops/backups/backups_components/SuperadminBackupsScheduleModal';
import { DatabaseBackup, Search, Clock } from 'lucide-react';
import type { BackupRecord } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsTypes';
import { useState } from 'react';
import { useSuperadminBackupsActions } from '@/app/superadmin/system-ops/backups/backups_utils/useSuperadminBackupsActions';
import Pagination from '@/components/ui/Pagination';
import { useUrlState } from '@/hooks/useUrlState';
// Rule 10: Absolute imports only — no relative paths allowed
import SuperadminBackupsTable from '@/app/superadmin/system-ops/backups/backups_components/SuperadminBackupsTable';
import SuperadminBackupsRestoreModal from '@/app/superadmin/system-ops/backups/backups_components/SuperadminBackupsRestoreModal';
import SuperadminBackupsTriggerModal from '@/app/superadmin/system-ops/backups/backups_components/SuperadminBackupsTriggerModal';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminErrorBoundary';
export default function SuperadminBackupsClient() {
    const { getParam, setParam } = useUrlState();
    const search = getParam('search', '');
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
        ...(search && { search }),
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
        ...(typeFilter !== 'ALL' && { type: typeFilter }),
    };
    const { data: backups, total, totalPages } = useSuperadminBackupsData(queryParams);
    const { downloadBackup, isTriggering } = useSuperadminBackupsActions();
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
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Tenant Database Backups</h1>
          <p className="text-secondary mt-1 text-sm">Manage automated pg_dump snapshots for all isolated gym databases.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setScheduleModalOpen(true)} className="bg-input text-primary px-4 py-2 rounded-lg font-medium hover:bg-border motion-safe:transition-colors border border-border flex items-center gap-2">
            <Clock className="w-4 h-4"/> Configure Schedule
          </button>
          <button onClick={() => setTriggerModalOpen(true)} disabled={isTriggering} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-hover motion-safe:transition-colors flex items-center gap-2 disabled:opacity-50">
            <DatabaseBackup className="w-4 h-4"/> {isTriggering ? 'Creating Snapshot...' : 'Global Snapshot'}
          </button>
        </div>
      </div>

      <SuperadminErrorBoundary variant="inline">
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden flex flex-col min-h-96">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary"/>
            <input type="text" placeholder="Search by gym name or database..." className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary" value={search} onChange={(e) => {
            setSearch(e.target.value);
        }}/>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="w-40 border-none bg-input rounded-lg">
              <SearchableDropdown value={statusFilter} onChange={(val) => setStatusFilter(String(val))} options={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'SUCCESS', label: 'Success' },
            { value: 'FAILED', label: 'Failed' },
            { value: 'IN_PROGRESS', label: 'In Progress' }
        ]} className="bg-transparent border-transparent text-sm"/>
            </div>
            <div className="w-40 border-none bg-input rounded-lg">
              <SearchableDropdown value={typeFilter} onChange={(val) => setTypeFilter(String(val))} options={[
            { value: 'ALL', label: 'All Types' },
            { value: 'AUTOMATED', label: 'Automated' },
            { value: 'MANUAL', label: 'Manual' }
        ]} className="bg-transparent border-transparent text-sm"/>
            </div>
          </div>
        </div>

        <SuperadminBackupsTable paginatedBackups={paginatedBackups} filteredLength={filtered.length} handleDownload={(id: string) => { void downloadBackup(id); }} handleRestoreClick={handleRestoreClick}/>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
        </div>
      </SuperadminErrorBoundary>

      <SuperadminBackupsRestoreModal isOpen={restoreModalOpen} onClose={() => { setRestoreModalOpen(false); setSelectedBackup(null); }} selectedBackup={selectedBackup} restoreConfirmText={restoreConfirmText} setRestoreConfirmText={setRestoreConfirmText}/>

      <SuperadminBackupsTriggerModal isOpen={triggerModalOpen} onClose={() => setTriggerModalOpen(false)}/>

      <SuperadminBackupsScheduleModal isOpen={scheduleModalOpen} onClose={() => setScheduleModalOpen(false)}/>
    </div>);
}
