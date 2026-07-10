"use client";

import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import { useWorkoutContext } from '@/app/(erp)/workout/workout_context/WorkoutContext';

import ErpPagination from '@/app/(erp)/erp_components/ErpShared/ErpPagination';

export default function WorkoutPlansGrid() {
  const { filteredWk, search, currentPage, setCurrentPage, openEditWk, deleteWk } = useWorkoutContext();

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredWk.length / ITEMS_PER_PAGE);
  const currentData = filteredWk.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {currentData.map(w => (
          <div 
            key={w.id} 
            className="border border-[var(--workout-border)] rounded-xl p-4 hover:border-[var(--info)] dark:hover:border-[var(--info)] hover:shadow-sm transition-all bg-[var(--workout-bg-card)]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-[var(--info-bg)] dark:bg-[var(--info-bg)] rounded-xl flex items-center justify-center">
                <Dumbbell size={17} className="text-[var(--info)] dark:text-[var(--info)]" />
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  w.level === 'Beginner' 
                    ? 'bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]' 
                    : w.level === 'Intermediate' 
                    ? 'bg-[var(--warning-bg)] text-[var(--warning)] dark:bg-[var(--warning-bg)] dark:text-[var(--warning)]' 
                    : 'bg-[var(--danger-bg)] text-[var(--danger)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger)]'
                }`}>
                  {w.level}
                </span>
                <button 
                  onClick={() => openEditWk(w)} 
                  className="p-1.5 text-[var(--info)] hover:text-[var(--info)] hover:bg-[var(--info-bg)] dark:hover:bg-[var(--info-bg)] rounded-lg transition-colors"
                >
                  <Edit2 size={13} />
                </button>
                <button 
                  onClick={() => deleteWk(w.id)} 
                  className="p-1.5 text-[var(--danger)] hover:text-[var(--danger)] hover:bg-[var(--danger-bg)] dark:hover:bg-[var(--danger-bg)] rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            
            <h3 className="font-semibold text-[var(--workout-text-primary)] mb-3">{w.name}</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: 'Days', v: w.days }, 
                { l: 'Exercises', v: w.exercises }, 
                { l: 'Duration', v: w.duration }
              ].map(s => (
                <div key={s.l} className="bg-[var(--workout-bg-input)] rounded-lg p-2 text-center border border-[var(--workout-border)]">
                  <p className="text-sm font-bold text-[var(--workout-text-primary)]">{s.v}</p>
                  <p className="text-xs text-[var(--workout-text-secondary)]">{s.l}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {w.tags?.map((tag: string) => (
                <span key={tag} className="text-xs bg-[var(--bg-input)] text-[var(--workout-text-secondary)] px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-xs text-[var(--workout-text-secondary)]">
              Focus: <span className="font-medium text-[var(--workout-text-primary)]">{w.focus}</span>
            </p>
          </div>
        ))}
        {filteredWk.length === 0 && (
          <div className="col-span-full text-center py-10 text-[var(--workout-text-secondary)]">
            No workout plans found matching "{search}".
          </div>
        )}
      </div>
      <div className="mt-6">
        <ErpPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={filteredWk.length} 
          itemsPerPage={ITEMS_PER_PAGE} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
