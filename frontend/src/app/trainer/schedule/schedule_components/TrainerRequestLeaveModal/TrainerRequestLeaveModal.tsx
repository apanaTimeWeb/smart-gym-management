// RESPONSIBILITY: Modal for trainers to submit a new leave request.
'use client';
import { useTrainerScheduleMutations } from '@/app/trainer/schedule/schedule_queries/useTrainerScheduleMutations';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { LEAVE_TYPE_OPTIONS } from '@/app/trainer/schedule/schedule_utils/TrainerScheduleSharedConstants';
import { CreateLeaveDtoSchema, type CreateLeaveDto } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { useTrainerDialogFocusTrap } from '@/app/trainer/trainer_components/TrainerShared/useTrainerDialogFocusTrap';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import { X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';

export default function TrainerRequestLeaveModal() {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showLeaveModal, closeLeaveModal } = useTrainerScheduleStore();
  const { showSuccess, showError } = useTrainerFeedback();
  const { requestLeave } = useTrainerScheduleMutations();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<CreateLeaveDto>({
    resolver: zodResolver(CreateLeaveDtoSchema),
    defaultValues: { leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' }
  });

  const guardNavigation = useTrainerUnsavedChangesGuard(isDirty && !requestLeave.isPending);
  const actionKeys = useTrainerIdempotencyKey();
  useTrainerDialogFocusTrap({ isOpen: showLeaveModal, dialogRef, onEscape: () => void handleClose() });

  useEffect(() => {
    if (showLeaveModal) {
      reset({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
    }
  }, [showLeaveModal, reset]);

  if (!showLeaveModal) return null;

  const handleClose = async () => {
    const approved = await guardNavigation(closeLeaveModal);
    if (approved) actionKeys.clear('request-leave');
  };

  const onSubmit = async (data: CreateLeaveDto) => {
    try {
      const response = await requestLeave.mutateAsync({ data, idempotencyKey: actionKeys.begin('request-leave') });
      showSuccess(response.message, 'trainer-schedule-leave-success');
      actionKeys.clear('request-leave');
      reset({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
      closeLeaveModal();
    } catch (error) {
      showError(error, 'trainer-schedule-leave-error');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-overlay backdrop-blur-sm z-40 motion-safe:transition-opacity" onClick={() => void handleClose()} />
      <div ref={dialogRef} className="fixed right-0 top-0 h-full w-full sm:w-full max-w-xl bg-card border-l border-border shadow-dialog z-40 flex flex-col motion-safe:transition-transform motion-safe:duration-slow" role="dialog" aria-modal="true" aria-labelledby="trainer-request-leave-title">
        
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-header">
          <div>
            <h2 id="trainer-request-leave-title" className="text-xl font-black text-primary">Request Leave</h2>
            <p className="text-xs text-secondary mt-1">Submit time off for manager approval</p>
          </div>
          <button type="button" onClick={() => void handleClose()} className="min-w-11 min-h-11 inline-flex items-center justify-center p-2 bg-input hover:bg-border text-secondary rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <X size={18} />
          </button>
        </div>

        <form id="leave-form" onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          <div>
            <label htmlFor="trainer-leave-type" className="block text-sm font-bold text-primary mb-1.5">Leave Type</label>
            <select
              id="trainer-leave-type"
              aria-invalid={Boolean(errors.leaveType)}
              aria-describedby={errors.leaveType ? "trainer-leave-type-error" : undefined}
              {...register('leaveType')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 motion-safe:transition-all ${errors.leaveType ? 'border-danger focus-visible:border-danger focus-visible:ring-primary' : 'border-border focus-visible:border-primary focus-visible:ring-primary'}`}
            >
              {LEAVE_TYPE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.leaveType && <p id="trainer-leave-type-error" className="text-danger text-xs mt-1">{errors.leaveType.message}</p>}
          </div>

          <div>
            <label htmlFor="trainer-leave-start-date" className="block text-sm font-bold text-primary mb-1.5">Start Date</label>
            <input 
              id="trainer-leave-start-date"
              type="date"
              aria-invalid={Boolean(errors.startDate)}
              aria-describedby={errors.startDate ? "trainer-leave-start-date-error" : undefined}
              {...register('startDate')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 motion-safe:transition-all ${errors.startDate ? 'border-danger focus-visible:border-danger focus-visible:ring-primary' : 'border-border focus-visible:border-primary focus-visible:ring-primary'}`}
            />
            {errors.startDate && <p id="trainer-leave-start-date-error" className="text-danger text-xs mt-1">{errors.startDate.message}</p>}
          </div>
          
          <div>
            <label htmlFor="trainer-leave-end-date" className="block text-sm font-bold text-primary mb-1.5">End Date</label>
            <input 
              id="trainer-leave-end-date"
              type="date"
              aria-invalid={Boolean(errors.endDate)}
              aria-describedby={errors.endDate ? "trainer-leave-end-date-error" : undefined}
              {...register('endDate')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 motion-safe:transition-all ${errors.endDate ? 'border-danger focus-visible:border-danger focus-visible:ring-primary' : 'border-border focus-visible:border-primary focus-visible:ring-primary'}`}
            />
            {errors.endDate && <p id="trainer-leave-end-date-error" className="text-danger text-xs mt-1">{errors.endDate.message}</p>}
          </div>

          <div>
            <label htmlFor="trainer-leave-reason" className="block text-sm font-bold text-primary mb-1.5">Reason for Leave</label>
            <textarea
              id="trainer-leave-reason"
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={errors.reason ? "trainer-leave-reason-error" : undefined}
              rows={4}
              {...register('reason')}
              placeholder="E.g., Medical reasons, family function..."
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 motion-safe:transition-all resize-none ${errors.reason ? 'border-danger focus-visible:border-danger focus-visible:ring-primary' : 'border-border focus-visible:border-primary focus-visible:ring-primary'}`}
            />
            {errors.reason && <p id="trainer-leave-reason-error" className="text-danger text-xs mt-1">{errors.reason.message}</p>}
          </div>
        </form>

        <div className="p-4 sm:p-6 border-t border-border bg-header flex justify-end gap-3">
          <button 
            type="button"
            onClick={() => void handleClose()}
            className="min-h-11 px-5 py-2.5 text-sm font-bold text-secondary bg-input hover:bg-border rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="leave-form"
            disabled={requestLeave.isPending}
            className="min-h-11 min-w-36 inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-on-primary bg-primary hover:bg-primary-hover rounded-xl motion-safe:transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {requestLeave.isPending ? <Loader2 size={18} className="motion-safe:animate-spin" /> : null}
            Submit Request
          </button>
        </div>

      </div>
    </>
  );
}
