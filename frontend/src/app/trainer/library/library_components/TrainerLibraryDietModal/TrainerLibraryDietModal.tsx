// RESPONSIBILITY: Read-only modal for inspecting a Trainer Diet Library plan and opening assignment.
'use client';
import { X, Utensils, Zap } from 'lucide-react';
import { useRef } from 'react';
import type { TrainerLibraryDietModalProps } from '@/app/trainer/library/library_types/TrainerLibraryDietModalProps';
import { useTrainerDialogFocusTrap } from '@/app/trainer/trainer_components/TrainerShared/useTrainerDialogFocusTrap';
import { displayValue } from '@/lib/formatters';

export default function TrainerLibraryDietModal({ isOpen, plan, onClose, onAssign }: TrainerLibraryDietModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useTrainerDialogFocusTrap({ isOpen: Boolean(isOpen && plan), dialogRef, onEscape: onClose });
  if (!isOpen || !plan) return null;
  return (
    <div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4" role="presentation">
      <div ref={dialogRef} className="bg-overlay border border-border rounded-2xl shadow-dialog w-full max-w-lg max-h-screen overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="trainer-diet-plan-title" tabIndex={-1}>
        <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="min-w-0"><h3 id="trainer-diet-plan-title" className="text-lg font-bold text-primary truncate">{plan.name}</h3><p className="text-xs text-secondary mt-0.5">{displayValue(plan.goal)} · {plan.isActive ? 'Active' : 'Inactive'}</p></div>
          <div className="flex items-center gap-2">
            {onAssign && <button type="button" onClick={onAssign} className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Assign to Member</button>}
            <button type="button" onClick={onClose} aria-label="Close diet plan" className="p-2 rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={18} /></button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 pb-0">
          {[['Calories', plan.calories ? `${plan.calories} kcal` : '—'], ['Protein', plan.protein ? `${plan.protein}g` : '—'], ['Carbs', plan.carbs ? `${plan.carbs}g` : '—'], ['Fats', plan.fats ? `${plan.fats}g` : '—']].map(([label, value]) => (
            <div key={label} className="bg-input rounded-xl p-3 text-center"><Zap size={18} className="mx-auto mb-1 text-warning" aria-hidden="true" /><p className="text-xs text-secondary mb-1">{label}</p><p className="text-sm font-bold text-primary">{value}</p></div>
          ))}
        </div>
        <div className="p-6 space-y-4">
          {plan.description ? <div><p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Description</p><p className="text-sm text-primary">{plan.description}</p></div> : null}
          {plan.meals?.length ? <div><p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2"><Utensils size={18} className="inline mr-1" />Meal Plan</p><ul className="space-y-1.5">{plan.meals.map((meal, index) => <li key={`${typeof meal === 'string' ? meal : meal.name}-${typeof meal === 'string' ? 'text' : meal.description ?? 'meal'}`} className="flex items-start gap-2 text-sm text-primary"><span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold">{index + 1}</span><div><span className="font-medium">{typeof meal === 'string' ? meal : meal.name}</span>{typeof meal !== 'string' && meal.description ? <span className="block text-xs text-secondary">{meal.description}</span> : null}</div></li>)}</ul></div> : null}
          <div className="rounded-xl bg-warning-bg border border-warning px-4 py-3"><p className="text-xs text-warning font-medium">Diet plans are managed by your gym manager. Contact them to create or modify plans.</p></div>
          <button type="button" onClick={onClose} className="w-full py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Close</button>
        </div>
      </div>
    </div>
  );
}
