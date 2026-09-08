// RESPONSIBILITY: Add/Edit shift modal with React Hook Form + Zod validation.
'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2 } from 'lucide-react';
import { useScheduleContext } from '@/app/manager/schedule/schedule_context/ManagerScheduleContext';
import { ShiftSchema, SHIFT_DAYS, SHIFT_STATUS_OPTIONS, TIME_OPTIONS } from '@/app/manager/schedule/schedule_utils/ManagerScheduleSharedConstants';
import type { ShiftFormValues } from '@/app/manager/schedule/schedule_utils/ManagerScheduleSharedConstants';

export default function ManagerScheduleShiftModal() {
  const { shiftModal, closeShiftModal, saving, saveShift, trainers } = useScheduleContext();
  const { open, editShift, trainerId } = shiftModal;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ShiftFormValues>({
    resolver: zodResolver(ShiftSchema),
    defaultValues: { trainerId: trainerId ?? '', day: 'Monday', startTime: '06:00', endTime: '12:00', status: 'Active', notes: '' },
  });

  useEffect(() => {
    if (open) {
      reset(editShift
        ? { trainerId: editShift.trainerId, day: editShift.day, startTime: editShift.startTime, endTime: editShift.endTime, status: editShift.status, notes: editShift.notes ?? '' }
        : { trainerId: trainerId ?? '', day: 'Monday', startTime: '06:00', endTime: '12:00', status: 'Active', notes: '' }
      );
    }
  }, [open, editShift, trainerId, reset]);

  if (!open) return null;

  const onSubmit = (data: ShiftFormValues) => { void saveShift(data); };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-overlay border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">{editShift ? 'Edit Shift' : 'Add Shift'}</h2>
          <button onClick={closeShiftModal} className="p-1.5 rounded-lg hover:bg-border/40 text-secondary hover:text-foreground motion-safe:transition-colors" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Trainer */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Trainer <span className="text-danger">*</span></label>
            <select {...register('trainerId')} disabled={!!editShift} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary disabled:opacity-50">
              <option value="">Select trainer</option>
              {trainers.map(t => <option key={t.trainerId} value={t.trainerId}>{t.trainerName} — {t.trainerRole}</option>)}
            </select>
            {errors.trainerId && <p className="text-xs text-danger mt-1">{errors.trainerId.message}</p>}
          </div>

          {/* Day */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Day <span className="text-danger">*</span></label>
            <select {...register('day')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary">
              {SHIFT_DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.day && <p className="text-xs text-danger mt-1">{errors.day.message}</p>}
          </div>

          {/* Time range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Start Time <span className="text-danger">*</span></label>
              <select {...register('startTime')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary">
                {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.startTime && <p className="text-xs text-danger mt-1">{errors.startTime.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">End Time <span className="text-danger">*</span></label>
              <select {...register('endTime')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary">
                {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.endTime && <p className="text-xs text-danger mt-1">{errors.endTime.message}</p>}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Status <span className="text-danger">*</span></label>
            <select {...register('status')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary">
              {SHIFT_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Notes</label>
            <input {...register('notes')} placeholder="e.g. Medical leave, Holiday cover..." className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-secondary focus:outline-none focus:border-primary" />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={closeShiftModal} className="px-4 py-2 text-sm font-medium text-secondary border border-border rounded-lg hover:bg-border/30 motion-safe:transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-semibold bg-primary text-black rounded-lg hover:opacity-90 disabled:opacity-60 flex items-center gap-2 motion-safe:transition-opacity">
              {saving && <Loader2 size={14} className="motion-safe:animate-spin" />}
              {editShift ? 'Save Changes' : 'Add Shift'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
