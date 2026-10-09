"use client";
// RESPONSIBILITY: Orchestrates the Trainer Diet Library query state and feature-local presentation components.
// DATA FLOW: URL filter state → useTrainerLibraryLogic → TanStack Query/API → TrainerLibraryDietGrid/TrainerLibraryTabs.
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { TrainerInfrastructureUserSafeError } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_errors/TrainerInfrastructureUserSafeError';

import TrainerLibraryAssignModal from '@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_assign_modal/TrainerLibraryAssignModal';

import TrainerLibraryDietGrid from '@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_diet_grid/TrainerLibraryDietGrid';

import TrainerLibraryDietModal from '@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_diet_modal/TrainerLibraryDietModal';

import TrainerLibraryTabs from '@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_tabs/TrainerLibraryTabs';

import { useTrainerLibraryAssignment } from '@/app/frontend_trainer/trainer_library/trainer_library_hooks/useTrainerLibraryAssignment';

import { useTrainerLibraryLogic } from '@/app/frontend_trainer/trainer_library/trainer_library_hooks/useTrainerLibraryLogic';










/**
 * @description Orchestrates the Trainer Diet Library query state and feature-local presentation components.
 * @dependencies URL filter state → useTrainerLibraryLogic → TanStack Query/API → TrainerLibraryDietGrid/TrainerLibraryTabs.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the library feature UI responsibility represented by TrainerLibraryMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerLibraryMain() {
  const t = useTranslations('TRAINER_LIBRARY');
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
          onRefresh={loadAll}/>
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden p-5">
          <TrainerLibraryDietGrid
            dietPlans={dietPlans}
            totalDietPlans={totalDietPlans}
            currentPage={currentPage}
            isPending={isPending}
            isError={isError}
            search={search}
            onPageChange={setCurrentPage}
            onViewDiet={openEditDiet}/>
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
        isSaving={assignment.isSaving}
        errorMessage={assignment.isError ? TrainerInfrastructureUserSafeError(assignment.error, t('TEXT_GENERIC_REQUEST_ERROR')) : undefined}
        onClose={() => setShowAssignModal(false)}
        onSubmit={async (memberId, idempotencyKey) => {
          if (!editDietData) return;
          await assignment.assignDietPlan({ memberId, dietPlanId: editDietData.id, idempotencyKey });
          setShowAssignModal(false);
        }} testId="trainer-library-library-main-edit"/>
    </div>
  );
}
