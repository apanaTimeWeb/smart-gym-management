"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpToast';
import { LibraryProvider, useLibraryContext } from '../../library_context/LibraryContext';
import LibraryTabs from '../LibraryTabs/LibraryTabs';
import ExerciseModal from '../ExerciseModal/ExerciseModal';
import DietModal from '../DietModal/DietModal';
import '../../library.css';

function LibraryContent() {
 const { toast, hideToast } = useLibraryContext();

 return (
 <div className="min-h-full pb-10 library-module">
 <ErpHeader title="Library" subtitle="Manage exercises and diet plans for member assignments" />
 <div className="p-6 space-y-5">
 <LibraryTabs />
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
