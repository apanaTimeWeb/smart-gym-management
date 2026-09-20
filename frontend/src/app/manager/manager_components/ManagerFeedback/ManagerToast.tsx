// RESPONSIBILITY: Renders a fixed, accessible Manager toast notification. Contains no business logic.
'use client';
import { useEffect } from 'react';
import type { ManagerToastAriaLive, ManagerToastProps } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';


/** Renders an auto-dismissing toast with semantic styling and a stable close action. */
export default function ManagerToast({ message, type, onClose }: ManagerToastProps) {
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    const timer = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  const config: Record<ManagerToastProps['type'], { prefix: string; border: string; live: ManagerToastAriaLive }> = {
    success: { prefix: '✅', border: 'border-success', live: 'polite' },
    error: { prefix: '❌', border: 'border-danger', live: 'assertive' },
    warning: { prefix: '⚠️', border: 'border-warning', live: 'polite' },
    info: { prefix: 'ℹ️', border: 'border-info', live: 'polite' },
  };
  const tone = config[type];

  return (
    <div
      className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 w-full max-w-sm px-4 sm:w-80 sm:max-w-xs rounded-xl shadow-toast bg-card text-primary border-l-4 ${tone.border} motion-safe:transition-all motion-safe:duration-base`}
      role={tone.live === 'assertive' ? 'alert' : 'status'}
      aria-live={tone.live}
    >
      <div className="flex-1 text-sm font-semibold">
        {tone.prefix} {message}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="min-h-11 min-w-11 flex items-center justify-center text-secondary hover:text-primary flex-shrink-0 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}

export { ManagerToast };
