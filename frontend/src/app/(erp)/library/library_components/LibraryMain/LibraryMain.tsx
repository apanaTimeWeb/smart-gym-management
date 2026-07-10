"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpFeedback/ErpToast';
import { LibraryProvider, useLibraryContext } from '@/app/(erp)/library/library_context/LibraryContext';
import LibraryTabs from '@/app/(erp)/library/library_components/LibraryTabs/LibraryTabs';
import ExerciseModal from '@/app/(erp)/library/library_components/ExerciseModal/ExerciseModal';
import DietModal from '@/app/(erp)/library/library_components/DietModal/DietModal';
import ExerciseGrid from '@/app/(erp)/library/library_components/ExerciseGrid/ExerciseGrid';
import DietGrid from '@/app/(erp)/library/library_components/DietGrid/DietGrid';
import '@/app/(erp)/library/library.css';

function LibraryContent() {
 const { toast, hideToast, tab } = useLibraryContext();

 return (
 <div className="min-h-full pb-10 library-module">
 <ErpHeader title="Library" subtitle="Manage exercises and diet plans for member assignments" />
 <div className="p-6 space-y-5">
 <LibraryTabs />
 
 <div className="bg-[var(--library-bg-card)] rounded-xl shadow-sm border border-[var(--library-border)] overflow-hidden p-5">
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

export default function LibraryMain() {
 return (
 <LibraryProvider>
 <LibraryContent />
 </LibraryProvider>
 );
}
