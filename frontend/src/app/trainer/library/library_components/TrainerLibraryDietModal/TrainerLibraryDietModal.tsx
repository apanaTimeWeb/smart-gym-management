// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Read-only view modal for a diet plan in the Diet Library module.
// ROLE BOUNDARY: Trainers can only VIEW diet plans, not create or modify them.
//                The "Edit Diet Plan" / "Add Diet Plan" buttons must not be shown in the Trainer UI.
'use client';

import { X, Utensils, Droplets, Zap } from 'lucide-react';
import { useLibraryContext } from '@/app/trainer/library/library_context/LibraryContext';

export default function TrainerLibraryDietModal() {
  const {
    showDietModal, closeDietModal,
    editDietData,
  } = useLibraryContext();

  if (!showDietModal || !editDietData) return null;

  const plan = editDietData;

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
            <p className="text-xs text-text-secondary mt-0.5">{plan.goal} · {plan.isActive ? 'Active' : 'Inactive'}</p>
          </div>
          <button
            onClick={closeDietModal}
            className="p-2 rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-4 gap-3 p-6 pb-0">
          {[
            { label: 'Calories', value: plan.calories ? `${plan.calories} kcal` : '—', icon: <Zap size={14} /> },
            { label: 'Protein', value: plan.protein ? `${plan.protein}g` : '—', icon: null },
            { label: 'Carbs', value: plan.carbs ? `${plan.carbs}g` : '—', icon: null },
            { label: 'Fats', value: plan.fats ? `${plan.fats}g` : '—', icon: null },
          ].map(m => (
            <div key={m.label} className="bg-bg-subtle rounded-xl p-3 text-center">
              <p className="text-xs text-text-secondary mb-1">{m.label}</p>
              <p className="text-sm font-bold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="p-6 space-y-4">
          {/* Description */}
          {plan.description && (
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Description</p>
              <p className="text-sm text-foreground">{plan.description}</p>
            </div>
          )}

          {/* Meals */}
          {plan.meals && plan.meals.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                <Utensils size={12} className="inline mr-1" />Meal Plan
              </p>
              <ul className="space-y-1.5">
                {plan.meals.map((meal, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    {meal}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Read-only notice */}
          <div className="rounded-xl bg-warning/10 border border-warning/20 px-4 py-3">
            <p className="text-xs text-warning font-medium">
              Diet plans are managed by your gym manager. Contact them to create or modify plans.
            </p>
          </div>

          <button
            type="button"
            onClick={closeDietModal}
            className="w-full py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-primary-subtle motion-safe:transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

