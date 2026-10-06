// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { UserPlus } from 'lucide-react';
import type { ManagerPtToolbarProps } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtToolbarTypes';

/**
 * @description Renders the PT page heading and the primary assignment CTA. It owns presentation only; assignment state remains in the parent feature hook.
 * @dependencies Receives translated text and callback props from ManagerPtMain.
 * @edge-case Keeps the CTA keyboard-accessible and usable at narrow widths.
 */
export default function ManagerPtToolbar({ title, subtitle, actionLabel, onAssign }: ManagerPtToolbarProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <p className="mt-1 text-sm text-secondary">{subtitle}</p>
      </div>
      <button
        data-testid="manager_pt-manager-pt-main-button-action"
        type="button"
        onClick={onAssign}
        className="flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-on-primary shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 hover:bg-primary-hover"
      >
        <UserPlus size={18} strokeWidth={2} aria-hidden="true" />
        {actionLabel}
      </button>
    </div>
  );
}
