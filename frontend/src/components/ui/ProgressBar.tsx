// RESPONSIBILITY: Renders an accessible horizontal progress indicator for Superadmin V1 dashboards.
import type { ProgressBarProps } from '@/components/ui/SharedTypes';
export default function ProgressBar({ value, label }: ProgressBarProps) {
    const bounded = Math.max(0, Math.min(100, value));
    return (<div>
  <div className="mb-1 flex items-center justify-between gap-3 text-xs">
    <span className="truncate text-secondary">
      {label}
    </span>
    <span className="font-medium text-primary">
      {bounded}
      %
    </span>
  </div>
  <div className="h-2 overflow-hidden rounded-full bg-input" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={bounded} aria-label={label}>
    <div className="h-full rounded-full bg-primary motion-safe:transition-all motion-safe:duration-slow" style={{ width: `${bounded}%` }}/>
  </div>
    </div>);
}
