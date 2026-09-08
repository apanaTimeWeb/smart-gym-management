'use client';
// RESPONSIBILITY: Root client component for Trainer Progress Tracking.
// DATA FLOW: page.tsx (Server) → TrainerProgressMain (Client) → chart, table, modal

import { Plus } from 'lucide-react';
import { useTrainerProgressLogic } from '@/app/trainer/progress-tracking/progress_context/useTrainerProgressLogic';
import TrainerProgressChart from '@/app/trainer/progress-tracking/progress_components/TrainerProgressChart/TrainerProgressChart';
import TrainerProgressTable from '@/app/trainer/progress-tracking/progress_components/TrainerProgressTable/TrainerProgressTable';
import TrainerProgressModal from '@/app/trainer/progress-tracking/progress_components/TrainerProgressModal/TrainerProgressModal';
import TrainerProgressEmptyState from '@/app/trainer/progress-tracking/progress_components/TrainerProgressEmptyState/TrainerProgressEmptyState';

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
  } = useTrainerProgressLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        {/* Header bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Progress Tracking</h2>
            <p className="text-sm text-secondary mt-0.5">Body measurements &amp; fitness metrics over time</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity"
          >
            <Plus size={16} /> Add Entry
          </button>
        </div>

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
