'use client';
// RESPONSIBILITY: Renders and validates the PT assignment form; submission is delegated to the API mutation callback.
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, UserPlus, X } from 'lucide-react';
import type { PtPackage, PtTrainerWorkload } from '@/app/manager/pt/pt_types/ManagerPtTypes';
import { managerPtAssignmentSchema, type ManagerPtAssignmentFormValues } from '@/app/manager/pt/pt_types/ManagerPtAssignmentSchema';

interface ManagerPtAssignmentFormProps {
  open: boolean;
  packages: PtPackage[];
  trainers: PtTrainerWorkload[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: ManagerPtAssignmentFormValues) => Promise<void>;
}

export default function ManagerPtAssignmentForm({ open, packages, trainers, saving, onClose, onSubmit }: ManagerPtAssignmentFormProps) {
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<ManagerPtAssignmentFormValues>({
    resolver: zodResolver(managerPtAssignmentSchema),
    defaultValues: { memberId: '', trainerId: '', packageId: '', startDate: '' },
  });

  if (!open) return null;

  const submit = async (values: ManagerPtAssignmentFormValues) => {
    await onSubmit(values);
    reset();
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="manager-pt-assignment-title" className="fixed inset-0 z-40 flex justify-end bg-foreground/60 backdrop-blur-sm">
      <form onSubmit={handleSubmit(submit)} className="h-full w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border bg-header">
          <div className="flex items-center gap-3"><UserPlus size={20} className="text-primary" /><h2 id="manager-pt-assignment-title" className="text-lg font-black text-foreground">Assign Trainer</h2></div>
          <button type="button" onClick={onClose} aria-label="Close assignment form" className="p-2 rounded-full bg-input text-secondary"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <label className="block text-sm font-bold text-foreground">Member ID<input {...register('memberId')} className="mt-1.5 w-full bg-input border border-border rounded-xl px-4 py-3 text-sm" /></label>
          {errors.memberId && <p className="text-danger text-xs">{errors.memberId.message}</p>}
          <label className="block text-sm font-bold text-foreground">Trainer<select {...register('trainerId')} className="mt-1.5 w-full bg-input border border-border rounded-xl px-4 py-3 text-sm"><option value="">Select a trainer</option>{trainers.map((trainer) => <option key={trainer.trainerId} value={trainer.trainerId}>{trainer.trainerName}</option>)}</select></label>
          {errors.trainerId && <p className="text-danger text-xs">{errors.trainerId.message}</p>}
          <label className="block text-sm font-bold text-foreground">PT Package<select {...register('packageId')} className="mt-1.5 w-full bg-input border border-border rounded-xl px-4 py-3 text-sm"><option value="">Select a package</option>{packages.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name} — {pkg.sessionCount} sessions</option>)}</select></label>
          {errors.packageId && <p className="text-danger text-xs">{errors.packageId.message}</p>}
          <label className="block text-sm font-bold text-foreground">Start Date<input type="date" {...register('startDate')} className="mt-1.5 w-full bg-input border border-border rounded-xl px-4 py-3 text-sm" /></label>
          {errors.startDate && <p className="text-danger text-xs">{errors.startDate.message}</p>}
          {isDirty && <p className="text-xs text-secondary">You have unsaved changes.</p>}
        </div>
        <div className="p-5 border-t border-border bg-header flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-secondary bg-input rounded-xl">Cancel</button>
          <button type="submit" disabled={saving} className="min-w-36 flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-xl disabled:opacity-60">{saving ? <Loader2 size={16} className="motion-safe:animate-spin" /> : <UserPlus size={16} />} Assign Trainer</button>
        </div>
      </form>
    </div>
  );
}
