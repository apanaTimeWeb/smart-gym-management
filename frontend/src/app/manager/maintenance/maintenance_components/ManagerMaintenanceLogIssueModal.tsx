// RESPONSIBILITY: Renders the maintenance issue logging dialog and delegates field state and submission to its feature hook.
"use client";

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Wrench, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { MAINTENANCE_PRIORITIES } from '@/app/manager/maintenance/maintenance_constants/ManagerMaintenanceConstants';
import { CreateMaintenanceTicketSchema } from '@/app/manager/maintenance/maintenance_schemas/ManagerMaintenanceSchemas';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { CreateMaintenanceTicketPayload } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';


export interface ManagerMaintenanceLogIssueModalProps {
  onClose: () => void;
  onSubmit: (data: CreateMaintenanceTicketPayload) => Promise<boolean>;
}

/** Renders the maintenance issue create form and owns only form-local interaction; API/mutation state stays in the feature hook. */
export function ManagerMaintenanceLogIssueModal({ onClose, onSubmit }: ManagerMaintenanceLogIssueModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<CreateMaintenanceTicketPayload>({
    resolver: zodResolver(CreateMaintenanceTicketSchema),
    defaultValues: { priority: 'MEDIUM' },
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

  const handleFormSubmit = async (data: CreateMaintenanceTicketPayload) => {
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
      <div className="bg-overlay w-full max-w-md max-h-screen overflow-y-auto rounded-xl shadow-dialog border border-border" role="dialog" aria-modal="true" aria-labelledby="manager-maintenance-create-title" aria-describedby="manager-maintenance-create-description">
        <div className="flex items-center justify-between gap-3 p-5 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-primary-subtle rounded-lg text-primary shrink-0"><Wrench size={20} aria-hidden="true" /></div>
            <div className="min-w-0">
              <h2 id="manager-maintenance-create-title" className="text-lg font-bold text-primary truncate">Log Maintenance Issue</h2>
              <p id="manager-maintenance-create-description" className="text-sm text-secondary">Capture the issue, priority and estimated cost.</p>
            </div>
          </div>
          <button ref={closeButtonRef} type="button" onClick={() => void confirmAndClose(onClose)} aria-label="Close maintenance issue form" className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={20} aria-hidden="true" /></button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4">
          <div>
            <label htmlFor="manager-maintenance-title" className="block text-sm font-medium text-secondary mb-1">Issue Title</label>
            <input id="manager-maintenance-title" {...register('title')} aria-invalid={errors.title ? 'true' : 'false'} aria-describedby={errors.title ? 'manager-maintenance-title-error' : undefined} placeholder="e.g. Treadmill 4 wire broken" className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            {errors.title && <p id="manager-maintenance-title-error" role="alert" className="text-danger text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="manager-maintenance-equipment" className="block text-sm font-medium text-secondary mb-1">Equipment / Area</label>
            <input id="manager-maintenance-equipment" {...register('equipment')} aria-invalid={errors.equipment ? 'true' : 'false'} aria-describedby={errors.equipment ? 'manager-maintenance-equipment-error' : undefined} placeholder="e.g. Cardio Section" className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            {errors.equipment && <p id="manager-maintenance-equipment-error" role="alert" className="text-danger text-xs mt-1">{errors.equipment.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="manager-maintenance-priority" className="block text-sm font-medium text-secondary mb-1">Priority</label>
              <select id="manager-maintenance-priority" {...register('priority')} className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{MAINTENANCE_PRIORITIES.map((priority) => <option key={priority.value} value={priority.value}>{priority.label}</option>)}</select>
            </div>
            <div>
              <label htmlFor="manager-maintenance-estimated-cost" className="block text-sm font-medium text-secondary mb-1">Estimated Cost</label>
              <input id="manager-maintenance-estimated-cost" type="number" min="0" max="100000000" step="1" {...register('estimatedCost', { valueAsNumber: true })} placeholder="Optional" className="w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
              {errors.estimatedCost && <p role="alert" className="text-danger text-xs mt-1">{errors.estimatedCost.message}</p>}
            </div>
          </div>
          <div className="pt-2 flex flex-col-reverse sm:flex-row gap-3">
            <button ref={cancelButtonRef} type="button" onClick={() => void confirmAndClose(onClose)} className="flex-1 min-h-11 rounded-lg border border-border font-semibold text-secondary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
            <button ref={submitButtonRef} type="submit" disabled={isSubmitting} className="min-w-32 flex-1 min-h-11 rounded-lg bg-primary text-on-primary font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{isSubmitting ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <Wrench size={18} aria-hidden="true" />}<span>{isSubmitting ? 'Logging…' : 'Log Issue'}</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
