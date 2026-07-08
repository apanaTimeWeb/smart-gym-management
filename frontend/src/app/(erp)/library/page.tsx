"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast, { ToastType } from '@/app/(erp)/erp_components/ErpToast';

import { LibraryProvider, useLibraryContext } from './library_context/LibraryContext';
import LibraryTabs from './library_components/LibraryTabs/LibraryTabs';
import ExerciseGrid from './library_components/ExerciseGrid/ExerciseGrid';
import DietGrid from './library_components/DietGrid/DietGrid';
import ExerciseModal from './library_components/ExerciseModal/ExerciseModal';
import DietModal from './library_components/DietModal/DietModal';

import './library.css';

function LibraryContent() {
  const { tab, toast, hideToast } = useLibraryContext();

  return (
    <div className="min-h-full pb-10 library-module bg-[var(--bg-page)] text-[var(--library-text-primary)]">
      <ErpHeader title="Library" subtitle="Manage exercise library and diet plans" />
      <div className="p-6 space-y-5">
        
        <div className="bg-[var(--library-bg-card)] rounded-xl shadow-sm border border-[var(--library-border)] overflow-hidden">
          <LibraryTabs />
          
          <div className="p-5">
            {tab === 'Exercises' ? <ExerciseGrid /> : <DietGrid />}
          </div>
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

export default function LibraryPage() {
  return (
    <LibraryProvider>
      <LibraryContent />
    </LibraryProvider>
  );
}
