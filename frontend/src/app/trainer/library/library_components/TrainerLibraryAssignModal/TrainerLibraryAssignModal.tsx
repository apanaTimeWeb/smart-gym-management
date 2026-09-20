'use client';
// RESPONSIBILITY: Assigns one library diet plan to one trainer-owned member and reports mutation state.
import { useState } from 'react';
import { X, UserRound, Loader2 } from 'lucide-react';
import type { DietPlan, TrainerLibraryAssignedMember } from '@/app/trainer/library/library_types/TrainerLibrary_types';
import type { TrainerLibraryAssignModalProps } from '@/app/trainer/library/library_types/TrainerLibraryAssignModalProps';



export default function TrainerLibraryAssignModal({ isOpen, plan, members, isSaving, errorMessage, onClose, onSubmit }: TrainerLibraryAssignModalProps) {
  const [memberId, setMemberId] = useState('');
  if (!isOpen || !plan) return null;
  const submit = async () => { if (!memberId) return; await onSubmit(memberId); };
  return (
    <div className="fixed inset-0 z-40 bg-overlay/80 flex items-center justify-center p-4" role="presentation">
      <div className="w-full max-w-md bg-overlay border border-border rounded-xl shadow-dialog p-5" role="dialog" aria-modal="true" aria-labelledby="trainer-library-assign-title">
        <div className="flex items-center justify-between mb-4"><div><h3 id="trainer-library-assign-title" className="text-lg font-bold text-primary">Assign Diet Plan</h3><p className="text-xs text-secondary mt-1">{plan.name}</p></div><button type="button" onClick={onClose} aria-label="Close assignment dialog" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page p-2 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle"><X size={18} /></button></div>
        <label htmlFor="trainer-library-assigned-member" className="block text-sm font-medium text-secondary mb-1.5">Member</label>
        <div className="relative"><UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" /><select id="trainer-library-assigned-member" value={memberId} onChange={e => setMemberId(e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><option value="">Select a member…</option>{members.map(member => <option key={member.id} value={member.id}>{member.name}{member.assignedDietPlanId ? ' · current plan assigned' : ''}</option>)}</select></div>
        {errorMessage && <p role="alert" className="text-sm text-danger-danger-bg px-3 py-2 rounded-lg mt-3">{errorMessage}</p>}
        <div className="flex justify-end gap-2 mt-5"><button type="button" onClick={onClose} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 border border-border rounded-lg text-secondary hover:bg-primary-subtle">Cancel</button><button type="button" onClick={() => void submit()} disabled={!memberId || isSaving} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold disabled:opacity-60">{isSaving && <Loader2 size={16} className="motion-safe:animate-spin" />}Assign</button></div>
      </div>
    </div>
  );
}
