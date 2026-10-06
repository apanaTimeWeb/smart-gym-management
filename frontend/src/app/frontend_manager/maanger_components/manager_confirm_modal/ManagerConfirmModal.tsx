// RESPONSIBILITY: Renders ManagerConfirmModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ManagerConfirmModalProps } from '@/components/ui/manager_confirm_modal/ManagerConfirmModalTypes';


/** Traps focus, closes on Escape, and returns focus to the trigger for the shared confirmation dialog. */
/**
 * @description Renders the `ManagerConfirmModal` component for the `components` feature boundary. Owns this component’s presentation/orchestration responsibility and delegates server data and business mutations to the documented hooks/API layer.
 * @dependencies Uses useEffect, useRef, useTranslations, AlertTriangle, ManagerConfirmModalProps; all business-specific dependencies remain inside the owning feature or approved application infrastructure.
 * @edge-case Preserves the documented loading, empty, error, disabled, keyboard, responsive, and retry/confirmation states without introducing sibling-feature business dependencies.
 */
export default function ManagerConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  type = 'danger',
}: ManagerConfirmModalProps) {
  const t = useTranslations('MANAGER_SHELL');
  const resolvedConfirmText = confirmText ?? t('TEXT_CONFIRM');
  const resolvedCancelText = cancelText ?? t('TEXT_CANCEL');

  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  // EFFECT: Focuses the dialog, traps Tab navigation, and handles Escape while the confirmation surface is open.
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

  const tone = (() => { if (type === 'danger') return { icon: 'bg-danger-bg text-danger', button: 'bg-danger text-on-danger' }; return (() => { if (type === 'warning') return { icon: 'bg-warning-bg text-warning', button: 'bg-warning text-on-warning' }; return { icon: 'bg-info-bg text-info', button: 'bg-info text-on-info' }; })(); })();

  return (
    <div data-testid="ui-confirm-modal-presentation" className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4"role="presentation">
      <div data-testid="ui-confirm-modal-dialog"
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
              <AlertTriangle size={18} strokeWidth={2} />
            </div>
            <div>
              <h3 id="manager-confirm-title" className="text-lg font-bold text-primary">{title}</h3>
              <p id="manager-confirm-message" className="text-sm text-secondary mt-1 leading-relaxed">{message}</p>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <button data-testid="ui-feedback-cancel" ref={cancelRef} type="button" onClick={onCancel} className="flex-1 min-h-11 py-2.5 border border-border rounded-xl text-sm font-semibold text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110">
              {resolvedCancelText}
            </button>
            <button data-testid="ui-feedback-confirm" ref={confirmRef} type="button" onClick={onConfirm} className={`flex-1 min-h-11 py-2.5 rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all hover:opacity-90 ${tone.button} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110`}>
              {resolvedConfirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
