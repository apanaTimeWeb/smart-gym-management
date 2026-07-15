// RESPONSIBILITY: Entry component for the Diet Library module. Wraps the UI in the context provider and handles page layout.
'use client';

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { LibraryProvider, useLibraryContext } from '@/app/erp/library/library_context/LibraryContext';
import LibraryTabs from '@/app/erp/library/library_components/LibraryTabs/LibraryTabs';
import ExerciseModal from '@/app/erp/library/library_components/ExerciseModal/ExerciseModal';
import DietModal from '@/app/erp/library/library_components/DietModal/DietModal';
import ExerciseGrid from '@/app/erp/library/library_components/ExerciseGrid/ExerciseGrid';
import DietGrid from '@/app/erp/library/library_components/DietGrid/DietGrid';
import { LibraryInitialData } from '@/app/erp/library/library_types/library_types';

function LibraryContent() {
 const { toast, hideToast, tab } = useLibraryContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <ErpHeader title="Library" subtitle="Manage exercises and diet plans for member assignments" />
 <div className="p-6 space-y-5">
 <LibraryTabs />
 
 <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden p-5">
   {tab === 'Exercises' ? <ExerciseGrid /> : <DietGrid />}
 </div>
 </div>

 <ExerciseModal />
 <DietModal />

 {toast && (
 <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function LibraryMain({ initialData }: { initialData?: LibraryInitialData | null }) {
 return (
 <LibraryProvider initialData={initialData}>
 <LibraryContent />
 </LibraryProvider>
 );
}
