// RESPONSIBILITY: Renders the reusable confirmation/destructive action modal used across all SUPERADMIN modules. Receives config via SuperadminConfirmProvider. No API calls.
'use client';
import { useEffect, useRef } from 'react';
import type { ConfirmModalProps } from './ConfirmTypes';
import { AlertTriangle } from 'lucide-react';
export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }: ConfirmModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
// EFFECT INTENT: moves focus only when the interactive state changes so keyboard focus remains predictable.
    useEffect(() => {
        if (!isOpen)
            return;
        previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        cancelButtonRef.current?.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onCancel();
                return;
            }
            if (event.key !== 'Tab' || !dialogRef.current)
                return;
            const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
            if (!focusable.length)
                return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!first || !last)
                return;
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => { document.removeEventListener('keydown', handleKeyDown); previousFocusRef.current?.focus(); };
    }, [isOpen, onCancel]);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4" role="presentation">
      <div ref={dialogRef} className="bg-overlay rounded-2xl border border-border shadow-dialog w-full max-w-sm overflow-hidden motion-safe:animate-in fade-in zoom-in motion-safe:duration-base" role="alertdialog" aria-modal="true" aria-labelledby="superadmin-confirm-title" aria-describedby="superadmin-confirm-message">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${type === 'danger' ? 'bg-danger-bg text-danger' :
            type === 'warning' ? 'bg-warning-bg text-warning' :
                'bg-info-bg text-info'}`}>
              <AlertTriangle size={18} strokeWidth={2}/>
            </div>
            <div>
              <h3 id="superadmin-confirm-title" className="text-lg font-bold text-primary">{title}</h3>
              <p id="superadmin-confirm-message" className="text-sm text-secondary mt-1 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button ref={cancelButtonRef} onClick={onCancel} className="min-h-11 flex-1 py-2.5 border border-border rounded-xl text-sm font-semibold text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors">
              {cancelText}
            </button>
            <button onClick={onConfirm} className={`min-h-11 flex-1 py-2.5 rounded-xl text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-opacity hover:opacity-90 ${type === 'danger' ? 'bg-danger' :
            type === 'warning' ? 'bg-warning' :
                'bg-info'}`}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>);
}
