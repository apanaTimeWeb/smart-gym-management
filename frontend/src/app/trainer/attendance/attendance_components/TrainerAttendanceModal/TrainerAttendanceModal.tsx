// RESPONSIBILITY: Modal for recording a new attendance entry (member or staff).
'use client';
// DATA FLOW: props (from TrainerAttendanceMain) → react-hook-form + zod → onSubmit mutation
import { useEffect, useId, useRef } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';
import type { AttendanceMemberBasic, CreateAttendanceDto } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';
import type { TrainerAttendanceModalProps } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceModalProps';
import { useTrainerDialogFocusTrap } from '@/app/trainer/trainer_components/TrainerShared/useTrainerDialogFocusTrap';
import { AttendanceSchema, type AttendanceFormValues, getEmptyAttendanceForm } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceFormSchema';
import { maskSensitiveData } from '@/lib/formatters';



export default function TrainerAttendanceModal({ isOpen, onClose, members, saving, onSubmit }: TrainerAttendanceModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<AttendanceFormValues>({
    resolver: zodResolver(AttendanceSchema),
    defaultValues: getEmptyAttendanceForm(),
  });

  const guardNavigation = useTrainerUnsavedChangesGuard(isDirty && !saving);
  const titleId = useId();
  useTrainerDialogFocusTrap({ isOpen, dialogRef, onEscape: () => void guardNavigation(onClose) });

  const watchType = watch('type');

  useEffect(() => {
    if (isOpen) reset(getEmptyAttendanceForm());
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const handleClose = () => { void guardNavigation(onClose); };

  const onFormSubmit = async (data: AttendanceFormValues) => {
    await onSubmit({
      type: data.type,
      memberId: data.memberId,
      staffId: data.staffId,
      date: data.date,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      notes: data.notes,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-hidden border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-base">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h3 id={titleId} className="font-bold text-lg text-primary">Record Attendance</h3>
          <button
            type="button"
            onClick={handleClose}
            className="min-w-11 min-h-11 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page text-secondary hover:text-primary hover:bg-primary-subtle p-1 rounded-md motion-safe:transition-colors motion-safe:duration-base"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-5 space-y-4">
          {/* Type selector */}
          <div className="flex gap-4">
            {(['MEMBER', 'STAFF'] as const).map(t => (
              <label key={t} className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input
                  type="radio"
                  value={t}
                  {...register('type')}
                  className="text-primary focus-visible:ring-primary"
                />
                {t === 'MEMBER' ? 'Member' : 'Staff'}
              </label>
            ))}
          </div>

          {/* Member dropdown */}
          {watchType === 'MEMBER' && (
            <div>
              <label htmlFor="attendance-member-selector" className="block text-sm font-medium text-secondary mb-1">Select Member</label>
              <Controller
                name="memberId"
                control={control}
                render={({ field }) => (
                  <div id="attendance-member-selector"><TrainerSearchableDropdown
                    options={members.map(m => ({ label: `${m.name}${m.phone ? ` (${maskSensitiveData(m.phone)})` : ''}`, value: m.id }))}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder="Search Member..."
                  /></div>
                )}
              />
              {errors.memberId && watchType === 'MEMBER' && (
                <p className="text-danger text-xs mt-1">{errors.memberId.message}</p>
              )}
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="attendance-date" className="block text-sm font-medium text-secondary mb-1">Date</label>
              <input
                id="attendance-date"
                type="date"
                {...register('date')}
                aria-invalid={errors.date ? 'true' : 'false'}
                aria-describedby={errors.date ? 'attendance-date-error' : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.date ? 'border-danger focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
                } bg-input text-primary`}
              />
              {errors.date && <p id="attendance-date-error" className="text-danger text-xs mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label htmlFor="attendance-check-in" className="block text-sm font-medium text-secondary mb-1">Check In Time</label>
              <input
                id="attendance-check-in"
                type="time"
                {...register('checkIn')}
                aria-invalid={errors.checkIn ? 'true' : 'false'}
                aria-describedby={errors.checkIn ? 'attendance-check-in-error' : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.checkIn ? 'border-danger focus-visible:ring-primary' : 'border-border focus-visible:ring-primary'
                } bg-input text-primary`}
              />
              {errors.checkIn && <p id="attendance-check-in-error" className="text-danger text-xs mt-1">{errors.checkIn.message}</p>}
            </div>
            <div>
              <label htmlFor="attendance-check-out" className="block text-sm font-medium text-secondary mb-1">Check Out Time</label>
              <input
                id="attendance-check-out"
                type="time"
                {...register('checkOut')}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Notes</label>
              <input
                id="attendance-notes"
                type="text"
                {...register('notes')}
                placeholder="Optional notes..."
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-primary"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-32 px-4 py-2 rounded-lg font-medium text-on-primary bg-primary flex items-center justify-center gap-2 hover:bg-primary-hover motion-safe:transition-opacity disabled:opacity-70"
            >
              {saving ? <><Loader2 size={18} className="motion-safe:animate-spin" /> Saving…</> : <><CheckCircle size={18} /> Save Record</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
