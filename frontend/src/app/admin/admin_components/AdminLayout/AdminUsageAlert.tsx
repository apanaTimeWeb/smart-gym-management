"use client";
// RESPONSIBILITY: Renders the global Admin usage warning banner using the dedicated usage query hook.
import { AlertTriangle, X } from 'lucide-react';
import { useAdminUsageAlert } from '@/app/admin/admin_components/AdminLayout/useAdminUsageAlert';

export default function AdminUsageAlert() {
  const { shouldShow, isLimitReached, setIsVisible } = useAdminUsageAlert();
  if (!shouldShow) return null;

  const bgColor = isLimitReached ? 'bg-danger/10' : 'bg-warning/10';
  const textColor = isLimitReached ? 'text-danger' : 'text-warning';
  const borderColor = isLimitReached ? 'border-danger' : 'border-warning';

  return (
    <div className={`flex items-center justify-between p-3 border-b ${bgColor} ${borderColor} px-6 motion-safe:transition-all motion-safe:duration-300`} role="status">
      <div className="flex items-center gap-3">
        <AlertTriangle className={textColor} size={20} aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">
          {isLimitReached
            ? 'Action Required: You have reached one or more limits of your subscription plan. Please upgrade to avoid service interruption.'
            : 'Warning: You are near the end of your subscription limit. Please review your usage meters.'}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="min-h-11 min-w-11 inline-flex items-center justify-center p-1 rounded-md hover:bg-foreground/10 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Dismiss usage alert"
      >
        <X size={18} className="text-secondary hover:text-foreground" aria-hidden="true" />
      </button>
    </div>
  );
}
