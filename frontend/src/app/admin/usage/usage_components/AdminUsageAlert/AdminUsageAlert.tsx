"use client";
// RESPONSIBILITY: Renders the global Admin usage warning banner using the dedicated usage query hook.
import { AlertTriangle, X } from 'lucide-react';
import { useAdminUsageAlert } from '@/app/admin/usage/usage_components/AdminUsageAlert/useAdminUsageAlert';

export default function AdminUsageAlert() {
  const { shouldShow, isLimitReached, setIsVisible } = useAdminUsageAlert();
  if (!shouldShow) return null;

  const bgColor = isLimitReached ? 'bg-danger-bg' : 'bg-warning-bg';
  const textColor = isLimitReached ? 'text-danger' : 'text-warning';
  const borderColor = isLimitReached ? 'border-danger' : 'border-warning';

  return (
    <div className={`flex items-center justify-between p-3 border-b ${bgColor} ${borderColor} px-6 motion-safe:transition-all motion-safe:duration-slow`} role="status">
      <div className="flex items-center gap-3">
        <AlertTriangle className={textColor} size={20} aria-hidden="true" />
        <span className="text-sm font-medium text-primary">
          {isLimitReached
            ? 'Action Required: You have reached one or more limits of your subscription plan. Please upgrade to avoid service interruption.'
            : 'Warning: You are near the end of your subscription limit. Please review your usage meters.'}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="min-h-11 min-w-11 inline-flex items-center justify-center p-1 rounded-md hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
        aria-label="Dismiss usage alert"
      >
        <X size={18} className="text-secondary hover:text-primary" aria-hidden="true" />
      </button>
    </div>
  );
}
