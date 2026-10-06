// RESPONSIBILITY: Renders ManagerLibraryContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerToast from '@/components/ui/manager_toast/ManagerToast';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerLibraryDietGrid from '@/app/frontend_manager/manager_library/manager_library_components/manager_library_diet_grid/ManagerLibraryDietGrid';
import ManagerLibraryDietModal from '@/app/frontend_manager/manager_library/manager_library_components/manager_library_diet_modal/ManagerLibraryDietModal';
import ManagerLibraryExerciseGrid from '@/app/frontend_manager/manager_library/manager_library_components/manager_library_exercise_grid/ManagerLibraryExerciseGrid';
import ManagerLibraryExerciseModal from '@/app/frontend_manager/manager_library/manager_library_components/manager_library_exercise_modal/ManagerLibraryExerciseModal';
import ManagerLibraryTabs from '@/app/frontend_manager/manager_library/manager_library_components/manager_library_tabs/ManagerLibraryTabs';
import { useManagerLibraryLogic } from '@/app/frontend_manager/manager_library/manager_library_hooks/useManagerLibraryLogic';


/** @description Renders the ManagerLibraryContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerLibraryContent() {
  const t = useTranslations('MANAGER_LIBRARY');

 const { view, toast, hideToast } = useManagerLibraryLogic();

 return (
 <div className="min-h-full pb-10 bg-page text-primary">
 <ManagerHeader data-testid="manager_library-managerlibrarycontent-managerheader-1" title={t("COPY_DIET_MANAGEMENT")} subtitle={t("COPY_MANAGE_EXERCISES_DIET_PLANS_MEMBER_ASSIGNMENTS")} />
 <div className="p-6 space-y-5">
 <ManagerLibraryTabs  data-testid="manager_library-managerlibrarycontent-library-tabs-1"/>
 
 <div className="overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
   {view === 'diet' ? <ManagerLibraryDietGrid /> : <ManagerLibraryExerciseGrid />}
 </div>
 </div>


 <ManagerLibraryDietModal />
 <ManagerLibraryExerciseModal />

 {toast && (
 <ManagerToast data-testid="manager_library-managerlibrarycontent-managertoast-2" message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}
