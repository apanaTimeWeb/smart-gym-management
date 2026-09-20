// RESPONSIBILITY: Renders the Library exercise create/edit dialog; form state and mutation orchestration are delegated to the feature hook.
'use client';
import { useEffect, useRef } from 'react';
import { Dumbbell, Loader2, Save, X } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useManagerLibraryExerciseForm } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryExerciseForm';
import { MANAGER_LIBRARY_EXERCISE_CATEGORIES, MANAGER_LIBRARY_EXERCISE_DIFFICULTIES } from '@/app/manager/library/library_utils/ManagerLibraryExerciseConstants';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';


export default function ManagerLibraryExerciseModal() {
  const { form, showExerciseModal, editExerciseId, saving, handleClose, submit } = useManagerLibraryExerciseForm();
  const { register, control, formState: { errors } } = form;
  const dialogRef = useRef<HTMLDivElement>(null);
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showExerciseModal || !dialogRef.current) return;
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
  }, [handleClose, showExerciseModal]);

  if (!showExerciseModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4" role="presentation">
      <div ref={dialogRef} className="flex max-h-screen w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-overlay shadow-dialog" role="dialog" aria-modal="true" aria-labelledby="manager-library-exercise-title">
        <div className="flex items-center justify-between border-b border-border bg-overlay px-6 py-4"><div className="flex items-center gap-2"><Dumbbell size={18} className="text-primary" aria-hidden="true" /><h3 id="manager-library-exercise-title" className="text-lg font-bold text-primary">{editExerciseId ? 'Edit Exercise' : 'Add Exercise'}</h3></div><button type="button" aria-label="Close exercise form" onClick={handleClose} className="min-h-11 min-w-11 rounded-lg text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all"><X size={18} className="mx-auto" aria-hidden="true" /></button></div>
        <form onSubmit={submit} className="flex-1 space-y-4 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div><label htmlFor="manager-library-exercise-name" className="mb-1 block text-sm font-medium text-secondary">Exercise Name</label><input id="manager-library-exercise-name" {...register('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'manager-library-exercise-name-error' : undefined} className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />{errors.name && <p id="manager-library-exercise-name-error" role="alert" className="mt-1 text-xs text-danger">{errors.name.message}</p>}</div>
            <div><label htmlFor="manager-library-exercise-category" className="mb-1 block text-sm font-medium text-secondary">Category</label><select id="manager-library-exercise-category" {...register('category')} className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><option value="">Select category</option>{MANAGER_LIBRARY_EXERCISE_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select>{errors.category && <p role="alert" className="mt-1 text-xs text-danger">{errors.category.message}</p>}</div>
            <div><label htmlFor="manager-library-exercise-muscle" className="mb-1 block text-sm font-medium text-secondary">Muscle Groups</label><input id="manager-library-exercise-muscle" {...register('muscleGroup')} placeholder="Chest, Triceps" className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /><p className="mt-1 text-xs text-secondary">Separate multiple groups with commas.</p></div>
            <Controller name="difficulty" control={control} render={({ field }) => <div><label htmlFor="manager-library-exercise-difficulty" className="mb-1 block text-sm font-medium text-secondary">Difficulty</label><ManagerSearchableDropdown value={field.value} onChange={field.onChange} options={MANAGER_LIBRARY_EXERCISE_DIFFICULTIES.map((value) => ({ value, label: value }))} placeholder="Select difficulty" /></div>} />
            <div><label htmlFor="manager-library-exercise-sets" className="mb-1 block text-sm font-medium text-secondary">Sets</label><input id="manager-library-exercise-sets" type="number" min="0" max="100" step="1" {...register('sets', { valueAsNumber: true })} className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
            <div><label htmlFor="manager-library-exercise-reps" className="mb-1 block text-sm font-medium text-secondary">Reps</label><input id="manager-library-exercise-reps" type="number" min="0" max="1000" step="1" {...register('reps', { valueAsNumber: true })} className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
            <div><label htmlFor="manager-library-exercise-duration" className="mb-1 block text-sm font-medium text-secondary">Duration (minutes)</label><input id="manager-library-exercise-duration" type="number" min="0" max="1440" step="1" {...register('duration', { valueAsNumber: true })} className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
            <div><label htmlFor="manager-library-exercise-video" className="mb-1 block text-sm font-medium text-secondary">Video URL</label><input id="manager-library-exercise-video" type="url" {...register('videoUrl')} className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />{errors.videoUrl && <p role="alert" className="mt-1 text-xs text-danger">{errors.videoUrl.message}</p>}</div>
          </div>
          <div><label htmlFor="manager-library-exercise-description" className="mb-1 block text-sm font-medium text-secondary">Description</label><textarea id="manager-library-exercise-description" rows={4} {...register('description')} className="w-full resize-none rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
          <Controller name="isActive" control={control} render={({ field }) => <label className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-input p-3 text-sm text-primary"><input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-border text-primary focus-visible:ring-primary" /> Exercise is active</label>} />
          <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={handleClose} className="min-h-11 rounded-xl border border-border px-5 text-sm font-medium text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all">Cancel</button><button type="submit" disabled={saving} className="flex min-h-11 min-w-32 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-on-primary shadow-card motion-safe:transition-all disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{saving ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}{saving ? 'Saving…' : editExerciseId ? 'Update Exercise' : 'Add Exercise'}</button></div>
        </form>
      </div>
    </div>
  );
}
