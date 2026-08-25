// RESPONSIBILITY: Renders the exercise cards grid with category and muscle group info in the Diet Library.
'use client';

import { Dumbbell, Edit2, Trash2, Loader2, Clock } from 'lucide-react';
import { useLibraryContext } from '@/app/trainer/library/library_context/LibraryContext';
import { DIFF_COLORS } from '@/app/trainer/library/library_utils/LibrarySharedConstants';
import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';

export default function ExerciseGrid() {
  const { exercises, loading, debouncedSearch, currentPage, setCurrentPage, openEditEx, deleteExercise } = useLibraryContext();

  const filtered = exercises.filter(e => {
    const s = debouncedSearch.toLowerCase();
    return e.name.toLowerCase().includes(s) || e.category.toLowerCase().includes(s);
  });

  const totalPages = Math.ceil(filtered.length / TRAINER_ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * TRAINER_ITEMS_PER_PAGE, currentPage * TRAINER_ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
        {currentData.map(ex => (
          <div 
            key={ex.id} 
            className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow flex flex-col cursor-pointer"
            onClick={() => openEditEx(ex)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary shrink-0">
                <Dumbbell size={20} />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); openEditEx(ex); }}
                  className="p-1.5 rounded hover:bg-primary/10 transition-colors text-secondary hover:text-primary"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteExercise(ex.id); }}
                  className="p-1.5 rounded transition-colors text-danger hover:bg-danger/10"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h4 className="font-bold text-foreground line-clamp-1 mb-1">{ex.name}</h4>
            <div className="flex items-center gap-2 text-xs text-secondary mb-3">
              <span className="bg-input px-2 py-0.5 rounded-full">{ex.category}</span>
              <span className={`px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[ex.difficulty] || 'bg-primary-subtle'}`}>
                {ex.difficulty}
              </span>
            </div>
            
            <div className="text-xs text-secondary space-y-1 mt-auto">
              <p>💪 {ex.muscleGroup?.join(', ')}</p>
              {ex.sets && <p>📊 {ex.sets} sets × {ex.reps} reps</p>}
              {ex.duration && <p className="flex items-center gap-1"><Clock size={12} /> {ex.duration}</p>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-10 text-center text-secondary text-sm">
            No exercises found.
          </div>
        )}
      </div>

      <div className="mt-6">
          <TrainerPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={filtered.length} 
            itemsPerPage={TRAINER_ITEMS_PER_PAGE} 
            onPageChange={setCurrentPage} 
          />
        </div>
    </div>
  );
}
