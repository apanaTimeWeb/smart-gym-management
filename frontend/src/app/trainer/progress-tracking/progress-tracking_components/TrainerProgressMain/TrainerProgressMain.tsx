// RESPONSIBILITY: Root client component for Trainer Progress Tracking.
'use client';
// DATA FLOW: page.tsx (Server) → TrainerProgressMain (Client) → chart, table, modal, comparison

import { Plus, BarChart2, User } from 'lucide-react';
import { useMemo } from 'react';
import { useTrainerProgressStore } from '@/app/trainer/progress-tracking/progress-tracking_store/useTrainerProgressStore';
import { getTrainerUserSafeErrorMessage } from '@/app/trainer/trainer_utils/TrainerUserSafeError';
import { useTrainerProgressFilters } from '@/app/trainer/progress-tracking/progress-tracking_utils/useTrainerProgressFilters';
import { useTrainerProgressMembersQuery, useTrainerProgressEntriesQuery } from '@/app/trainer/progress-tracking/progress-tracking_queries/useTrainerProgressQuery';
import { useTrainerProgressMutations } from '@/app/trainer/progress-tracking/progress-tracking_queries/useTrainerProgressMutations';
import { buildComparisonSnapshot } from '@/app/trainer/progress-tracking/progress-tracking_utils/useTrainerProgressComparison';
import { useTrainerProgressComparisonQueries } from '@/app/trainer/progress-tracking/progress-tracking_queries/useTrainerProgressComparisonQuery';
import type { ProgressEntry, CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import TrainerProgressChart from '@/app/trainer/progress-tracking/progress-tracking_components/TrainerProgressChart/TrainerProgressChart';
import TrainerProgressTable from '@/app/trainer/progress-tracking/progress-tracking_components/TrainerProgressTable/TrainerProgressTable';
import TrainerProgressModal from '@/app/trainer/progress-tracking/progress-tracking_components/TrainerProgressModal/TrainerProgressModal';
import TrainerProgressEmptyState from '@/app/trainer/progress-tracking/progress-tracking_components/TrainerProgressEmptyState/TrainerProgressEmptyState';
import TrainerProgressMemberSelector from '@/app/trainer/progress-tracking/progress-tracking_components/TrainerProgressMemberSelector/TrainerProgressMemberSelector';
import TrainerProgressComparisonChart from '@/app/trainer/progress-tracking/progress-tracking_components/TrainerProgressComparisonChart/TrainerProgressComparisonChart';
import TrainerProgressComparisonTable from '@/app/trainer/progress-tracking/progress-tracking_components/TrainerProgressComparisonTable/TrainerProgressComparisonTable';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';

export default function TrainerProgressMain() {
  const { selectedMemberId, setSelectedMemberId, activeTab, setActiveTab, currentPage, setCurrentPage, sortBy, sortDirection, setSort } = useTrainerProgressFilters();
  const { data: allComparisonMembers = [] } = useTrainerProgressMembersQuery();
  const progressQuery = useTrainerProgressEntriesQuery({ memberId: selectedMemberId, page: currentPage, limit: 10, sortBy, sortDirection });
  const chartQuery = useTrainerProgressEntriesQuery({ memberId: selectedMemberId, page: 1, limit: 1000, sortBy: 'date', sortDirection: 'asc' });
  const memberEntries = progressQuery.data?.entries ?? [];
  const chartEntries = chartQuery.data?.entries ?? [];
  const totalEntries = progressQuery.data?.total ?? 0;
  const { deleteEntry, createEntry, updateEntry } = useTrainerProgressMutations();
  const { showSuccess, showError } = useTrainerFeedback();
  const deleteKey = useTrainerIdempotencyKey();
  const getSafeError = getTrainerUserSafeErrorMessage;

  const activeMetric = useTrainerProgressStore(s => s.activeMetric);
  const setActiveMetric = useTrainerProgressStore(s => s.setActiveMetric);
  const showModal = useTrainerProgressStore(s => s.showModal);
  const setShowModal = useTrainerProgressStore(s => s.setShowModal);
  const editingEntry = useTrainerProgressStore(s => s.editingEntry);
  const setEditingEntry = useTrainerProgressStore(s => s.setEditingEntry);
  const activeComparisonMetric = useTrainerProgressStore(s => s.activeComparisonMetric);
  const setActiveComparisonMetric = useTrainerProgressStore(s => s.setActiveComparisonMetric);
  const selectedComparisonIds = useTrainerProgressStore(s => s.selectedComparisonIds);
  const toggleComparisonMember = useTrainerProgressStore(s => s.toggleComparisonMember);

  const openAddModal = () => { setEditingEntry(null); setShowModal(true); };
  const openEditModal = (entry: ProgressEntry) => { setEditingEntry(entry); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditingEntry(null); };

  const handleDelete = async (entryId: string) => {
    const actionId = `delete-${entryId}`;
    const key = deleteKey.begin(actionId);
    try {
      const response = await deleteEntry.mutateAsync({ memberId: selectedMemberId, entryId, idempotencyKey: key });
      showSuccess(response.message, `progress-delete-${entryId}`);
      deleteKey.clear(actionId);
    } catch (error) {
      showError(getSafeError(error), `progress-delete-${entryId}`);
    }
  };

  const handleSave = async (data: CreateProgressEntryDto): Promise<boolean> => {
    const actionId = editingEntry ? `update-${editingEntry.id}` : `create-${selectedMemberId}`;
    const key = deleteKey.begin(actionId);
    try {
      if (editingEntry) {
        const response = await updateEntry.mutateAsync({ memberId: selectedMemberId, entryId: editingEntry.id, dto: data, idempotencyKey: key });
        showSuccess(response.message, `progress-update-${editingEntry.id}`);
      } else {
        const response = await createEntry.mutateAsync({ memberId: selectedMemberId, dto: data, idempotencyKey: key });
        showSuccess(response.message, `progress-create-${selectedMemberId}`);
      }
      deleteKey.clear(actionId);
      closeModal();
      return true;
    } catch (error) {
      showError(getSafeError(error), editingEntry ? `progress-update-${editingEntry.id}` : `progress-create-${selectedMemberId}`);
      return false;
    }
  };

  const comparisonQueries = useTrainerProgressComparisonQueries(selectedComparisonIds);

  const comparisonSnapshots = useMemo(() => {
    return selectedComparisonIds.map((id, index) => {
      const name = allComparisonMembers.find(m => m.id === id)?.name ?? id;
      const mEntries = comparisonQueries[index]?.data?.entries ?? [];
      return buildComparisonSnapshot(id, name, mEntries);
    });
  }, [selectedComparisonIds, allComparisonMembers, comparisonQueries]);

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary">Progress Tracking</h2>
            <p className="text-sm text-secondary mt-0.5">Body measurements &amp; fitness metrics over time</p>
          </div>
          {activeTab === 'individual' && (
            <button type="button"
              onClick={openAddModal}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-opacity"
            >
              <Plus size={18} /> Add Entry
            </button>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-border">
          <button type="button"
            onClick={() => setActiveTab('individual')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors ${
              activeTab === 'individual'
                ? 'text-primary border-primary bg-primary-subtle'
                : 'border-transparent text-secondary hover:text-primary'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
          >
            <User size={18} /> Individual
          </button>
          <button type="button"
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors ${
              activeTab === 'compare'
                ? 'text-primary border-primary bg-primary-subtle'
                : 'border-transparent text-secondary hover:text-primary'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
          >
            <BarChart2 size={18} /> Compare Members
          </button>
        </div>

        {/* Individual tab */}
        {activeTab === 'individual' && (
          <>
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border">
              <span className="text-sm font-semibold text-primary">Select Member:</span>
              <TrainerSearchableDropdown
                value={selectedMemberId}
                onChange={(val: string | number) => setSelectedMemberId(String(val))}
                options={[
                  { label: 'Select a Member...', value: '' },
                  ...allComparisonMembers.map(m => ({ label: m.name, value: m.id }))
                ]}
                className="w-64"
              />
            </div>
            
            {!selectedMemberId ? (
              <div className="text-center py-12 text-secondary bg-card rounded-xl border border-border">
                Please select a member to view their progress.
              </div>
            ) : progressQuery.isPending || chartQuery.isPending ? (
              <div className="space-y-4">
                <div className="h-64 rounded-xl bg-card border border-border motion-safe:animate-pulse" />
                <div className="h-72 rounded-xl bg-card border border-border motion-safe:animate-pulse" />
              </div>
            ) : progressQuery.isError ? (
              <div className="p-5 rounded-xl border border-danger bg-danger-bg">
                <p role="alert" className="text-sm text-danger font-medium">{getSafeError(progressQuery.error)}</p>
                <button type="button" onClick={() => void progressQuery.refetch()} className="mt-3 min-h-11 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button>
              </div>
            ) : memberEntries.length === 0 ? (
              <TrainerProgressEmptyState onAdd={openAddModal} />
            ) : (
              <>
                {chartQuery.isError ? (
                  <div className="p-4 rounded-xl border border-warning bg-warning-bg text-warning">Progress chart could not be loaded. The table remains available.</div>
                ) : (
                  <TrainerProgressChart
                    entries={chartEntries}
                    activeMetric={activeMetric}
                    onMetricChange={setActiveMetric}
                  />
                )}
                <TrainerProgressTable
                  entries={memberEntries}
                  totalEntries={totalEntries}
                  currentPage={currentPage}
                  itemsPerPage={10}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onPageChange={setCurrentPage}
                  onSort={setSort}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              </>
            )}
          </>
        )}

        {/* Compare tab */}
        {activeTab === 'compare' && (
          <>
            <TrainerProgressMemberSelector
              allMembers={allComparisonMembers}
              selectedIds={selectedComparisonIds}
              onToggle={toggleComparisonMember}
            />
            {selectedComparisonIds.length >= 1 && (
              <>
                <TrainerProgressComparisonChart
                  snapshots={comparisonSnapshots}
                  activeMetric={activeComparisonMetric}
                  onMetricChange={setActiveComparisonMetric}
                />
                <TrainerProgressComparisonTable snapshots={comparisonSnapshots} />
              </>
            )}
          </>
        )}
      </div>

      {showModal && (
        <TrainerProgressModal
          editingEntry={editingEntry}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
