// RESPONSIBILITY: Renders the ManagerLibraryContent sub-view extracted from ManagerLibraryMain; owns only this presentation responsibility.
'use client';
import ManagerLibraryDietGrid from '@/app/manager/library/library_components/ManagerLibraryDietGrid/ManagerLibraryDietGrid';
import ManagerLibraryDietModal from '@/app/manager/library/library_components/ManagerLibraryDietModal/ManagerLibraryDietModal';
import ManagerLibraryExerciseGrid from '@/app/manager/library/library_components/ManagerLibraryExerciseGrid/ManagerLibraryExerciseGrid';
import ManagerLibraryExerciseModal from '@/app/manager/library/library_components/ManagerLibraryExerciseModal/ManagerLibraryExerciseModal';
import ManagerLibraryTabs from '@/app/manager/library/library_components/ManagerLibraryTabs/ManagerLibraryTabs';
import { useManagerLibraryLogic  } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryLogic';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';


export function ManagerLibraryContent() {
 const { view, toast, hideToast } = useManagerLibraryLogic();

 return (
 <div className="min-h-full pb-10 bg-page text-primary">
 <ManagerHeader title="Diet Management" subtitle="Manage exercises and diet plans for member assignments" />
 <div className="p-6 space-y-5">
 <ManagerLibraryTabs />
 
 <div className="overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card">
   {view === 'diet' ? <ManagerLibraryDietGrid /> : <ManagerLibraryExerciseGrid />}
 </div>
 </div>


 <ManagerLibraryDietModal />
 <ManagerLibraryExerciseModal />

 {toast && (
 <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}
