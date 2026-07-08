"use client";

import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import { useLibraryContext } from '../../library_context/LibraryContext';
import { DIFF_COLORS } from '../../library_utils/LibrarySharedConstants';

export default function ExerciseGrid() {
  const { exercises, loading, openEditEx, deleteExercise } = useLibraryContext();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {exercises.map(ex => (
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
              <span className="text-xs bg-black/5 dark:bg-white/5 text-[var(--library-text-secondary)] px-2 py-0.5 rounded-full">
                {ex.category}
              </span>
              <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[ex.difficulty] || 'bg-gray-100 text-gray-700'}`}>
                {ex.difficulty}
              </span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => openEditEx(ex)} 
                className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-[var(--library-text-secondary)] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <Edit2 size={13} />
              </button>
              <button 
                onClick={() => deleteExercise(ex.id)} 
                className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
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
      {exercises.length === 0 && (
        <div className="col-span-1 sm:col-span-2 xl:col-span-3 text-center py-10 text-[var(--library-text-secondary)]">
          No exercises yet. Add your first!
        </div>
      )}
    </div>
  );
}
