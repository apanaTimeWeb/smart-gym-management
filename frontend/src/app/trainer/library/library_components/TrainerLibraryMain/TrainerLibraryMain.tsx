// RESPONSIBILITY: Orchestrates the Trainer Diet Library query state and feature-local presentation components.
'use client';
// DATA FLOW: URL filter state → useTrainerLibraryLogic → TanStack Query/API → TrainerLibraryDietGrid/TrainerLibraryTabs.
import { useTrainerLibraryLogic } from '@/app/trainer/library/library_hooks/TrainerUseLibraryLogic';
import TrainerLibraryTabs from '@/app/trainer/library/library_components/TrainerLibraryTabs/TrainerLibraryTabs';
import TrainerLibraryDietModal from '@/app/trainer/library/library_components/TrainerLibraryDietModal/TrainerLibraryDietModal';
import TrainerLibraryAssignModal from '@/app/trainer/library/library_components/TrainerLibraryAssignModal/TrainerLibraryAssignModal';
import { useTrainerLibraryAssignment } from '@/app/trainer/library/library_hooks/useTrainerLibraryAssignment';
import { useState } from 'react';
import { getTrainerUserSafeErrorMessage } from '@/app/trainer/trainer_utils/TrainerUserSafeError';
import TrainerLibraryDietGrid from '@/app/trainer/library/library_components/TrainerLibraryDietGrid/TrainerLibraryDietGrid';

export default function TrainerLibraryMain() {
  const logic = useTrainerLibraryLogic();
  const assignment = useTrainerLibraryAssignment();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const {
    dietPlans,
    totalDietPlans,
    isPending,
    isError,
    search,
    filterGoal,
    currentPage,
    setSearch,
    setFilterGoal,
    setCurrentPage,
    loadAll,
    showDietModal,
    editDietData,
    openEditDiet,
    closeDietModal,
  } = logic;

  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <TrainerLibraryTabs
          search={search}
          setSearch={setSearch}
          filterGoal={filterGoal}
          setFilterGoal={setFilterGoal}
          onRefresh={loadAll}
        />
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden p-5">
          <TrainerLibraryDietGrid
            dietPlans={dietPlans}
            totalDietPlans={totalDietPlans}
            currentPage={currentPage}
            isPending={isPending}
            isError={isError}
            search={search}
            onPageChange={setCurrentPage}
            onViewDiet={openEditDiet}
          />
        </div>
      </div>
      <TrainerLibraryDietModal
        isOpen={showDietModal}
        plan={editDietData}
        onClose={closeDietModal}
        onAssign={() => setShowAssignModal(true)}
      />
      <TrainerLibraryAssignModal
        isOpen={showAssignModal}
        plan={editDietData}
        members={assignment.membersQuery.data ?? []}
        isSaving={assignment.assignDietPlan.isPending}
        errorMessage={assignment.assignDietPlan.isError ? getTrainerUserSafeErrorMessage(assignment.assignDietPlan.error) : undefined}
        onClose={() => setShowAssignModal(false)}
        onSubmit={async (memberId, idempotencyKey) => {
          if (!editDietData) return;
          await assignment.assignDietPlan.mutateAsync({ memberId, dietPlanId: editDietData.id, idempotencyKey });
          setShowAssignModal(false);
        }}
      />
    </div>
  );
}
