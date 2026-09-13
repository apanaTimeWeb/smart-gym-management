// RESPONSIBILITY: Modal for trainers to submit a new leave request.
'use client';

import { useTrainerScheduleMutations } from '@/app/trainer/schedule/schedule_queries/useTrainerScheduleMutations';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import { LEAVE_TYPE_OPTIONS, CreateLeaveDtoSchema, type CreateLeaveDto } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { useWarnIfUnsavedChanges } from '@/app/trainer/trainer_utils/useWarnIfUnsavedChanges';
import { X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export default function TrainerRequestLeaveModal() {
  const { showLeaveModal, closeLeaveModal, showToast } = useTrainerScheduleStore();
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

  useWarnIfUnsavedChanges(isDirty && !requestLeave.isPending);

  useEffect(() => {
    if (showLeaveModal) {
      reset({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
    }
  }, [showLeaveModal, reset]);

  if (!showLeaveModal) return null;

  const onSubmit = async (data: CreateLeaveDto) => {
    try {
      await requestLeave.mutateAsync(data);
      showToast('Leave request submitted successfully.', 'success');
      closeLeaveModal();
    } catch {
      showToast('Failed to submit leave request.', 'error');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 motion-safe:transition-opacity" onClick={closeLeaveModal} />
      <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-card border-l border-border shadow-2xl z-50 flex flex-col motion-safe:transition-transform motion-safe:duration-300">
        
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-header">
          <div>
            <h2 className="text-xl font-black text-foreground">Request Leave</h2>
            <p className="text-xs text-secondary mt-1">Submit time off for manager approval</p>
          </div>
          <button type="button" onClick={closeLeaveModal} className="p-2 bg-input hover:bg-border text-secondary rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <X size={18} />
          </button>
        </div>

        <form id="leave-form" onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Leave Type</label>
            <select
              {...register('leaveType')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 motion-safe:transition-all ${errors.leaveType ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border focus:border-primary focus:ring-primary'}`}
            >
              {LEAVE_TYPE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.leaveType && <p className="text-danger text-xs mt-1">{errors.leaveType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Start Date</label>
            <input 
              type="date"
              {...register('startDate')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 motion-safe:transition-all ${errors.startDate ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border focus:border-primary focus:ring-primary'}`}
            />
            {errors.startDate && <p className="text-danger text-xs mt-1">{errors.startDate.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">End Date</label>
            <input 
              type="date"
              {...register('endDate')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 motion-safe:transition-all ${errors.endDate ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border focus:border-primary focus:ring-primary'}`}
            />
            {errors.endDate && <p className="text-danger text-xs mt-1">{errors.endDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Reason for Leave</label>
            <textarea 
              rows={4}
              {...register('reason')}
              placeholder="E.g., Medical reasons, family function..."
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 motion-safe:transition-all resize-none ${errors.reason ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border focus:border-primary focus:ring-primary'}`}
            />
            {errors.reason && <p className="text-danger text-xs mt-1">{errors.reason.message}</p>}
          </div>
        </form>

        <div className="p-4 sm:p-6 border-t border-border bg-header flex justify-end gap-3">
          <button 
            type="button"
            onClick={closeLeaveModal}
            className="px-5 py-2.5 text-sm font-bold text-secondary bg-input hover:bg-border rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="leave-form"
            disabled={requestLeave.isPending}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-primary-foreground bg-primary hover:opacity-90 rounded-xl motion-safe:transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {requestLeave.isPending ? <Loader2 size={16} className="motion-safe:animate-spin" /> : null}
            Submit Request
          </button>
        </div>

      </div>
    </>
  );
}
