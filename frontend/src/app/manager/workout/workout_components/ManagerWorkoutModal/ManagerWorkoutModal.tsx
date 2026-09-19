'use client';
import { MANAGER_WORKOUT_LEVELS } from '@/app/manager/workout/workout_constants/ManagerWorkoutFormConstants';
// RESPONSIBILITY: Renders the Workout Plan editor modal; form state and mutation orchestration are delegated to the feature form hook.
import { Controller } from 'react-hook-form';
import { X, Save, Loader2 } from 'lucide-react';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { useManagerWorkoutForm } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutForm';



export default function ManagerWorkoutModal() {
  const { form, showWkModal, editWkId, saving, handleClose, submit } = useManagerWorkoutForm();
  const { register, control, formState: { errors } } = form;
  if (!showWkModal) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4" role="presentation">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-hidden border-2 border-warning" role="dialog" aria-modal="true" aria-labelledby="manager-workout-title">
        <div className="flex justify-between items-center p-5 border-b border-border"><h3 id="manager-workout-title" className="font-bold text-lg text-primary">{editWkId ? 'Edit Workout Plan' : 'Add Workout Plan'}</h3><button type="button" aria-label="Close workout form" onClick={handleClose} className="text-secondary hover:text-primary hover:bg-primary-subtle p-2 rounded-md motion-safe:transition-colors"><X size={18} aria-hidden="true" /></button></div>
        <form onSubmit={submit} className="p-5 space-y-4">
          <div><label htmlFor="manager-workout-name" className="block text-sm font-medium text-secondary mb-1">Plan Name *</label><input id="manager-workout-name" type="text" {...register('name')} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-danger focus:ring-danger' : 'border-border focus:ring-warning'} bg-input text-primary`} />{errors.name && <p role="alert" className="text-danger text-xs mt-1">{String(errors.name.message ?? '')}</p>}</div>
          <div><label className="block text-sm font-medium text-secondary mb-1">Level</label><Controller name="level" control={control} render={({ field }) => <ManagerSearchableDropdown options={MANAGER_WORKOUT_LEVELS as any} value={field.value} onChange={field.onChange} />} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="manager-workout-days" className="block text-sm font-medium text-secondary mb-1">Days</label><input id="manager-workout-days" type="number" min="1" step="1" {...register('days', { valueAsNumber: true })} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary" />{errors.days && <p role="alert" className="text-danger text-xs mt-1">{String(errors.days.message ?? '')}</p>}</div><div><label htmlFor="manager-workout-exercises" className="block text-sm font-medium text-secondary mb-1">Exercises</label><input id="manager-workout-exercises" type="number" min="1" step="1" {...register('exercises', { valueAsNumber: true })} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary" />{errors.exercises && <p role="alert" className="text-danger text-xs mt-1">{String(errors.exercises.message ?? '')}</p>}</div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="manager-workout-focus" className="block text-sm font-medium text-secondary mb-1">Focus</label><input id="manager-workout-focus" type="text" {...register('focus')} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary" /></div><div><label htmlFor="manager-workout-duration" className="block text-sm font-medium text-secondary mb-1">Duration</label><input id="manager-workout-duration" type="text" {...register('duration')} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary" /></div></div>
          <div><label htmlFor="manager-workout-tags" className="block text-sm font-medium text-secondary mb-1">Tags</label><input id="manager-workout-tags" type="text" placeholder="Strength, Beginner" {...register('tags')} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary" /></div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2"><button type="button" onClick={handleClose} className="flex-1 min-h-10 py-2.5 border border-border rounded-xl text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-colors">Cancel</button><button type="submit" disabled={saving} className="min-w-32 flex-1 min-h-10 py-2.5 rounded-xl text-sm font-bold text-on-primary bg-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-colors">{saving ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}<span>{saving ? 'Saving…' : editWkId ? 'Update' : 'Save'}</span></button></div>
        </form>
      </div>
    </div>
  );
}
