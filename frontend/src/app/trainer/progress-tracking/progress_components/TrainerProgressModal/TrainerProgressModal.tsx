'use client';
// RESPONSIBILITY: Add / Edit modal for a single progress entry with Zod validation.
// DATA FLOW: TrainerProgressMain → TrainerProgressModal

import { X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { ProgressEntry, CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { CreateProgressEntrySchema, type CreateProgressEntryFormValues } from '@/app/trainer/progress-tracking/progress_types/TrainerProgress.schema';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';

interface TrainerProgressModalProps {
  editingEntry: ProgressEntry | null;
  onSave: (data: CreateProgressEntryDto) => void;
  onClose: () => void;
}

const EMPTY: CreateProgressEntryFormValues = {
  date: new Date().toISOString().split('T')[0] ?? '',
  weightKg: 0,
  heightCm: 0,
};

export default function TrainerProgressModal({ editingEntry, onSave, onClose }: TrainerProgressModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateProgressEntryFormValues>({
    resolver: zodResolver(CreateProgressEntrySchema),
    defaultValues: EMPTY,
  });

  useTrainerUnsavedChangesGuard(isDirty);

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
    // The resolver has validated the data, we parse to get the transformed output
    const data = CreateProgressEntrySchema.parse(formData);
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 backdrop-blur-sm p-4">
      <div className="bg-overlay w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            {editingEntry ? 'Edit Entry' : 'Add Progress Entry'}
          </h3>
          <button
            onClick={onClose}
            className="text-secondary hover:text-foreground hover:bg-input p-1 rounded-lg motion-safe:transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4 max-h-3/4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Date</label>
              <input
                type="date"
                {...register('date')}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.date && <span className="text-xs text-danger mt-1">{errors.date.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register('weightKg', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.weightKg && <span className="text-xs text-danger mt-1">{errors.weightKg.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Height (cm)</label>
              <input
                type="number"
                step="0.1"
                {...register('heightCm', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.heightCm && <span className="text-xs text-danger mt-1">{errors.heightCm.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Body Fat (%)</label>
              <input
                type="number"
                step="0.1"
                {...register('bodyFatPercent', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.bodyFatPercent && <span className="text-xs text-danger mt-1">{errors.bodyFatPercent.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Muscle Mass (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register('muscleMassKg', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.muscleMassKg && <span className="text-xs text-danger mt-1">{errors.muscleMassKg.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Waist (cm)</label>
              <input
                type="number"
                step="0.1"
                {...register('waistCm', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.waistCm && <span className="text-xs text-danger mt-1">{errors.waistCm.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Chest (cm)</label>
              <input
                type="number"
                step="0.1"
                {...register('chestCm', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.chestCm && <span className="text-xs text-danger mt-1">{errors.chestCm.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary mb-1">Hip (cm)</label>
              <input
                type="number"
                step="0.1"
                {...register('hipCm', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.hipCm && <span className="text-xs text-danger mt-1">{errors.hipCm.message}</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Notes</label>
            <textarea
              rows={2}
              {...register('notes')}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground hover:bg-input rounded-lg motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 motion-safe:transition-colors disabled:opacity-70"
            >
              {isSubmitting && <Loader2 size={16} className="motion-safe:animate-spin" />}
              {editingEntry ? 'Save Changes' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
