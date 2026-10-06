// RESPONSIBILITY: Renders ManagerToast's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useEffect } from 'react';
import { CheckCircle2, CircleAlert, CircleX, Info, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ManagerToastAriaLive, ManagerToastProps } from '@/components/ui/manager_toast/ManagerToastTypes';


/** Renders an auto-dismissing toast with semantic styling and a stable close action. */
/**
 * @description Renders the `ManagerToast` component for the `components` feature boundary. Owns this component’s presentation/orchestration responsibility and delegates server data and business mutations to the documented hooks/API layer.
 * @dependencies Uses useEffect, ManagerToastAriaLive, ManagerToastProps, useTranslations; all business-specific dependencies remain inside the owning feature or approved application infrastructure.
 * @edge-case Preserves the documented loading, empty, error, disabled, keyboard, responsive, and retry/confirmation states without introducing sibling-feature business dependencies.
 */
export default function ManagerToast({ message, type, onClose }: ManagerToastProps) {
  const t = useTranslations('MANAGER_SHELL');

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    const timer = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  const config: Record<ManagerToastProps['type'], { icon: typeof CheckCircle2; border: string; live: ManagerToastAriaLive }> = {
    success: { icon: CheckCircle2, border: 'border-success', live: 'polite' },
    error: { icon: CircleX, border: 'border-danger', live: 'assertive' },
    warning: { icon: CircleAlert, border: 'border-warning', live: 'polite' },
    info: { icon: Info, border: 'border-info', live: 'polite' },
  };
  const tone = config[type];

  return (
    <div data-testid="ui-toast-status"
      className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 w-full max-w-sm px-4 sm:w-80 sm:max-w-xs rounded-xl shadow-toast bg-card text-primary border-l-4 ${tone.border} motion-safe:transition-all motion-safe:duration-base`}
      role={tone.live === 'assertive' ? 'alert' : 'status'}
      aria-live={tone.live}
    >
      <div className="flex-1 text-sm font-semibold">
        <tone.icon size={18} strokeWidth={2} aria-hidden="true" /> {message}
      </div>
      <button data-testid="ui-feedback-close"
        type="button"
        onClick={onClose}
        aria-label={t("COPY_CLOSE_NOTIFICATION")}
        className="min-h-11 min-w-11 flex items-center justify-center text-secondary hover:text-primary flex-shrink-0 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"
      >
        <X size={18} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}

export { ManagerToast };
