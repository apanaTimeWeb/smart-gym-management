"use client";

import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import { useWorkoutContext } from '../../workout_context/WorkoutContext';

export default function WorkoutPlansGrid() {
  const { filteredWk, openEditWk, deleteWk } = useWorkoutContext();

  if (filteredWk.length === 0) {
    return (
      <div className="text-center py-10 text-[var(--workout-text-secondary)]">
        No workout plans found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {filteredWk.map(w => (
        <div 
          key={w.id} 
          className="border border-[var(--workout-border)] rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all bg-[var(--workout-bg-card)]"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Dumbbell size={17} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                w.level === 'Beginner' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' 
                  : w.level === 'Intermediate' 
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
              }`}>
                {w.level}
              </span>
              <button 
                onClick={() => openEditWk(w)} 
                className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              >
                <Edit2 size={13} />
              </button>
              <button 
                onClick={() => deleteWk(w.id)} 
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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
            {w.tags.map(tag => (
              <span key={tag} className="text-xs bg-black/5 dark:bg-white/10 text-[var(--workout-text-secondary)] px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-xs text-[var(--workout-text-secondary)]">
            Focus: <span className="font-medium text-[var(--workout-text-primary)]">{w.focus}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
