// RESPONSIBILITY: Renders the toolbar for searching and filtering members.
'use client';
import { Search, RefreshCw } from 'lucide-react';
import { useTrainerMembersToolbar } from '@/app/trainer/members/members_components/TrainerMembersToolbar/useTrainerMembersToolbar';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';
import { MEMBER_STATUS_OPTIONS, TRAINER_MEMBER_PROGRESS_OPTIONS } from '@/app/trainer/members/members_utils/TrainerMembersSharedConstants';

export default function TrainerMembersToolbar() {
  const {
    localSearch,
    setLocalSearch,
    statusFilter,
    setStatusFilter,
    progressStatusFilter,
    setProgressStatusFilter,
    handleRefresh
  } = useTrainerMembersToolbar();

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-wrap gap-3 items-center justify-between">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input 
          value={localSearch} 
          onChange={e => setLocalSearch(e.target.value)} 
          placeholder="Search by name or phone..." 
          className="pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:   w-full sm:w-64  bg-input text-primary" 
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <TrainerSearchableDropdown
          value={statusFilter}
          onChange={(val: string | number) => setStatusFilter(String(val))}
          className="w-48"
          options={MEMBER_STATUS_OPTIONS}
        />
        <TrainerSearchableDropdown
          value={progressStatusFilter}
          onChange={(val: string | number) => setProgressStatusFilter(String(val))}
          className="w-48"
          options={TRAINER_MEMBER_PROGRESS_OPTIONS}
        />
        <button type="button" 
          onClick={handleRefresh} 
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl motion-safe:hover:brightness-110 text-primary"
        >
          <RefreshCw size={18} /> Refresh
        </button>
      </div>
    </div>
  );
}
