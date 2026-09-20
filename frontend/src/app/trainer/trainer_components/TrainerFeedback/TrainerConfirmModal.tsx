'use client';
// RESPONSIBILITY: Renders the accessible Trainer-wide confirmation dialog. It owns only presentation and keyboard/focus behavior; mutation ownership remains in the caller.
import { useEffect, useId, useRef, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { TrainerConfirmModalProps } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmTypes';

export default function TrainerConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  requireTypedConfirmation = false,
  confirmationPhrase = 'DELETE',
}: TrainerConfirmModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmationInputRef = useRef<HTMLInputElement>(null);
  const [typedConfirmation, setTypedConfirmation] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTypedConfirmation('');
      return;
    }
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (requireTypedConfirmation) confirmationInputRef.current?.focus();
    else cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onCancel, requireTypedConfirmation]);

  if (!isOpen) return null;

  const confirmClass =
    type === 'danger'
      ? 'bg-danger-bg'
      : type === 'warning'
        ? 'bg-warning-bg'
        : 'bg-info-bg';
  const iconClass =
    type === 'danger'
      ? 'bg-danger-bg text-danger'
      : type === 'warning'
        ? 'bg-warning-bg text-warning'
        : 'bg-info-bg text-info';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="bg-overlay rounded-xl shadow-dialog w-full max-w-sm overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in motion-safe:duration-base"
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconClass}`} aria-hidden="true">
              <AlertTriangle size={20} />
            </div>
            <h2 id={titleId} className="text-lg font-bold text-primary truncate">{title}</h2>
          </div>
          <button
            type="button"
            aria-label="Close confirmation dialog"
            onClick={onCancel}
            className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p id={descriptionId} className="text-sm text-secondary leading-relaxed">{message}</p>
          {requireTypedConfirmation && (
            <div className="mt-5 space-y-2">
              <label htmlFor={`${descriptionId}-confirmation`} className="block text-xs font-semibold text-secondary">Type <span className="text-primary">{confirmationPhrase}</span> to confirm</label>
              <input
                ref={confirmationInputRef}
                id={`${descriptionId}-confirmation`}
                value={typedConfirmation}
                onChange={(event) => setTypedConfirmation(event.target.value)}
                autoComplete="off"
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          )}
          <div className="flex gap-3 mt-6 justify-end">
            <button
              ref={cancelButtonRef}
              type="button"
              onClick={onCancel}
              className="min-h-11 px-4 border border-border rounded-md text-sm font-semibold text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={requireTypedConfirmation && typedConfirmation !== confirmationPhrase}
              className={`min-h-11 px-4 rounded-md text-sm font-semibold text-on-primary motion-safe:transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${confirmClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
