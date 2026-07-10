"use client";

import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import { useLibraryContext } from '@/app/(erp)/library/library_context/LibraryContext';
import { DIFF_COLORS } from '@/app/(erp)/library/library_utils/LibrarySharedConstants';

import ErpPagination from '@/app/(erp)/erp_components/ErpPagination';

export default function ExerciseGrid() {
  const { exercises, loading, search, debouncedSearch, currentPage, setCurrentPage, openEditEx, deleteExercise } = useLibraryContext();

  const filtered = exercises.filter(e => {
    const s = debouncedSearch.toLowerCase();
    return e.name.toLowerCase().includes(s) || e.category.toLowerCase().includes(s);
  });

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-[var(--warning)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {currentData.map(ex => (
          <div 
            key={ex.id} 
            className="border border-[var(--library-border)] rounded-xl p-4 hover:shadow-md transition-shadow bg-[var(--library-bg-card)]"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Dumbbell size={16} className="text-[var(--library-highlight)]" />
                  <p className="font-semibold text-[var(--library-text-primary)]">{ex.name}</p>
                </div>
                <span className="text-xs bg-[var(--bg-input)] text-[var(--library-text-secondary)] px-2 py-0.5 rounded-full">
                  {ex.category}
                </span>
                <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[ex.difficulty] || 'bg-[var(--primary-subtle)] text-[var(--text-tertiary)]'}`}>
                  {ex.difficulty}
                </span>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => openEditEx(ex)} 
                  className="p-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--library-text-secondary)] hover:bg-[var(--primary-subtle)] transition-colors"
                >
                  <Edit2 size={13} />
                </button>
                <button 
                  onClick={() => deleteExercise(ex.id)} 
                  className="p-1.5 rounded-lg bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)] text-[var(--danger)] hover:bg-[var(--danger-bg)] dark:hover:bg-[var(--danger-bg)] transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <div className="text-xs text-[var(--library-text-secondary)] space-y-0.5 mt-2">
              <p>💪 {ex.muscleGroup.join(', ')}</p>
              {ex.sets && <p>📊 {ex.sets} sets × {ex.reps} reps</p>}
              {ex.duration && <p>⏱ {ex.duration}</p>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-1 sm:col-span-2 xl:col-span-3 text-center py-10 text-[var(--library-text-secondary)]">
            No exercises found matching "{search}".
          </div>
        )}
      </div>
      <div className="mt-6">
        <ErpPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={filtered.length} 
          itemsPerPage={ITEMS_PER_PAGE} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
