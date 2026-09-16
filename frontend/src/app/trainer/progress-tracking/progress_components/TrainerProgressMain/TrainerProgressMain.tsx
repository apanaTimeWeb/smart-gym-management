'use client';
// RESPONSIBILITY: Root client component for Trainer Progress Tracking.
// DATA FLOW: page.tsx (Server) → TrainerProgressMain (Client) → chart, table, modal, comparison

import { Plus, BarChart2, User } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';
import { useTrainerProgressStore } from '@/app/trainer/progress-tracking/progress_store/useTrainerProgressStore';
import { useTrainerProgressFilters } from '@/app/trainer/progress-tracking/progress_utils/useTrainerProgressFilters';
import { useTrainerProgressMembersQuery, useTrainerProgressEntriesQuery } from '@/app/trainer/progress-tracking/progress_queries/useTrainerProgressQuery';
import { useTrainerProgressMutations } from '@/app/trainer/progress-tracking/progress_queries/useTrainerProgressMutations';
import { buildComparisonSnapshot } from '@/app/trainer/progress-tracking/progress_utils/useTrainerProgressComparison';
import { fetchProgressEntries } from '@/app/trainer/progress-tracking/progress_api/TrainerProgressApi';
import type { ProgressEntry, CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import TrainerProgressChart from '@/app/trainer/progress-tracking/progress_components/TrainerProgressChart/TrainerProgressChart';
import TrainerProgressTable from '@/app/trainer/progress-tracking/progress_components/TrainerProgressTable/TrainerProgressTable';
import TrainerProgressModal from '@/app/trainer/progress-tracking/progress_components/TrainerProgressModal/TrainerProgressModal';
import TrainerProgressEmptyState from '@/app/trainer/progress-tracking/progress_components/TrainerProgressEmptyState/TrainerProgressEmptyState';
import TrainerProgressMemberSelector from '@/app/trainer/progress-tracking/progress_components/TrainerProgressMemberSelector/TrainerProgressMemberSelector';
import TrainerProgressComparisonChart from '@/app/trainer/progress-tracking/progress_components/TrainerProgressComparisonChart/TrainerProgressComparisonChart';
import TrainerProgressComparisonTable from '@/app/trainer/progress-tracking/progress_components/TrainerProgressComparisonTable/TrainerProgressComparisonTable';
import { SearchableDropdown } from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown';

export default function TrainerProgressMain() {
  const { selectedMemberId, setSelectedMemberId, activeTab, setActiveTab } = useTrainerProgressFilters();
  const { data: allComparisonMembers = [] } = useTrainerProgressMembersQuery();
  const { data: memberEntries = [] } = useTrainerProgressEntriesQuery(selectedMemberId);
  const { deleteEntry, createEntry, updateEntry } = useTrainerProgressMutations();
  const { confirm } = useConfirm();

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
    const ok = await confirm({
      title: 'Delete Progress Entry',
      message: 'Are you sure you want to delete this progress entry? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
    });
    if (!ok) return;
    deleteEntry.mutate({ memberId: selectedMemberId, entryId });
  };

  const handleSave = (data: CreateProgressEntryDto) => {
    if (editingEntry) {
      updateEntry.mutate({ memberId: selectedMemberId, entryId: editingEntry.id, dto: data });
    } else {
      createEntry.mutate({ memberId: selectedMemberId, dto: data });
    }
    closeModal();
  };

  // Pre-fetch comparison entries
  const [comparisonEntriesMap, setComparisonEntriesMap] = useState<Map<string, ProgressEntry[]>>(new Map());

  useEffect(() => {
    const fetchMissing = async () => {
      for (const memberId of selectedComparisonIds) {
        if (!comparisonEntriesMap.has(memberId)) {
          try {
            const data = await fetchProgressEntries(memberId);
            setComparisonEntriesMap(prev => new Map(prev).set(memberId, data));
          } catch {
            setComparisonEntriesMap(prev => new Map(prev).set(memberId, []));
          }
        }
      }
    };
    void fetchMissing();
  }, [selectedComparisonIds, comparisonEntriesMap]);

  const comparisonSnapshots = useMemo(() => {
    return selectedComparisonIds.map(id => {
      const name = allComparisonMembers.find(m => m.id === id)?.name ?? id;
      const mEntries = comparisonEntriesMap.get(id) ?? [];
      return buildComparisonSnapshot(id, name, mEntries);
    });
  }, [selectedComparisonIds, allComparisonMembers, comparisonEntriesMap]);

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Progress Tracking</h2>
            <p className="text-sm text-secondary mt-0.5">Body measurements &amp; fitness metrics over time</p>
          </div>
          {activeTab === 'individual' && (
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity"
            >
              <Plus size={16} /> Add Entry
            </button>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('individual')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors ${
              activeTab === 'individual'
                ? 'text-primary border-primary bg-primary-subtle'
                : 'border-transparent text-secondary hover:text-foreground'
            }`}
          >
            <User size={15} /> Individual
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors ${
              activeTab === 'compare'
                ? 'text-primary border-primary bg-primary-subtle'
                : 'border-transparent text-secondary hover:text-foreground'
            }`}
          >
            <BarChart2 size={15} /> Compare Members
          </button>
        </div>

        {/* Individual tab */}
        {activeTab === 'individual' && (
          <>
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border">
              <span className="text-sm font-semibold text-foreground">Select Member:</span>
              <SearchableDropdown
                value={selectedMemberId}
                onChange={(val) => setSelectedMemberId(String(val))}
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
            ) : memberEntries.length === 0 ? (
              <TrainerProgressEmptyState onAdd={openAddModal} />
            ) : (
              <>
                <TrainerProgressChart
                  entries={memberEntries}
                  activeMetric={activeMetric}
                  onMetricChange={setActiveMetric}
                />
                <TrainerProgressTable
                  entries={memberEntries}
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
