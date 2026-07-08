"use client";

import { Edit2, Trash2 } from 'lucide-react';
import { useWorkoutContext } from '../../workout_context/WorkoutContext';

export default function ExerciseTable() {
  const { filteredEx, openEditEx, deleteEx } = useWorkoutContext();

  if (filteredEx.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--workout-text-secondary)]">
        No exercises found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
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
          {filteredEx.map(ex => (
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
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' 
                    : ex.difficulty === 'Intermediate' 
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                }`}>
                  {ex.difficulty}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openEditEx(ex)} 
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button 
                    onClick={() => deleteEx(ex.id)} 
                    className="text-red-400 hover:text-red-600 dark:hover:text-red-500 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
