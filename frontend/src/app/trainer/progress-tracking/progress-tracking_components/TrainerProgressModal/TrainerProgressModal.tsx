// RESPONSIBILITY: Renders the accessible add/edit form for one progress entry; mutation ownership stays in TrainerProgressMain.
'use client';
// DATA FLOW: RHF + Zod form -> onSave Promise -> API mutation -> success closes/resets, failure preserves input.

import { X, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ProgressEntry, CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';
import { CreateProgressEntrySchema, type CreateProgressEntryFormValues } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgress.schema';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { useTrainerDialogFocusTrap } from '@/app/trainer/trainer_components/TrainerShared/useTrainerDialogFocusTrap';
import type { TrainerProgressModalProps } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressModalProps';

const EMPTY: CreateProgressEntryFormValues = {
  date: new Date().toISOString().split('T')[0] ?? '',
  weightKg: 0,
  heightCm: 0,
};

const INPUT_CLASS = 'w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export default function TrainerProgressModal({ editingEntry, onSave, onClose }: TrainerProgressModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateProgressEntryFormValues>({
    resolver: zodResolver(CreateProgressEntrySchema),
    defaultValues: EMPTY,
  });

  const guardNavigation = useTrainerUnsavedChangesGuard(isDirty);
  useTrainerDialogFocusTrap({ isOpen: true, dialogRef, onEscape: () => void guardNavigation(onClose) });

  useEffect(() => {
    if (editingEntry) {
      reset({
        date: editingEntry.date,
        weightKg: editingEntry.weightKg,
        heightCm: editingEntry.heightCm,
        bodyFatPercent: editingEntry.bodyFatPercent ?? undefined,
        muscleMassKg: editingEntry.muscleMassKg ?? undefined,
        chestCm: editingEntry.chestCm ?? undefined,
        waistCm: editingEntry.waistCm ?? undefined,
        hipCm: editingEntry.hipCm ?? undefined,
        notes: editingEntry.notes ?? undefined,
      });
    } else {
      reset(EMPTY);
    }
  }, [editingEntry, reset]);

  const onSubmit = async (formData: CreateProgressEntryFormValues) => {
    const data = CreateProgressEntrySchema.parse(formData);
    const succeeded = await onSave(data);
    if (succeeded) reset(data);
  };

  const handleClose = () => { void guardNavigation(onClose); };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4" role="presentation">
      <div className="bg-overlay w-full max-w-lg max-h-screen rounded-2xl shadow-dialog border border-border overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-base" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="trainer-progress-modal-title">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 id="trainer-progress-modal-title" className="text-lg font-bold text-primary">{editingEntry ? 'Edit Entry' : 'Add Progress Entry'}</h3>
          <button type="button" onClick={handleClose} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page text-secondary hover:text-primary hover:bg-input p-2 rounded-lg motion-safe:transition-colors motion-safe:duration-base min-w-11 min-h-11" aria-label="Close modal"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4 max-h-screen overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label htmlFor="progress-date" className="block text-sm font-semibold text-secondary mb-1">Date</label><input id="progress-date" type="date" aria-invalid={errors.date ? 'true' : 'false'} aria-describedby="progress-date-error" {...register('date')} className={INPUT_CLASS} />{errors.date && <span id="progress-date-error" role="alert" className="text-xs text-danger mt-1 block">{errors.date.message}</span>}</div>
            <div><label htmlFor="progress-weight" className="block text-sm font-semibold text-secondary mb-1">Weight (kg)</label><input id="progress-weight" type="number" min="30" max="300" step="0.1" aria-invalid={errors.weightKg ? 'true' : 'false'} aria-describedby="progress-weight-error" {...register('weightKg', { valueAsNumber: true })} className={INPUT_CLASS} />{errors.weightKg && <span id="progress-weight-error" role="alert" className="text-xs text-danger mt-1 block">{errors.weightKg.message}</span>}</div>
            <div><label htmlFor="progress-height" className="block text-sm font-semibold text-secondary mb-1">Height (cm)</label><input id="progress-height" type="number" min="100" max="300" step="0.1" aria-invalid={errors.heightCm ? 'true' : 'false'} aria-describedby="progress-height-error" {...register('heightCm', { valueAsNumber: true })} className={INPUT_CLASS} />{errors.heightCm && <span id="progress-height-error" role="alert" className="text-xs text-danger mt-1 block">{errors.heightCm.message}</span>}</div>
            <div><label htmlFor="progress-body-fat" className="block text-sm font-semibold text-secondary mb-1">Body Fat (%)</label><input id="progress-body-fat" type="number" min="3" max="60" step="0.1" aria-invalid={errors.bodyFatPercent ? 'true' : 'false'} aria-describedby="progress-body-fat-error" {...register('bodyFatPercent', { valueAsNumber: true })} className={INPUT_CLASS} />{errors.bodyFatPercent && <span id="progress-body-fat-error" role="alert" className="text-xs text-danger mt-1 block">{errors.bodyFatPercent.message}</span>}</div>
            <div><label htmlFor="progress-muscle" className="block text-sm font-semibold text-secondary mb-1">Muscle Mass (kg)</label><input id="progress-muscle" type="number" min="10" max="150" step="0.1" aria-invalid={errors.muscleMassKg ? 'true' : 'false'} aria-describedby="progress-muscle-error" {...register('muscleMassKg', { valueAsNumber: true })} className={INPUT_CLASS} />{errors.muscleMassKg && <span id="progress-muscle-error" role="alert" className="text-xs text-danger mt-1 block">{errors.muscleMassKg.message}</span>}</div>
            <div><label htmlFor="progress-waist" className="block text-sm font-semibold text-secondary mb-1">Waist (cm)</label><input id="progress-waist" type="number" min="1" max="300" step="0.1" aria-invalid={errors.waistCm ? 'true' : 'false'} aria-describedby="progress-waist-error" {...register('waistCm', { valueAsNumber: true })} className={INPUT_CLASS} />{errors.waistCm && <span id="progress-waist-error" role="alert" className="text-xs text-danger mt-1 block">{errors.waistCm.message}</span>}</div>
            <div><label htmlFor="progress-chest" className="block text-sm font-semibold text-secondary mb-1">Chest (cm)</label><input id="progress-chest" type="number" min="1" max="300" step="0.1" aria-invalid={errors.chestCm ? 'true' : 'false'} aria-describedby="progress-chest-error" {...register('chestCm', { valueAsNumber: true })} className={INPUT_CLASS} />{errors.chestCm && <span id="progress-chest-error" role="alert" className="text-xs text-danger mt-1 block">{errors.chestCm.message}</span>}</div>
            <div><label htmlFor="progress-hip" className="block text-sm font-semibold text-secondary mb-1">Hip (cm)</label><input id="progress-hip" type="number" min="1" max="300" step="0.1" aria-invalid={errors.hipCm ? 'true' : 'false'} aria-describedby="progress-hip-error" {...register('hipCm', { valueAsNumber: true })} className={INPUT_CLASS} />{errors.hipCm && <span id="progress-hip-error" role="alert" className="text-xs text-danger mt-1 block">{errors.hipCm.message}</span>}</div>
          </div>
          <div><label htmlFor="progress-notes" className="block text-sm font-semibold text-secondary mb-1">Notes</label><textarea id="progress-notes" rows={2} aria-invalid={errors.notes ? 'true' : 'false'} aria-describedby="progress-notes-error" {...register('notes')} className={`${INPUT_CLASS} resize-none`} />{errors.notes && <span id="progress-notes-error" role="alert" className="text-xs text-danger mt-1 block">{errors.notes.message}</span>}</div>
          <div className="pt-4 flex justify-end gap-2 border-t border-border">
            <button type="button" onClick={handleClose} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-colors motion-safe:duration-base">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-36 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70">{isSubmitting && <Loader2 size={18} className="motion-safe:animate-spin" />}{editingEntry ? 'Save Changes' : 'Add Entry'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
