'use client';
// RESPONSIBILITY: Renders the Diet Library add/edit modal; form setup and submission are delegated to the feature form hook.
import { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { X, Save, Loader2 } from 'lucide-react';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { GOALS } from '@/app/manager/library/library_utils/ManagerLibrarySharedConstants';
import type { ManagerLibraryNutrientKey } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import { useManagerLibraryDietForm } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryDietForm';

const NUTRIENT_FIELDS: ReadonlyArray<{ label: string; key: ManagerLibraryNutrientKey; placeholder: string }> = [
  { label: 'Calories', key: 'calories', placeholder: '2500' },
  { label: 'Protein (g)', key: 'protein', placeholder: '150' },
  { label: 'Carbs (g)', key: 'carbs', placeholder: '300' },
  { label: 'Fats (g)', key: 'fats', placeholder: '70' },
];

export default function ManagerLibraryDietModal() {
  const { form, showDietModal, editDietId, saving, handleClose, submit } = useManagerLibraryDietForm();
  const { register, control, formState: { errors } } = form;
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showDietModal || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
    getFocusable()[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); handleClose(); return; }
      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    dialog.addEventListener('keydown', handleKeyDown);
    return () => { dialog.removeEventListener('keydown', handleKeyDown); previousFocus?.focus(); };
  }, [handleClose, showDietModal]);


  if (!showDietModal) return null;

  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4" role="presentation">
      <div ref={dialogRef} className="bg-overlay rounded-2xl shadow-dialog w-full max-w-2xl overflow-hidden border border-border max-h-screen flex flex-col" role="dialog" aria-modal="true" aria-labelledby="manager-library-diet-title">
        <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 id="manager-library-diet-title" className="text-lg font-bold text-primary">{editDietId ? 'Edit Diet Plan' : 'Add Diet Plan'}</h3>
          <button type="button" aria-label="Close diet form" onClick={handleClose} className="min-h-11 min-w-11 rounded-lg hover:bg-surface-hover text-secondary motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={18} aria-hidden="true" /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label htmlFor="manager-library-diet-name" className="block text-sm font-medium text-secondary mb-1">Plan Name</label><input id="manager-library-diet-name" type="text" {...register('name')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.name ? 'border-danger focus:ring-danger' : 'border-border focus:ring-warning'} bg-input text-on-primary`} />{errors.name && <p role="alert" className="text-danger text-xs mt-1">{String(errors.name.message ?? '')}</p>}</div>
            <div><label className="block text-sm font-medium text-secondary mb-1">Goal</label><Controller name="goal" control={control} render={({ field }) => <ManagerSearchableDropdown value={field.value} onChange={field.onChange} options={GOALS.map((goal) => ({ label: goal, value: goal }))} />} />{errors.goal && <p role="alert" className="text-danger text-xs mt-1">{String(errors.goal.message ?? '')}</p>}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NUTRIENT_FIELDS.map((field) => { const error = errors[field.key]; return <div key={field.key}><label htmlFor={`manager-library-diet-${field.key}`} className="block text-sm font-medium text-secondary mb-1">{field.label}</label><input id={`manager-library-diet-${field.key}`} type="number" min="0" step="1" placeholder={field.placeholder} {...register(field.key, { valueAsNumber: true })} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${error ? 'border-danger focus:ring-danger' : 'border-border focus:ring-warning'} bg-input text-on-primary`} />{error && <p role="alert" className="text-danger text-xs mt-1">{String(error.message ?? '')}</p>}</div>; })}
          </div>
          <div><label htmlFor="manager-library-diet-description" className="block text-sm font-medium text-secondary mb-1">Description</label><input id="manager-library-diet-description" type="text" {...register('description')} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.description ? 'border-danger focus:ring-danger' : 'border-border focus:ring-warning'} bg-input text-on-primary`} /></div>
          <div><label htmlFor="manager-library-diet-meals" className="block text-sm font-medium text-secondary mb-1">Meals (one per line)</label><textarea id="manager-library-diet-meals" {...register('meals')} className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus:ring-warning bg-input text-on-primary h-32 resize-none" placeholder="Meal 1: Oats and eggs
Meal 2: Chicken and rice" /></div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button type="button" onClick={handleClose} className="flex-1 min-h-11 py-2.5 border border-border rounded-xl text-sm font-medium text-on-primary hover:bg-primary-subtle motion-safe:transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="min-w-32 flex-1 min-h-10 py-2.5 rounded-xl text-sm font-bold text-on-primary bg-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-colors">{saving ? <Loader2 className="w-4 h-4 motion-safe:animate-spin" aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}<span>{saving ? 'Saving…' : editDietId ? 'Update' : 'Add'}</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
