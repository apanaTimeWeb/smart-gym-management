// RESPONSIBILITY: Renders the grievance complaint logging dialog and delegates form state and submission to its feature hook.
"use client";

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Frown, Loader2, MessageSquare, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { GRIEVANCE_CATEGORIES } from '@/app/manager/grievance/grievance_constants/ManagerGrievanceConstants';
import { CreateGrievanceTicketSchema } from '@/app/manager/grievance/grievance_schemas/ManagerGrievanceSchemas';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { CreateGrievanceTicketPayload } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';


export interface ManagerGrievanceLogComplaintModalProps {
  onClose: () => void;
  onSubmit: (data: CreateGrievanceTicketPayload) => Promise<boolean>;
}

/** Renders the grievance create form and owns only form-local interaction; API/mutation state stays in the feature hook. */
export function ManagerGrievanceLogComplaintModal({ onClose, onSubmit }: ManagerGrievanceLogComplaintModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<CreateGrievanceTicketPayload>({
    resolver: zodResolver(CreateGrievanceTicketSchema),
    defaultValues: { category: 'OTHER' },
  });
  const { confirmAndClose } = useManagerUnsavedChangesGuard(isDirty && !isSubmitting);

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        void confirmAndClose(onClose);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [closeButtonRef.current, cancelButtonRef.current, submitButtonRef.current].filter(
        (element): element is HTMLButtonElement => Boolean(element),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const previous = previousFocusRef.current;
      previousFocusRef.current = null;
      window.requestAnimationFrame(() => previous?.focus());
    };
  }, [onClose]);

  const handleFormSubmit = async (data: CreateGrievanceTicketPayload) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(data);
      if (success) onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-3 sm:p-4" role="presentation">
      <div
        className="bg-overlay w-full max-w-md max-h-screen overflow-y-auto rounded-xl shadow-dialog border border-border"
        role="dialog"
        aria-modal="true"
        aria-labelledby="manager-grievance-create-title"
        aria-describedby="manager-grievance-create-description"
      >
        <div className="flex items-center justify-between gap-3 p-5 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-primary-subtle rounded-lg text-primary shrink-0"><MessageSquare size={20} aria-hidden="true" /></div>
            <div className="min-w-0">
              <h2 id="manager-grievance-create-title" className="text-lg font-bold text-primary truncate">Log Member Complaint</h2>
              <p id="manager-grievance-create-description" className="text-sm text-secondary">Record a complaint for follow-up and resolution.</p>
            </div>
          </div>
          <button ref={closeButtonRef} type="button" onClick={() => void confirmAndClose(onClose)} aria-label="Close complaint form" className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4">
          <div>
            <label htmlFor="manager-grievance-member-name" className="block text-sm font-medium text-secondary mb-1">Member Name</label>
            <input id="manager-grievance-member-name" {...register('memberName')} aria-invalid={errors.memberName ? 'true' : 'false'} aria-describedby={errors.memberName ? 'manager-grievance-member-name-error' : undefined} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" placeholder="e.g. Rahul Sharma" />
            {errors.memberName && <p id="manager-grievance-member-name-error" role="alert" className="text-danger text-xs mt-1">{errors.memberName.message}</p>}
          </div>
          <div>
            <label htmlFor="manager-grievance-category" className="block text-sm font-medium text-secondary mb-1">Category</label>
            <select id="manager-grievance-category" {...register('category')} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {GRIEVANCE_CATEGORIES.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="manager-grievance-issue" className="block text-sm font-medium text-secondary mb-1">Issue Description</label>
            <textarea id="manager-grievance-issue" {...register('issue')} aria-invalid={errors.issue ? 'true' : 'false'} aria-describedby={errors.issue ? 'manager-grievance-issue-error' : undefined} placeholder="What happened?" className="w-full min-h-28 resize-none bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            {errors.issue && <p id="manager-grievance-issue-error" role="alert" className="text-danger text-xs mt-1">{errors.issue.message}</p>}
          </div>
          <div className="pt-2 flex flex-col-reverse sm:flex-row gap-3">
            <button ref={cancelButtonRef} type="button" onClick={() => void confirmAndClose(onClose)} className="flex-1 min-h-11 rounded-lg border border-border font-semibold text-secondary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
            <button ref={submitButtonRef} type="submit" disabled={isSubmitting} className="min-w-32 flex-1 min-h-11 rounded-lg bg-primary text-on-primary font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {isSubmitting ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <Frown size={18} aria-hidden="true" />}
              <span>{isSubmitting ? 'Logging…' : 'Log Complaint'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
