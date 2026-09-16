'use client';
// RESPONSIBILITY: Modal for recording a new attendance entry (member or staff).
// DATA FLOW: props (from TrainerAttendanceMain) → react-hook-form + zod → onSubmit mutation
import { useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import {
  AttendanceSchema,
  type AttendanceFormValues,
  EMPTY_ATTENDANCE_FORM,
} from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';
import type { AttendanceMemberBasic, CreateAttendanceDto } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

interface TrainerAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: AttendanceMemberBasic[];
  saving: boolean;
  onSubmit: (data: CreateAttendanceDto) => Promise<void>;
}

export default function TrainerAttendanceModal({ isOpen, onClose, members, saving, onSubmit }: TrainerAttendanceModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<AttendanceFormValues>({
    resolver: zodResolver(AttendanceSchema),
    defaultValues: EMPTY_ATTENDANCE_FORM,
  });

  useTrainerUnsavedChangesGuard(isDirty && !saving);

  const watchType = watch('type');

  useEffect(() => {
    if (isOpen) reset(EMPTY_ATTENDANCE_FORM);
  }, [isOpen, reset]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h3 className="font-bold text-lg text-foreground">Record Attendance</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary hover:text-foreground hover:bg-primary/10 p-1 rounded-md motion-safe:transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-5 space-y-4">
          {/* Type selector */}
          <div className="flex gap-4">
            {(['MEMBER', 'STAFF'] as const).map(t => (
              <label key={t} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
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
              <label className="block text-sm font-medium text-secondary mb-1">Select Member</label>
              <Controller
                name="memberId"
                control={control}
                render={({ field }) => (
                  <TrainerSearchableDropdown
                    options={members.map(m => ({ label: `${m.name}${m.phone ? ` (${m.phone})` : ''}`, value: m.id }))}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder="Search Member..."
                  />
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
              <label className="block text-sm font-medium text-secondary mb-1">Date</label>
              <input
                type="date"
                {...register('date')}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.date ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                } bg-input text-foreground`}
              />
              {errors.date && <p className="text-danger text-xs mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Check In Time</label>
              <input
                type="time"
                {...register('checkIn')}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.checkIn ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                } bg-input text-foreground`}
              />
              {errors.checkIn && <p className="text-danger text-xs mt-1">{errors.checkIn.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Check Out Time</label>
              <input
                type="time"
                {...register('checkOut')}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Notes</label>
              <input
                type="text"
                {...register('notes')}
                placeholder="Optional notes..."
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-input text-foreground"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-foreground hover:bg-primary/10 motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="min-w-32 px-4 py-2 rounded-lg font-medium text-white bg-primary flex items-center justify-center gap-2 hover:opacity-90 motion-safe:transition-opacity disabled:opacity-70"
            >
              {saving ? <Loader2 className="w-4 h-4 motion-safe:animate-spin" /> : <><CheckCircle size={15} /> Save Record</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
