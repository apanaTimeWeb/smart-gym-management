'use client';
// RESPONSIBILITY: Orchestrates the Trainer Diet Library query state and feature-local presentation components.
// DATA FLOW: URL filter state → useTrainerLibraryLogic → TanStack Query/API → TrainerLibraryDietGrid/TrainerLibraryTabs.
import { useTrainerLibraryLogic } from '@/app/trainer/library/library_context/TrainerUseLibraryLogic';
import TrainerLibraryTabs from '@/app/trainer/library/library_components/TrainerLibraryTabs/TrainerLibraryTabs';
import TrainerLibraryDietModal from '@/app/trainer/library/library_components/TrainerLibraryDietModal/TrainerLibraryDietModal';
import TrainerLibraryDietGrid from '@/app/trainer/library/library_components/TrainerLibraryDietGrid/TrainerLibraryDietGrid';

export default function TrainerLibraryMain() {
  const logic = useTrainerLibraryLogic();
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
    <div className="min-h-full pb-10 bg-background text-foreground">
      <div className="p-6 space-y-5">
        <TrainerLibraryTabs
          search={search}
          setSearch={setSearch}
          filterGoal={filterGoal}
          setFilterGoal={(goal) => setFilterGoal(goal as any)}
          onRefresh={loadAll}
        />
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden p-5">
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
      />
    </div>
  );
}
