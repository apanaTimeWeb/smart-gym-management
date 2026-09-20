// RESPONSIBILITY: Assigns one library diet plan to one trainer-owned member and protects typed selection state.
'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { X, UserRound, Loader2 } from 'lucide-react';
import type { TrainerLibraryAssignModalProps } from '@/app/trainer/library/library_types/TrainerLibraryAssignModalProps';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { useTrainerDialogFocusTrap } from '@/app/trainer/trainer_components/TrainerShared/useTrainerDialogFocusTrap';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';

export default function TrainerLibraryAssignModal({ isOpen, plan, members, isSaving, errorMessage, onClose, onSubmit }: TrainerLibraryAssignModalProps) {
  const [memberId, setMemberId] = useState('');
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const actionKeys = useTrainerIdempotencyKey();
  const currentActionId = plan && memberId ? `assign-diet-${plan.id}-${memberId}` : '';
  const guardNavigation = useTrainerUnsavedChangesGuard(Boolean(memberId) && !isSaving);
  useTrainerDialogFocusTrap({ isOpen: Boolean(isOpen && plan), dialogRef, onEscape: () => void guardNavigation(onClose) });

  useEffect(() => {
    if (!isOpen) {
      if (currentActionId) actionKeys.clear(currentActionId);
      setMemberId('');
    }
  }, [isOpen, currentActionId, actionKeys]);

  if (!isOpen || !plan) return null;
  const submit = async () => {
    if (!memberId || !currentActionId) return;
    const key = actionKeys.begin(currentActionId);
    await onSubmit(memberId, key);
  };
  const handleClose = () => {
    if (currentActionId) actionKeys.clear(currentActionId);
    setMemberId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-overlay flex items-center justify-center p-4" role="presentation">
      <div ref={dialogRef} tabIndex={-1} className="w-full max-w-md bg-overlay border border-border rounded-xl shadow-dialog p-5" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="flex items-center justify-between mb-4"><div><h3 id={titleId} className="text-lg font-bold text-primary">Assign Diet Plan</h3><p className="text-xs text-secondary mt-1">{plan.name}</p></div><button type="button" onClick={() => void guardNavigation(handleClose)} aria-label="Close assignment dialog" className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><X size={18} /></button></div>
        <label htmlFor="trainer-library-assigned-member" className="block text-sm font-medium text-secondary mb-1.5">Member <span className="text-danger" aria-hidden="true">*</span></label><p id="trainer-library-assigned-member-help" className="text-xs text-secondary mb-1.5">Select the member who should receive this diet plan.</p>
        <div className="relative"><UserRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" /><select id="trainer-library-assigned-member" value={memberId} onChange={(event) => setMemberId(event.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors"><option value="">Select a member…</option>{members.map((member) => <option key={member.id} value={member.id}>{member.name}{member.assignedDietPlanId ? ' · current plan assigned' : ''}</option>)}</select></div>
        {errorMessage && <p role="alert" className="text-sm text-danger bg-danger-bg px-3 py-2 rounded-lg mt-3">{errorMessage}</p>}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-5"><button type="button" onClick={() => void guardNavigation(handleClose)} className="px-4 py-2 border border-border rounded-lg text-secondary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Cancel</button><button type="button" onClick={() => void submit()} disabled={!memberId || isSaving} className="inline-flex min-w-32 items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold disabled:opacity-60 motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{isSaving && <Loader2 size={18} className="motion-safe:animate-spin" />}<span>{isSaving ? 'Assigning…' : 'Assign'}</span></button></div>
      </div>
    </div>
  );
}
