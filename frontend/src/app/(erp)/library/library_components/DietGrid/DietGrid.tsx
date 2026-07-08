"use client";

import { Utensils, Edit2, Trash2 } from 'lucide-react';
import { useLibraryContext } from '../../library_context/LibraryContext';

export default function DietGrid() {
  const { dietPlans, loading, openEditDiet, deleteDietPlan } = useLibraryContext();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {dietPlans.map(d => (
        <div 
          key={d.id} 
          className="border border-[var(--library-border)] rounded-xl p-4 hover:shadow-md transition-shadow bg-[var(--library-bg-card)]"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Utensils size={16} className="text-green-500" />
                <p className="font-semibold text-[var(--library-text-primary)]">{d.name}</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded-full">
                {d.goal}
              </span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => openEditDiet(d)} 
                className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-[var(--library-text-secondary)] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <Edit2 size={13} />
              </button>
              <button 
                onClick={() => deleteDietPlan(d.id)} 
                className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
          <div className="text-xs text-[var(--library-text-secondary)] space-y-0.5 mt-2">
            {d.calories && <p>🔥 {d.calories} kcal/day</p>}
            {d.protein && <p>🥩 Protein: {d.protein}g · Carbs: {d.carbs}g · Fats: {d.fats}g</p>}
            <div className="mt-2 space-y-0.5 border-t border-[var(--library-border)] pt-2">
              {d.meals.map((m, i) => (
                <p key={i} className="text-xs text-[var(--library-text-secondary)]">• {m}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
      {dietPlans.length === 0 && (
        <div className="col-span-1 sm:col-span-2 xl:col-span-3 text-center py-10 text-[var(--library-text-secondary)]">
          No diet plans yet. Create your first!
        </div>
      )}
    </div>
  );
}
