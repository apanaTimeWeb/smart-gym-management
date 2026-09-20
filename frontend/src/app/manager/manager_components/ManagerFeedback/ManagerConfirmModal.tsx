'use client';
// RESPONSIBILITY: Renders the reusable accessible confirmation dialog used by all Manager modules; performs no business/API work.
import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ManagerConfirmModalProps } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerConfirmModalTypes';

/** Traps focus, closes on Escape, and returns focus to the trigger for the shared confirmation dialog. */
export default function ManagerConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
}: ManagerConfirmModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    cancelRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
      if (event.key === 'Tab') {
        const focusable = [cancelRef.current, confirmRef.current].filter(Boolean) as HTMLButtonElement[];
        if (focusable.length < 2) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const tone = type === 'danger'
    ? { icon: 'bg-danger-bg text-danger', button: 'bg-danger-bg' }
    : type === 'warning'
      ? { icon: 'bg-warning-bg text-warning', button: 'bg-warning-bg' }
      : { icon: 'bg-info-bg text-info', button: 'bg-info-bg' };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4" role="presentation">
      <div
        className="bg-overlay rounded-2xl shadow-dialog w-full max-w-sm overflow-hidden motion-safe:transition-all motion-safe:duration-base"
        role="dialog"
        aria-modal="true"
        aria-labelledby="manager-confirm-title"
        aria-describedby="manager-confirm-message"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${tone.icon}`} aria-hidden="true">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 id="manager-confirm-title" className="text-lg font-bold text-primary">{title}</h3>
              <p id="manager-confirm-message" className="text-sm text-secondary mt-1 leading-relaxed">{message}</p>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <button ref={cancelRef} type="button" onClick={onCancel} className="flex-1 min-h-11 py-2.5 border border-border rounded-xl text-sm font-semibold text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors">
              {cancelText}
            </button>
            <button ref={confirmRef} type="button" onClick={onConfirm} className={`flex-1 min-h-11 py-2.5 rounded-xl text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-opacity hover:opacity-90 ${tone.button}`}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
