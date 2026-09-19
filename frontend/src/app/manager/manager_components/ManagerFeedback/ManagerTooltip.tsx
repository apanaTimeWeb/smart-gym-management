'use client';
// RESPONSIBILITY: Reusable Tooltip component for truncating data in tables and cards, complying with Design Rule 13 & 19.
import type { ManagerTooltipProps } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerTooltipTypes';



export default function ManagerTooltip({ content, children }: ManagerTooltipProps) {
  if (!content) return <>{children}</>;

  return (
    <div className="relative group inline-flex cursor-help">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 motion-safe:transition-all motion-safe:duration-200 delay-300 z-30 pointer-events-none">
        <div className="relative bg-popover border border-border text-xs text-primary rounded-md py-1.5 px-3 max-w-60 w-max whitespace-normal break-words text-center shadow-popover">
          {content}
          {/* Arrow pointing down */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-b border-r border-border rotate-45" />
        </div>
      </div>
    </div>
  );
}
