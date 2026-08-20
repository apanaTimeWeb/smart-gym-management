// RESPONSIBILITY: Entry component for the Diet Library module. Wraps the UI in the context provider and handles page layout.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import { LibraryProvider, useLibraryContext } from '@/app/admin/library/library_context/LibraryContext';
import LibraryTabs from '@/app/admin/library/library_components/LibraryTabs/LibraryTabs';
import ExerciseModal from '@/app/admin/library/library_components/ExerciseModal/ExerciseModal';
import DietModal from '@/app/admin/library/library_components/DietModal/DietModal';
import ExerciseGrid from '@/app/admin/library/library_components/ExerciseGrid/ExerciseGrid';
import DietGrid from '@/app/admin/library/library_components/DietGrid/DietGrid';
import { LibraryInitialData } from '@/app/admin/library/library_types/library_types';

function LibraryContent() {
 const { toast, hideToast, tab } = useLibraryContext();

 return (
 <div className="min-h-full pb-10 bg-background text-foreground">
 <AdminHeader title="Library" subtitle="Manage exercises and diet plans for member assignments" />
 <div className="p-6 space-y-5">
 <LibraryTabs />
 
 <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden p-5">
   {tab === 'Exercises' ? <ExerciseGrid /> : <DietGrid />}
 </div>
 </div>

 <ExerciseModal />
 <DietModal />

 {toast && (
 <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />
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
