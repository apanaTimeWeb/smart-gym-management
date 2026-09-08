'use client';
// RESPONSIBILITY: Root client component for Trainer Progress Tracking.
// DATA FLOW: page.tsx (Server) → TrainerProgressMain (Client) → chart, table, modal, comparison

import { Plus, BarChart2, User } from 'lucide-react';
import { useTrainerProgressLogic } from '@/app/trainer/progress-tracking/progress_context/useTrainerProgressLogic';
import TrainerProgressChart from '@/app/trainer/progress-tracking/progress_components/TrainerProgressChart/TrainerProgressChart';
import TrainerProgressTable from '@/app/trainer/progress-tracking/progress_components/TrainerProgressTable/TrainerProgressTable';
import TrainerProgressModal from '@/app/trainer/progress-tracking/progress_components/TrainerProgressModal/TrainerProgressModal';
import TrainerProgressEmptyState from '@/app/trainer/progress-tracking/progress_components/TrainerProgressEmptyState/TrainerProgressEmptyState';
import TrainerProgressMemberSelector from '@/app/trainer/progress-tracking/progress_components/TrainerProgressMemberSelector/TrainerProgressMemberSelector';
import TrainerProgressComparisonChart from '@/app/trainer/progress-tracking/progress_components/TrainerProgressComparisonChart/TrainerProgressComparisonChart';
import TrainerProgressComparisonTable from '@/app/trainer/progress-tracking/progress_components/TrainerProgressComparisonTable/TrainerProgressComparisonTable';

export default function TrainerProgressMain() {
  const {
    memberEntries,
    activeMetric,
    setActiveMetric,
    showModal,
    editingEntry,
    openAddModal,
    openEditModal,
    closeModal,
    handleDelete,
    handleSave,
    activeTab,
    setActiveTab,
    allComparisonMembers,
    selectedComparisonIds,
    toggleComparisonMember,
    comparisonSnapshots,
    activeComparisonMetric,
    setActiveComparisonMetric,
  } = useTrainerProgressLogic();

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
            {memberEntries.length === 0 ? (
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
