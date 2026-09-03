// RESPONSIBILITY: Entry component for the Diet Library module. Wraps the UI in the context provider and handles page layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { LibraryProvider, useLibraryContext } from '@/app/manager/library/library_context/LibraryContext';
import ManagerLibraryTabs from '@/app/manager/library/library_components/ManagerLibraryTabs/ManagerLibraryTabs';
import ManagerLibraryExerciseModal from '@/app/manager/library/library_components/ManagerLibraryExerciseModal/ManagerLibraryExerciseModal';
import ManagerLibraryDietModal from '@/app/manager/library/library_components/ManagerLibraryDietModal/ManagerLibraryDietModal';
import ManagerLibraryExerciseGrid from '@/app/manager/library/library_components/ManagerLibraryExerciseGrid/ManagerLibraryExerciseGrid';
import ManagerLibraryDietGrid from '@/app/manager/library/library_components/ManagerLibraryDietGrid/ManagerLibraryDietGrid';
import { LibraryInitialData } from '@/app/manager/library/library_types/library_types';

function LibraryContent() {
 const { toast, hideToast, tab } = useLibraryContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <ManagerHeader title="Library" subtitle="Manage exercises and diet plans for member assignments" />
 <div className="p-6 space-y-5">
 <ManagerLibraryTabs />
 
 <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden p-5">
   {tab === 'Exercises' ? <ManagerLibraryExerciseGrid /> : <ManagerLibraryDietGrid />}
 </div>
 </div>

 <ManagerLibraryExerciseModal />
 <ManagerLibraryDietModal />

 {toast && (
 <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function ManagerLibraryMain({ initialData }: { initialData?: LibraryInitialData | null }) {
 return (
 <LibraryProvider initialData={initialData}>
 <LibraryContent />
 </LibraryProvider>
 );
}
