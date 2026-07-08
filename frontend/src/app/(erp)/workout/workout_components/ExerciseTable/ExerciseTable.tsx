"use client";

import { Edit2, Trash2 } from 'lucide-react';
import { useWorkoutContext } from '../../workout_context/WorkoutContext';

import ErpPagination from '../../../erp_components/ErpPagination';

export default function ExerciseTable() {
  const { filteredEx, search, currentPage, setCurrentPage, openEditEx, deleteEx } = useWorkoutContext();

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredEx.length / ITEMS_PER_PAGE);
  const currentData = filteredEx.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-black/5 dark:bg-white/5">
            <tr>
              {['Exercise', 'Primary Muscle', 'Equipment', 'Difficulty', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--workout-text-secondary)] uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--workout-border)]">
            {currentData.map(ex => (
              <tr key={ex.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-[var(--workout-text-primary)]">{ex.name}</td>
                <td className="px-4 py-3 text-sm text-[var(--workout-text-secondary)]">{ex.muscle}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-[var(--workout-bg-input)] text-[var(--workout-text-secondary)] border border-[var(--workout-border)] px-2 py-1 rounded-full">
                    {ex.equipment}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    ex.difficulty === 'Beginner' 
                    ? 'bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]' 
                    : ex.difficulty === 'Intermediate' 
                    ? 'bg-[var(--warning-bg)] text-[var(--warning)] dark:bg-[var(--warning-bg)] dark:text-[var(--warning)]' 
                    : 'bg-[var(--danger-bg)] text-[var(--danger)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger)]'
                  }`}>
                    {ex.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openEditEx(ex)} 
                      className="text-[var(--info)] hover:text-[var(--info)] dark:hover:text-[var(--info)] p-1 rounded-md hover:bg-[var(--info-bg)] dark:hover:bg-[var(--info-bg)] transition-colors"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button 
                      onClick={() => deleteEx(ex.id)} 
                      className="text-[var(--danger)] hover:text-[var(--danger)] dark:hover:text-[var(--danger)] p-1 rounded-md hover:bg-[var(--danger-bg)] dark:hover:bg-[var(--danger-bg)] transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEx.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[var(--workout-text-secondary)]">
                  No exercises found matching "{search}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ErpPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={filteredEx.length} 
        itemsPerPage={ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
